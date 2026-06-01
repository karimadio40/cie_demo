export interface PeptOffer {
  kit: string;
  connectionType: string;
  amperage: string;
  rooms: string;
  existingInstall: string;
  priceTtc: number;
  repaymentYears: number;
  monthlyPayment: number;
}

export const RURAL_OFFERS: PeptOffer[] = [
  {
    kit: 'A0',
    connectionType: 'Monophasé',
    amperage: '5A',
    rooms: 'Tout',
    existingInstall: 'Oui',
    priceTtc: 157_001,
    repaymentYears: 10,
    monthlyPayment: 1_300,
  },
  {
    kit: 'A1',
    connectionType: 'Monophasé',
    amperage: '5A',
    rooms: '1',
    existingInstall: 'Non',
    priceTtc: 229_359,
    repaymentYears: 10,
    monthlyPayment: 1_900,
  },
  {
    kit: 'A2',
    connectionType: 'Monophasé',
    amperage: '5A',
    rooms: '2',
    existingInstall: 'Non',
    priceTtc: 275_359,
    repaymentYears: 10,
    monthlyPayment: 2_300,
  },
  {
    kit: 'A3',
    connectionType: 'Monophasé',
    amperage: '5A',
    rooms: '3',
    existingInstall: 'Non',
    priceTtc: 306_326,
    repaymentYears: 10,
    monthlyPayment: 2_500,
  },
];

export const URBAN_OFFERS: PeptOffer[] = [
  {
    kit: 'B00',
    connectionType: 'Monophasé',
    amperage: '5A',
    rooms: 'Tout',
    existingInstall: 'Oui',
    priceTtc: 190_349,
    repaymentYears: 5,
    monthlyPayment: 3_100,
  },
  {
    kit: 'B5',
    connectionType: 'Monophasé',
    amperage: '5A',
    rooms: 'Tout',
    existingInstall: 'Oui',
    priceTtc: 190_349,
    repaymentYears: 5,
    monthlyPayment: 3_100,
  },
  {
    kit: 'B10',
    connectionType: 'Monophasé',
    amperage: '10A+',
    rooms: 'Tout',
    existingInstall: 'Oui',
    priceTtc: 190_349,
    repaymentYears: 5,
    monthlyPayment: 3_100,
  },
];

export const PROGRAM_BENEFITS = [
  'Abonnement simple et rapide',
  'Pas de caution à l\'abonnement',
  'Pas de frais de pénalité',
  'Pas de rupture de fourniture pour impayé',
];

export const PEPT_HIGHLIGHTS = [
  'Kit d\'installation intérieure pour appartements 1, 2 et 3 pièces',
  'Branchement et abonnement inclus',
  '2 kWh gratuits à l\'activation',
];

export const RECHARGE_STEPS = [
  'Composez le code USSD de votre opérateur (Orange ou Moov)',
  'Sélectionnez « Achat recharge énergie prépayée »',
  'Choisissez le montant à payer dans la liste',
  'Saisissez le numéro de compteur à 11 chiffres',
  'Entrez votre code secret',
  'Saisissez le code recharge à 20 chiffres sur le compteur',
  'Validez avec la touche bleue du compteur',
];
