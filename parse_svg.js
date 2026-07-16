const fs = require('fs');
const svg = fs.readFileSync('src/assets/cartyreonboarding.svg', 'utf8');
const paths = svg.match(/d="[^"]+"/g).map(d => d.substring(3, d.length - 1));
let minYs = [];
for (let i = 0; i < 440; i+= 44) { minYs.push(999); }
// very basic estimation
console.log("Found " + paths.length + " paths");
