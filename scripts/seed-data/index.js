const fs = require('fs');
const path = require('path');

const subjectsDir = path.join(__dirname, 'subjects');

const subjects = fs.readdirSync(subjectsDir)
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(fs.readFileSync(path.join(subjectsDir, f), 'utf8')));

const explanations = require('./explanations.json');

module.exports = { subjects, explanations };
