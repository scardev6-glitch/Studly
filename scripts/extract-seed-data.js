const fs = require('fs');
const path = require('path');

// Load the current seedData file and eval just the SUBJECTS_DATA
const seedContent = fs.readFileSync(path.join(__dirname, 'seedData.js'), 'utf8');

// Extract SUBJECTS_DATA array using eval
// We need to isolate just the array declaration
const subjectsMatch = seedContent.match(/const SUBJECTS_DATA = (\[[\s\S]*?\n\]);/);
if (!subjectsMatch) {
  console.error('Could not find SUBJECTS_DATA');
  process.exit(1);
}

const SUBJECTS_DATA = eval(`(${subjectsMatch[1]})`);

// Extract explanations
const explanationsMatch = seedContent.match(/const explanations = (\{[\s\S]*?\n\s*});/);
if (!explanationsMatch) {
  console.error('Could not find explanations');
  process.exit(1);
}
const explanations = eval(`(${explanationsMatch[1]})`);

// Write each subject to its own JSON file
const subjectsDir = path.join(__dirname, 'seed-data', 'subjects');
SUBJECTS_DATA.forEach(subject => {
  const filename = subject.name.toLowerCase().replace(/\s+/g, '-') + '.json';
  const filepath = path.join(subjectsDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(subject, null, 2) + '\n');
  console.log(`  ✓ ${filename}`);
});

// Write explanations
const explanationsPath = path.join(__dirname, 'seed-data', 'explanations.json');
fs.writeFileSync(explanationsPath, JSON.stringify(explanations, null, 2) + '\n');
console.log(`  ✓ explanations.json`);

console.log(`\n✅ Extracted ${SUBJECTS_DATA.length} subjects and explanations.`);
