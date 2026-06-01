# CIE — Plateforme de démonstration PEPT

Prototype de présentation pour la **Compagnie Ivoirienne d'Électricité (CIE)** : vitrine des services usagers, formulaire d'adhésion au **Programme Électricité Pour Tous (PEPT)** et suivi de demande par code.

## Démarrage

```bash
npm install
npm start
```

Ouvrir [http://localhost:4200](http://localhost:4200).

## Parcours de démonstration

1. **Accueil** — Présentation du PEPT, avantages et appels à l'action
2. **Programme PEPT** — Offres tarifaires (rural / urbain), documents requis, niche compteur
3. **Nos services** — Recharge prépayée (USSD) et crédit branchement
4. **Souscription** — Formulaire d'adhésion → code de suivi unique (`CIE-XXXXXX`)
5. **Suivi** — Vérification de l'état avec le code reçu
6. **Espace agent** (`/agent/demandes`) — Liste des demandes, changement de statut, filtre et recherche

**Code démo :** `CIE-DEMO01` (demande pré-enregistrée, statut « en analyse »)

Bouton **Agent** dans l'en-tête → gestion des dossiers (prototype sans authentification).

## Stack technique

- Angular 21 (standalone, lazy routes)
- Tailwind CSS 4
- Stockage local (`localStorage`) pour la démo — à remplacer par une API CIE en production

## Visuels PEPT

Placez vos photos brochure dans `public/assets/images/` :

- `pept-hero.jpg` — flyer promotionnel (hero accueil)
- `pept-brochure.jpg` — brochure programme (page PEPT + vignette hero)
- `pept-services.jpg` — flyer services (optionnel)

Sans JPG, des visuels SVG de secours s'affichent automatiquement.

## Animations

Les sections de l'accueil s'animent au défilement (`appScrollReveal`). Désactivées si l'utilisateur a activé « réduire les animations » dans le système.

## Note

Ce dépôt est un **prototype de présentation**. Les données ne quittent pas le navigateur de l'utilisateur.
