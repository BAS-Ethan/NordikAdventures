# Nordik Adventures - Système PGI (ERP)

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Ready_to_Use-success)

Système de Gestion Intégré complet pour Nordik Adventures, PME québécoise spécialisée dans les produits de plein air.

## ⚡ Démarrage rapide

```bash
npm install
npm run dev
```

➡️ **http://localhost:3000** - Utilisez `admin@nordik.ca` / `admin123` pour vous connecter

📖 **Nouveau ?** Lisez [`START_HERE.md`](./START_HERE.md) pour un guide visuel complet !

## 🎯 Configuration minimale

✅ **3 fichiers de config uniquement**
- `vite.config.ts` (8 lignes)
- `tsconfig.json` (14 lignes)  
- `package.json`

✅ **Zéro complexité**
- Pas de PostCSS config
- Pas de Tailwind config séparé
- Pas de fichiers de lint/format
- Architecture la plus simple possible

## 🛠️ Technologies

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS v4**

## 📦 Installation et démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

## 🚀 Build de production

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`

## 🔐 Comptes de test

### Administrateur
- Email: `admin@nordik.ca`
- Mot de passe: `admin123`
- Accès complet à la gestion des produits, commandes et clients

### Employé
- Email: `employe@nordik.ca`
- Mot de passe: `emp123`
- Accès aux tableaux de bord et historiques clients

### Client
- Email: `client@example.com`
- Mot de passe: `client123`
- Accès au catalogue, panier et historique de commandes

## ✨ Fonctionnalités

### 📦 Module - Gestion des produits et stocks
- ✅ Liste dynamique des produits (8 produits de plein air)
- ✅ Fiche produit détaillée (photo, prix, description, quantité, catégorie, fournisseur, délai)
- ✅ Mise à jour automatique du stock après une vente
- ✅ Alerte de réapprovisionnement (si stock ≤ seuil)
- ✅ Interface d'administration (ajouter, modifier, désactiver produit)
- ✅ Gestion des commandes avec statuts (réception, préparation, expédiée, facturée, payée)

### 💰 Module - Gestion financière et facturation
- ✅ Panier d'achats avec calcul dynamique (sous-total, TPS 5%, TVQ 9.975%)
- ✅ Génération de sommaire de facture
- ✅ Enregistrement automatique dans la base de données
- ✅ Statut de paiement (payée / en attente / partielle avec solde)
- ✅ Tableau de bord avec KPIs (ventes, revenus, satisfaction, statuts)

### 👥 Module - Gestion de la relation client (CRM)
- ✅ Inscription et connexion des clients
- ✅ Accès au catalogue de produits avec recherche et filtres
- ✅ Panier d'achats avec achat/paiement en ligne
- ✅ Gestion du statut client (actif / inactif)
- ✅ Historique des commandes du client
- ✅ Message de bienvenue automatisé (première commande)
- ✅ Évaluation de satisfaction (1 à 5 étoiles)
- ✅ Historique horodaté des activités (visites, commandes, emails, appels, documents)
- ✅ Zone restreinte employés pour l'historique client

### 🔧 Éléments transversaux
- ✅ Navigation cohérente et fonctionnelle
- ✅ Gestion de session utilisateur (client / employé / admin)
- ✅ Validation des données (email, stock disponible)
- ✅ Code structuré et bien commenté
- ✅ Architecture simple et maintenable

## 📂 Structure du projet (simplifiée)

```
nordik-adventures-erp/
├── components/              # Composants React
│   ├── ui/                 # Composants UI réutilisables (Radix)
│   ├── LoginPage.tsx       # Authentification
│   ├── ProductCatalog.tsx  # Liste des produits
│   ├── ProductDetail.tsx   # Fiche produit détaillée
│   ├── ShoppingCart.tsx    # Panier d'achats
│   ├── OrderHistory.tsx    # Historique commandes client
│   ├── Dashboard.tsx       # Tableau de bord
│   ├── AdminProducts.tsx   # Gestion produits (admin)
│   ├── AdminOrders.tsx     # Gestion commandes (admin)
│   └── ClientActivityHistory.tsx  # Historique activités (employé)
├── contexts/               # Contextes React
│   ├── AuthContext.tsx     # Authentification et session
│   └── CartContext.tsx     # Panier d'achats
├── styles/                 # Styles CSS
│   └── globals.css         # Styles globaux + Tailwind
├── data.ts                 # Données mock
├── App.tsx                 # Composant racine
├── main.tsx                # Point d'entrée
├── index.html              # HTML de base
├── vite.config.ts          # Configuration Vite (minimal)
├── tsconfig.json           # Configuration TypeScript (minimal)
└── package.json            # Dépendances
```

## 📊 Données de démonstration

Le système contient des données mock pour démonstration:
- **8 produits** de plein air (tentes, sacs, vêtements, équipement)
- **3 utilisateurs** (admin, employé, client)
- **2 commandes** exemples avec historique
- **Activités client** horodatées

## ⚙️ Configuration minimale

Le projet utilise une configuration minimale :
- **3 fichiers de config** uniquement : `vite.config.ts`, `tsconfig.json`, `package.json`
- **Tailwind v4** : configuration dans `styles/globals.css` (pas de fichiers de config supplémentaires)
- **Pas de PostCSS config** ni **Tailwind config** séparés

## 🎨 Personnalisation

Pour modifier les couleurs du thème, éditez `/styles/globals.css`

### Taxes québécoises configurées
- TPS (fédérale): 5%
- TVQ (provinciale): 9.975%

## 🔮 Évolution vers production

Pour connecter à une vraie base de données, vous pouvez utiliser Supabase pour:
- Authentification sécurisée avec JWT
- Base de données PostgreSQL
- Storage pour les images produits
- API temps réel pour les mises à jour

---

**Développé avec ❤️ au Québec**