# 🚀 Guide de déploiement

## 📋 Prérequis

- Node.js 18+ installé
- npm ou yarn
- Compte GitHub (pour le code source)
- Compte sur une plateforme de déploiement (Vercel/Netlify recommandé)

## 🔧 Build local

```bash
# 1. Build de production
npm run build

# 2. Tester le build en local
npm run preview
```

Le dossier `dist/` contient tous les fichiers optimisés.

## ☁️ Déploiement sur Vercel (Recommandé)

### Option 1 : Via l'interface web

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Cliquer sur "New Project"
3. Importer votre repository GitHub
4. Vercel détecte automatiquement Vite
5. Cliquer sur "Deploy"

**Configuration automatique détectée :**
- Build Command: `vite build`
- Output Directory: `dist`
- Install Command: `npm install`

### Option 2 : Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

**URL finale :** `https://nordik-adventures-erp.vercel.app`

## 🌐 Déploiement sur Netlify

### Via l'interface web

1. Créer un compte sur [netlify.com](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Connecter GitHub
4. Sélectionner le repository

**Configuration :**
```
Build command: npm run build
Publish directory: dist
```

### Via CLI

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Se connecter
netlify login

# Build et déployer
netlify deploy --prod
```

## 📦 Déploiement sur GitHub Pages

### 1. Modifier `vite.config.ts`

```typescript
export default defineConfig({
  base: '/nordik-adventures-erp/',  // Nom du repository
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
```

### 2. Ajouter un workflow GitHub

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 3. Activer GitHub Pages

1. Aller dans Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` → `/ (root)`

**URL finale :** `https://username.github.io/nordik-adventures-erp/`

## 🐳 Déploiement avec Docker

### Créer `Dockerfile`

```dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build et run

```bash
# Build l'image
docker build -t nordik-adventures-erp .

# Run le container
docker run -p 80:80 nordik-adventures-erp
```

## 📊 Analyse du bundle

Avant de déployer, vérifiez la taille du bundle :

```bash
# Build avec analyse
npm run build

# Voir la taille des fichiers
ls -lh dist/assets/
```

**Tailles typiques attendues :**
- HTML: ~1-2 KB
- CSS: ~50-100 KB (Tailwind optimisé)
- JS: ~200-400 KB (React + libs)
- Total gzippé: ~100-150 KB

## 🔐 Variables d'environnement

Si vous ajoutez Supabase ou d'autres services :

### Vercel/Netlify

Ajouter dans l'interface web :
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

### Accès dans le code

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

## ✅ Checklist avant déploiement

- [ ] `npm run build` fonctionne sans erreur
- [ ] `npm run preview` affiche correctement l'app
- [ ] Toutes les images se chargent
- [ ] Les 3 types de comptes fonctionnent (admin/employé/client)
- [ ] Le panier fonctionne
- [ ] Les commandes se créent
- [ ] Le tableau de bord affiche les données
- [ ] Responsive sur mobile et desktop
- [ ] Pas d'erreurs dans la console

## 🔍 Vérification post-déploiement

### Tests à effectuer

1. **Authentification**
   - [ ] Login admin fonctionne
   - [ ] Login employé fonctionne
   - [ ] Login client fonctionne
   - [ ] Inscription nouveau client fonctionne

2. **Catalogue**
   - [ ] Liste des produits s'affiche
   - [ ] Recherche fonctionne
   - [ ] Filtres par catégorie fonctionnent
   - [ ] Fiche produit s'affiche

3. **Panier**
   - [ ] Ajout au panier fonctionne
   - [ ] Calcul TPS/TVQ correct
   - [ ] Modification quantités fonctionne
   - [ ] Suppression d'articles fonctionne

4. **Commandes**
   - [ ] Passage de commande fonctionne
   - [ ] Historique s'affiche
   - [ ] Détails de commande s'affichent

5. **Admin**
   - [ ] Dashboard s'affiche
   - [ ] Gestion produits fonctionne
   - [ ] Gestion commandes fonctionne
   - [ ] Activités clients s'affichent

## 📈 Monitoring

### Vercel Analytics

Activer dans les paramètres du projet :
- Web Analytics
- Speed Insights

### Google Analytics (optionnel)

Ajouter dans `index.html` :
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🚨 Dépannage

### Erreur : "Cannot find module"
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
npm run build
```

### Erreur : "Out of memory"
```bash
# Augmenter la mémoire Node
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Les images ne se chargent pas
Vérifier que les URLs Unsplash sont accessibles depuis le serveur.

### L'app est blanche après déploiement
Vérifier la configuration de `base` dans `vite.config.ts`

## 📱 PWA (Progressive Web App)

Pour transformer en PWA, ajouter `vite-plugin-pwa` :

```bash
npm install -D vite-plugin-pwa
```

Modifier `vite.config.ts` :
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Nordik Adventures ERP',
        short_name: 'Nordik ERP',
        theme_color: '#6B9B7F',
      }
    })
  ]
});
```

## 🎯 Performances attendues

Avec un déploiement optimal :
- ⚡ First Contentful Paint: < 1.5s
- ⚡ Time to Interactive: < 3s
- ⚡ Lighthouse Score: 90+

---

**Votre application est maintenant prête pour la production !** 🎉
