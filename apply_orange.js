const fs = require('fs');
const path = require('path');
const glob = require('glob');

// The new orange background token
const ORANGE_BG_NEW = '#FF94410F';
const ORANGE_BORDER_NEW = '#FF944133';

// Replace old orange background colors used as card/badge backgrounds
const replacements = [
  // Inspector note card background
  { from: /backgroundColor: '#FFF7ED'/g, to: `backgroundColor: '${ORANGE_BG_NEW}'` },
  // Old FFEDD5 backgrounds
  { from: /backgroundColor: '#FFEDD5'/g, to: `backgroundColor: '${ORANGE_BG_NEW}'` },
  // 3-4hrs badge in PDI option 
  { from: /backgroundColor: '#FFF7ED' \}/g, to: `backgroundColor: '${ORANGE_BG_NEW}' }` },
];

const files = fs.readdirSync('/Users/nimeshranjan/Buyer_app-main/src/screens/dealflow')
  .filter(f => f.endsWith('.tsx'))
  .map(f => `/Users/nimeshranjan/Buyer_app-main/src/screens/dealflow/${f}`);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Replace FFF7ED (orange card bg) with the new token
  if (content.includes('#FFF7ED')) {
    content = content.replace(/#FFF7ED/g, ORANGE_BG_NEW);
    changed = true;
  }
  // Replace FFEDD5
  if (content.includes('#FFEDD5')) {
    content = content.replace(/#FFEDD5/g, ORANGE_BG_NEW);
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${path.basename(file)}`);
  }
});

console.log('Done applying orange color token.');
