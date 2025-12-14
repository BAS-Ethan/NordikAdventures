# ⚙️ Configuration du projet

## 🎯 Principe : Configuration minimale

Ce projet utilise **uniquement 3 fichiers de configuration** pour fonctionner :

1. **vite.config.ts** - Configuration du build tool
2. **tsconfig.json** - Configuration TypeScript
3. **package.json** - Dépendances et scripts

## 📝 Détail des fichiers

### 1. vite.config.ts (8 lignes)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
```

**Ce qu'il fait :**
- ✅ Active le plugin React
- ✅ Configure le port 3000
- ✅ Ouvre automatiquement le navigateur

**Ce qu'il ne fait PAS :**
- ❌ Pas d'alias de chemins complexes
- ❌ Pas de configuration avancée
- ❌ Pas de variables d'environnement
- ❌ Pas de proxy API

### 2. tsconfig.json (14 lignes)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

**Ce qu'il fait :**
- ✅ Active le mode strict TypeScript
- ✅ Configure React JSX
- ✅ Cible ES2020 (moderne)
- ✅ Inclut tous les fichiers .ts et .tsx

**Ce qu'il ne fait PAS :**
- ❌ Pas d'alias de chemins (@/)
- ❌ Pas de configuration avancée
- ❌ Pas de types personnalisés

### 3. package.json

```json
{
  "name": "nordik-adventures-erp",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.454.0",
    "@radix-ui/react-*": "...",
    "recharts": "^2.15.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.2",
    "vite": "^6.0.3"
  }
}
```

## 🚫 Fichiers de configuration SUPPRIMÉS

Ces fichiers ne sont **PAS nécessaires** dans ce projet :

- ❌ `postcss.config.js` - Tailwind v4 ne nécessite plus PostCSS
- ❌ `tailwind.config.js` - Configuration dans `globals.css` avec Tailwind v4
- ❌ `.eslintrc` - Pas de linter pour simplicité
- ❌ `.prettierrc` - Pas de formatter configuré
- ❌ `.env` - Pas de variables d'environnement
- ❌ `.gitignore` - Géré par la plateforme
- ❌ `tsconfig.node.json` - Pas nécessaire ici
- ❌ Workflows GitHub - Pas de CI/CD configuré

## 🎨 Configuration de Tailwind CSS v4

Avec Tailwind v4, toute la configuration se fait dans le fichier CSS :

**`/styles/globals.css`**

```css
@import "tailwindcss";

/* Configuration des tokens */
@theme {
  --color-primary: #6B9B7F;
  --color-secondary: #2C5F2D;
  /* ... autres tokens ... */
}

/* Styles de base */
@layer base {
  /* Typography, etc. */
}
```

**Avantages :**
- ✅ Pas de fichier JS de config
- ✅ Tout au même endroit
- ✅ Meilleure intégration CSS

## 📊 Comparaison avec un projet traditionnel

### Projet traditionnel (complexe)
```
Configuration : 10+ fichiers
- vite.config.ts
- tsconfig.json
- tsconfig.node.json
- package.json
- postcss.config.js
- tailwind.config.js
- .eslintrc.js
- .prettierrc
- .env
- .gitignore
- ... etc
```

### Ce projet (minimal) ✨
```
Configuration : 3 fichiers
- vite.config.ts (8 lignes)
- tsconfig.json (14 lignes)
- package.json
```

**Réduction de 70%+ de la configuration !**

## 🏗️ Architecture de build

```
Source (TypeScript + React)
         ↓
   TypeScript Compiler (tsc)
         ↓
      Vite Build
         ↓
   Fichiers optimisés (dist/)
```

## 🔧 Personnalisation

Si vous avez besoin d'ajouter de la configuration :

### Variables d'environnement
Ajouter dans `vite.config.ts` :
```typescript
export default defineConfig({
  define: {
    'process.env.API_URL': JSON.stringify('https://api.example.com')
  }
});
```

### Alias de chemins
Ajouter dans `vite.config.ts` :
```typescript
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
});
```

## ✅ Principe de ce projet

**"Configuration minimale pour fonctionnalité maximale"**

- Uniquement ce qui est nécessaire
- Zéro configuration non utilisée
- Architecture simple et compréhensible
- Facile à maintenir et à déployer

---

**Moins de configuration = Plus de développement** 🚀
