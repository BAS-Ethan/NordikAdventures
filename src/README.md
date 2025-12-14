# Nordik Adventures - Système PGI (ERP)

Système de Gestion Intégré complet pour Nordik Adventures, PME québécoise spécialisée dans les produits de plein air.

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

## 📦 Build de production

```bash
npm run build
```

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
- ✅ Page d'affichage des produits (liste dynamique)
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
- ✅ Accès au catalogue de produits
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

## 🛠️ Technologies

- **React 18** + TypeScript
- **Vite** - Build tool rapide
- **Tailwind CSS** - Styles
- **Radix UI** - Composants accessibles
- **Lucide React** - Icônes
- **Recharts** - Graphiques
- **Context API** - Gestion d'état

## 📂 Structure du projet

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
├── data.ts                 # Données mock (produits, utilisateurs, commandes)
├── styles/                 # Styles CSS
├── App.tsx                 # Composant racine
└── main.tsx                # Point d'entrée

```

## 📊 Données de démonstration

Le système contient des données mock pour démonstration:
- **8 produits** de plein air (tentes, sacs, vêtements, équipement)
- **3 utilisateurs** (admin, employé, client)
- **2 commandes** exemples avec historique
- **Activités client** horodatées

## 🎨 Personnalisation

Pour modifier les couleurs du thème, éditez `/styles/globals.css`

### Taxes québécoises
- TPS (fédérale): 5%
- TVQ (provinciale): 9.975%

## 🔮 Prochaines étapes

Pour connecter ce système à une vraie base de données, vous pouvez utiliser Supabase pour:
- Authentification sécurisée
- Base de données PostgreSQL
- Storage pour les images
- API temps réel

---

**Développé avec ❤️ au Québec**
