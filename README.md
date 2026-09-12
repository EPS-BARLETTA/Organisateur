# Coordo V2 Final Stable

Version prête à déployer directement sur Vercel par glisser-déposer de dossier.

Cette variante utilise un seul fichier JavaScript classique (`js/app.js`) afin d'éviter
les problèmes de chargement de modules ES observés sur le premier déploiement iPad/Vercel.

## Déploiement
1. Décompresser l'archive.
2. Vercel > New Project > `folder`.
3. Sélectionner le dossier `coordo-v2-final-stable`.
4. Deploy.
5. Aucun framework ni commande de build.

## Structure
- index.html
- css/app.css
- js/app.js
- api/calendar.js
- manifest.webmanifest
- vercel.json

## Données
La migration depuis l'ancienne clé locale `coordoCleanV6` reste intégrée.
