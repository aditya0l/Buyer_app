const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'DealLockStep1Screen.tsx',
  'DealLockStep2Screen.tsx',
  'DealLockStep3Screen.tsx',
  'DealLockStep4Screen.tsx',
  'DealLockStep5Screen.tsx',
  'DealDeliveryDashboardScreen.tsx',
  'DealConfirmDeliveryScreen.tsx',
  'DealClosedScreen.tsx',
  'DealBookedScreen.tsx'
];

const basePath = path.join(__dirname, 'src', 'screens', 'dealflow');

filesToUpdate.forEach(file => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Undo previous header modification
  content = content.replace(
    /<View style=\{\[styles\.header, \{ paddingTop: insets\.top \+ 16 \}\]\}\s*>/g,
    '<View style={styles.header}>'
  );
  
  // Insert the safe area spacer above the header
  if (!content.includes('<View style={{ height: insets.top }} />')) {
    content = content.replace(
      /\{\/\*\s*Header\s*\*\/\}/g,
      '<View style={{ height: insets.top }} />\n      {/* Header */}'
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`Fixed header spacing in ${file}`);
});
