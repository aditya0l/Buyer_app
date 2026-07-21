const fs = require('fs');
const content = fs.readFileSync('src/screens/auth/OnboardingFlowScreen.tsx', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.match(/<\/[A-Za-z]+>\s*[a-zA-Z0-9]/) || line.match(/>\s*[a-zA-Z0-9]+\s*</)) {
    if (!line.includes('<Text') && !line.includes('</Text')) {
      console.log(`Possible loose text at line ${i+1}: ${line}`);
    }
  }
}
