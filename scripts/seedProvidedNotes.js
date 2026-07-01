/**
 * Seed script: Migrate PDF files from local assets/ directory into MongoDB
 * Run: node scripts/seedProvidedNotes.js
 * 
 * This makes provided notes work on Heroku / any deployment
 * where the local assets/ directory is not available.
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ProvidedNote = require('../src/models/ProvidedNote');

const ASSETS_DIR = path.join(__dirname, '..', '..', 'assets');

function scanDir(dir, basePath = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = basePath ? `${basePath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results = results.concat(scanDir(fullPath, relPath));
    } else if (entry.name.endsWith('.pdf')) {
      results.push({ name: entry.name, relPath, fullPath });
    }
  }
  return results;
}

function parseSubject(filename) {
  return filename
    .replace(/\.pdf$/i, '')
    .replace(/^CAIE\s*-\s*IGCSE\s*-\s*/i, '')
    .replace(/^caie-igcse-[\w-]+-\d+-[\w-]+-v\d+/i, (m) => {
      const parts = m.replace(/^caie-igcse-/i, '').split('-');
      return parts.slice(0, -2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    })
    .replace(/[\s_-]+/g, ' ')
    .replace(/\s*\(\d+\)\s*$/, '')
    .replace(/\s*-v\d+\s*$/i, '')
    .trim();
}

async function seedProvidedNotes() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 60000,
      });
      console.log('✅ Connected to MongoDB\n');
    }

    const deleted = await ProvidedNote.deleteMany({});
    console.log(`🗑️  Cleared ${deleted.deletedCount} existing provided notes\n`);

    const dirs = ['NOTES', 'notes'];
    const allDocs = [];

    for (const dirName of dirs) {
      const dirPath = path.join(ASSETS_DIR, dirName);
      if (!fs.existsSync(dirPath)) {
        console.log(`⚠️  Directory not found: ${dirPath}`);
        continue;
      }

      const files = scanDir(dirPath);
      console.log(`📂 ${dirName}/ — ${files.length} PDFs found\n`);

      for (const f of files) {
        try {
          const fileData = fs.readFileSync(f.fullPath);
          const subject = parseSubject(f.name);
          console.log(`  📄 ${f.name} (${(fileData.length / 1024 / 1024).toFixed(1)}MB)`);
          allDocs.push({
            filename: f.name,
            subject,
            title: subject,
            data: fileData,
            contentType: 'application/pdf',
            size: fileData.length,
            sourceDir: dirName,
          });
        } catch (err) {
          console.error(`  ❌ ${f.name}: ${err.message}`);
        }
      }
    }

    if (allDocs.length === 0) {
      console.log('\n⚠️  No PDFs found to seed.');
      await mongoose.disconnect();
      return;
    }

    console.log(`\n💾 Seeding ${allDocs.length} PDFs into MongoDB...`);
    await ProvidedNote.insertMany(allDocs, { ordered: false });
    console.log(`✅ Successfully seeded ${allDocs.length} PDFs!\n`);

    const subjects = await ProvidedNote.distinct('subject');
    console.log(`📊 Subjects covered: ${subjects.length}`);
    subjects.forEach(s => console.log(`   - ${s}`));

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

seedProvidedNotes();
