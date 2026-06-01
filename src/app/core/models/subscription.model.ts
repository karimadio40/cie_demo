export type SubscriptionStatus =
  | 'soumise'
  | 'en_analyse'
  | 'validee'
  | 'installation'
  | 'terminee';

export type IdDocumentType =
  | 'cni'
  | 'attestation'
  | 'extrait_naissance'
  | 'jugement'
  | 'permis';

export type LocationType = 'rural' | 'urbain';

export interface SubscriptionRequest {
  id: string;
  trackingCode: string;
  status: SubscriptionStatus;
  createdAt: string;
  updatedAt: string;
  nom: string;
  prenoms: string;
  telephone: string;
  email?: string;
  commune: string;
  quartier: string;
  typePiece: IdDocumentType;
  numeroPiece: string;
  locationType: LocationType;
  offreKit: string;
  paiementComptant: boolean;
  message?: string;
}

export const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  soumise: 'Demande soumise',
  en_analyse: 'En cours d\'analyse',
  validee: 'Demande validée',
  installation: 'Installation en cours',
  terminee: 'Branchement terminé',
};

export const STATUS_ORDER: SubscriptionStatus[] = [
  'soumise',
  'en_analyse',
  'validee',
  'installation',
  'terminee',
];

export const ID_DOCUMENT_LABELS: Record<IdDocumentType, string> = {
  cni: 'Carte Nationale d\'Identité',
  attestation: 'Attestation d\'identité',
  extrait_naissance: 'Extrait d\'acte de naissance',
  jugement: 'Jugement supplétif',
  permis: 'Permis de conduire',
};
