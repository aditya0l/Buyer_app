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
  'DealClosedScreen.tsx'
];

const basePath = path.join(__dirname, 'src', 'screens', 'dealflow');

filesToUpdate.forEach(file => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Replace ChevronLeft with ArrowLeft in imports
  content = content.replace(/ChevronLeft/g, 'ArrowLeft');
  
  // 2. Fix container padding and status bar
  content = content.replace(
    /<View style=\{\[styles\.container, \{ paddingTop: insets\.top \}\]\}>\s*<StatusBar barStyle="dark-content" \/>/g,
    '<View style={styles.container}>\n      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent" />'
  );
  
  // 3. Fix Header paddingTop and use ArrowLeft
  content = content.replace(
    /<View style=\{styles\.header\}>\s*<TouchableOpacity style=\{styles\.backBtn\} onPress=\{[^}]+\}>\s*<ArrowLeft color="#0F172A" size=\{24\} \/>/g,
    (match) => {
      // replace styles.header with [styles.header, { paddingTop: insets.top + 16 }]
      return match.replace(
        '<View style={styles.header}>', 
        '<View style={[styles.header, { paddingTop: insets.top + 16 }]} >'
      );
    }
  );

  // 4. Update backBtn styles
  content = content.replace(
    /backBtn: \{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' \},/g,
    "backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },"
  );

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
