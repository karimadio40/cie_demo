const fs = require('fs');
const buffer = fs.readFileSync('c:/Users/Adio Karim/OneDrive/Documents/Github/cie-demo/src/app/pages/agent/agent-dashboard.component.ts');
const text = new TextDecoder('windows-1252').decode(buffer);
fs.writeFileSync('c:/Users/Adio Karim/OneDrive/Documents/Github/cie-demo/src/app/pages/agent/agent-dashboard.component.ts', text, 'utf8');
console.log('Converted to UTF-8');
