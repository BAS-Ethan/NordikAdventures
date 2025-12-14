# 🚀 Guide de démarrage rapide

## Installation en 2 commandes

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur
npm run dev
```

✅ L'application s'ouvrira automatiquement sur **http://localhost:3000**

## 🔐 Se connecter

Utilisez un de ces comptes de test :

### 👨‍💼 Administrateur
```
Email: admin@nordik.ca
Mot de passe: admin123
```
→ Accès complet : gestion produits, commandes, clients

### 👤 Employé
```
Email: employe@nordik.ca
Mot de passe: emp123
```
→ Accès : tableaux de bord, historiques clients

### 🛒 Client
```
Email: client@example.com
Mot de passe: client123
```
→ Accès : catalogue, panier, commandes

## 📝 Tester les fonctionnalités

### En tant que CLIENT :
1. **Parcourir le catalogue** → 8 produits de plein air disponibles
2. **Voir une fiche produit** → Cliquer sur un produit
3. **Ajouter au panier** → Quantité + "Ajouter au panier"
4. **Passer commande** → Onglet "Panier" → "Payer maintenant"
5. **Voir l'historique** → Onglet "Mes commandes"

### En tant que ADMIN/EMPLOYÉ :
1. **Voir le dashboard** → KPIs et statistiques
2. **Gérer les produits** → Onglet "Gestion produits"
   - Ajouter/modifier/désactiver des produits
   - Voir les alertes de stock bas
3. **Gérer les commandes** → Onglet "Gestion commandes"
   - Changer les statuts (réception → préparation → expédiée → payée)
   - Modifier les statuts de paiement
4. **Voir les activités clients** → Onglet "Activités clients"
   - Sélectionner un client
   - Voir l'historique horodaté
   - Ajouter des notes manuelles (emails, appels, etc.)

## 🎨 Personnaliser

Modifier les couleurs et styles dans :
```
/styles/globals.css
```

## 📦 Build de production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

## 🔧 Technologies utilisées

- **React 18** + **TypeScript**
- **Vite** (build ultra-rapide)
- **Tailwind CSS v4** (styles modernes)
- **Radix UI** (composants accessibles)
- **Recharts** (graphiques)

## 📂 Fichiers importants

```
/App.tsx           → Composant principal avec routing
/data.ts           → Données mock (modifiable facilement)
/contexts/         → Gestion d'état (Auth + Panier)
/components/       → Tous les composants React
```

## 💡 Prochaines étapes

Pour rendre ce prototype production-ready :
1. Connecter à une vraie base de données (ex: Supabase)
2. Implémenter l'authentification sécurisée (JWT)
3. Ajouter le stockage d'images
4. Déployer sur Vercel/Netlify

---

**C'est tout ! Le projet est prêt à l'emploi avec une configuration minimale** ✨
