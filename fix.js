const fs = require('fs');
const file = 'c:/Users/Adio Karim/OneDrive/Documents/Github/cie-demo/src/app/pages/agent/agent-dashboard.component.ts';
let content = fs.readFileSync(file, 'latin1'); // Read as latin1

console.log("Read length:", content.length);

const replacements = [
  ['\xE9lectricit\xE9', 'Électricité'],
  ['T\xE9l\xE9phone', 'Téléphone'],
  ['Pi\xE8ce d\'identit\xE9', 'Pièce d\'identité'],
  ['Derni\xE8re mise \xE0 jour', 'Dernière mise à jour'],
  ['\xE9tape suivante ?', 'Étape suivante ➔'],
  ['Voir comme usager ?', 'Voir côté usager ↗'],
  ['S\xE9lectionnez une demande', 'Sélectionnez une demande'],
  ['cr\xE9ez-en une', 'créez-en une'],
  ['Statut mis \xE0 jour \u2014 visible pour l\'usager.', 'Statut mis à jour — visible pour l\'usager.'],
  ['num\xE9ro', 'numéro'],
  ['D\xE9tail de la demande', 'Détail de la demande'],
  ['Kit {{ req.offreKit }} \xE0 {{ req.locationType', 'Kit {{ req.offreKit }} — {{ req.locationType'],
  ['{{ idLabels[req.typePiece] }} \xE0 {{ req.numeroPiece }}', '{{ idLabels[req.typePiece] }} — {{ req.numeroPiece }}'],
  ['dd/MM/yyyy \xE0 HH:mm', 'dd/MM/yyyy à HH:mm'],
  ['(cr\xE9dit)', '(crédit)'],
  ['<p class="text-4xl">??</p>', '<p class="text-5xl">\uD83D\uDCCB</p>']
];

for (const [search, replace] of replacements) {
  content = content.split(search).join(replace);
}

// Ensure the logo gets added
// Because latin1 read converts É to \xE9, we match using \xE9
const oldHeaderRegex = /<div class="mb-8">\s*<h1 class="text-3xl font-bold tracking-tight text-\[#0a2e36\] md:text-4xl">\s*Espace Agent CIE\s*<\/h1>\s*<p class="mt-2 text-lg text-slate-600">\s*Gestion des demandes de souscription au Programme \xE9lectricit\xE9 pour Tous \(PEPT\).\s*<\/p>\s*<\/div>/g;

const newHeader = `<div class="mb-8 flex flex-col md:flex-row md:items-center gap-4">
  <img src="/logo1.webp" alt="Logo CIE" class="h-16 w-auto object-contain" />
  <div>
    <h1 class="text-3xl font-bold tracking-tight text-[#0a2e36] md:text-4xl">
      Espace Agent CIE
    </h1>
    <p class="mt-2 text-lg text-slate-600">
      Gestion des demandes de souscription au Programme Électricité pour Tous (PEPT).
    </p>
  </div>
</div>`;

content = content.replace(oldHeaderRegex, newHeader);

// In case the replacement for the header didn't work because we had Électricité already replaced in `content`
const oldHeaderRegex2 = /<div class="mb-8">\s*<h1 class="text-3xl font-bold tracking-tight text-\[#0a2e36\] md:text-4xl">\s*Espace Agent CIE\s*<\/h1>\s*<p class="mt-2 text-lg text-slate-600">\s*Gestion des demandes de souscription au Programme Électricité pour Tous \(PEPT\).\s*<\/p>\s*<\/div>/g;
content = content.replace(oldHeaderRegex2, newHeader);

// There's a chance the old code had `?` literally instead of `\xE0` or `\xE9`. Let's just fix it if we can.
// But wait, the original `cat` command returned `?lectricit?`. That is powershell substituting unknown codepoints. 
// It could be that the file literally contains question marks if it was already corrupted!

fs.writeFileSync(file, content, 'utf8');
console.log('Done');
