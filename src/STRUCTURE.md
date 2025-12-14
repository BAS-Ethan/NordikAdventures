# Structure du projet Nordik Adventures ERP

## 📋 Fichiers de configuration (3 fichiers uniquement)

```
vite.config.ts      # Configuration Vite minimale (React + port 3000)
tsconfig.json       # Configuration TypeScript minimale
package.json        # Dépendances du projet
```

## 🗂️ Arborescence complète

```
nordik-adventures-erp/
│
├── 📄 index.html                    # Point d'entrée HTML
├── 📄 main.tsx                      # Point d'entrée React
├── 📄 App.tsx                       # Composant racine avec routing
├── 📄 data.ts                       # Données mock (produits, utilisateurs, commandes)
│
├── ⚙️ vite.config.ts                # Config Vite (1 seul fichier)
├── ⚙️ tsconfig.json                 # Config TypeScript (minimal)
├── ⚙️ package.json                  # Dépendances
│
├── 📁 contexts/                     # Gestion d'état globale
│   ├── AuthContext.tsx              # Authentification & session utilisateur
│   └── CartContext.tsx              # Panier d'achats & calcul taxes
│
├── 📁 components/                   # Composants React
│   │
│   ├── 🔐 LoginPage.tsx             # Connexion/Inscription
│   │
│   ├── 🛒 ZONE CLIENT
│   ├── ProductCatalog.tsx           # Liste produits + recherche/filtres
│   ├── ProductDetail.tsx            # Fiche produit détaillée
│   ├── ShoppingCart.tsx             # Panier + calcul TPS/TVQ
│   ├── OrderHistory.tsx             # Historique commandes client
│   │
│   ├── 👨‍💼 ZONE ADMIN/EMPLOYÉ
│   ├── Dashboard.tsx                # Tableau de bord + KPIs
│   ├── AdminProducts.tsx            # Gestion produits (CRUD)
│   ├── AdminOrders.tsx              # Gestion commandes + statuts
│   ├── ClientActivityHistory.tsx   # Historique activités clients
│   │
│   ├── 📁 ui/                       # Composants UI (Radix + Tailwind)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── alert.tsx
│   │   └── ... (autres composants UI)
│   │
│   └── 📁 figma/
│       └── ImageWithFallback.tsx    # Composant image protégé
│
└── 📁 styles/
    └── globals.css                  # Styles Tailwind v4 + tokens CSS
```

## 🔑 Points clés

### Configuration minimale
- ✅ **1 seul fichier Vite** : `vite.config.ts`
- ✅ **Pas de PostCSS config**
- ✅ **Pas de Tailwind config** (tout dans globals.css avec Tailwind v4)
- ✅ **TypeScript minimal** : juste le nécessaire

### Technologies
- ✅ **React 18** + **TypeScript**
- ✅ **Vite** (build ultra-rapide)
- ✅ **Tailwind CSS v4** (configuration dans CSS)

### Architecture
- ✅ **Contextes React** pour l'état global (pas de Redux)
- ✅ **Composants fonctionnels** avec hooks
- ✅ **Données mock** dans un seul fichier `data.ts`
- ✅ **Routing côté client** simple avec state

## 📦 Commandes

```bash
npm install    # Installation
npm run dev    # Développement (port 3000)
npm run build  # Build production
```

## 🎯 Modules du PGI

### 1️⃣ Gestion produits & stocks
- Liste + recherche + filtres
- Fiche détaillée (prix, stock, fournisseur, délai)
- Alertes de réapprovisionnement
- CRUD admin

### 2️⃣ Gestion financière
- Panier avec TPS (5%) + TVQ (9.975%)
- Sommaire facture
- Statuts paiement (payé/attente/partiel)
- Dashboard KPIs

### 3️⃣ CRM
- Inscription/connexion clients
- Historique commandes
- Évaluations satisfaction (⭐)
- Historique activités horodaté (zone employé)

---

**Architecture la plus simple possible : 3 fichiers de config, 0 complexité inutile**
