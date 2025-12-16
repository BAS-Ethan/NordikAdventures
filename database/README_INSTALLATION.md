# NORDIK ADVENTURES - BASE DE DONNÉES
## Guide d'installation simplifié

---

## 📋 PRÉREQUIS

- MySQL 5.7+ ou MariaDB 10.3+
- Accès root ou privilèges suffisants pour créer une base de données

---

## 🚀 INSTALLATION RAPIDE

### Méthode 1: Ligne de commande (Recommandé)

```bash
# Se connecter à MySQL
mysql -u root -p

# Exécuter le script complet
source /chemin/vers/nordik_adventures.sql
```

### Méthode 3: Commande directe

```bash
mysql -u root -p < nordik_adventures.sql
```

---

## 📊 CONTENU DE LA BASE DE DONNÉES

### Tables principales créées:

#### Module Produits & Inventaire
- `produits` - 30 produits insérés
- `categories` - 7 catégories
- `fournisseurs` - 4 fournisseurs
- `mouvements` - Historique des mouvements de stock

#### Module Ventes & Facturation
- `ventes` - Commandes clients
- `lignes_vente` - Détails des commandes
- `factures` - Factures générées
- `paiements` - Paiements reçus

#### Module Relation Client
- `utilisateurs` - 4 utilisateurs de test
- `clients` - Informations clients
- `interactions` - Historique des interactions
- `evaluations` - Notes de satisfaction
- `campagnes` - Campagnes marketing

#### Module Achats
- `achats` - Commandes fournisseurs
- `lignes_achat` - Détails des achats

#### Module Comptabilité
- `parametres_fiscaux` - TPS (5%) et TVQ (9.975%)
- `journal_comptable` - Écritures comptables

---

## 👤 COMPTES DE TEST

### Administrateur
- **Email:** admin@nordik.ca
- **Mot de passe:** password123
- **Rôle:** admin

### Employé
- **Email:** employe@nordik.ca
- **Mot de passe:** password123
- **Rôle:** employe

### Client 1
- **Email:** client1@example.com
- **Mot de passe:** password123
- **Rôle:** client

### Client 2
- **Email:** client2@example.com
- **Mot de passe:** password123
- **Rôle:** client

> ⚠️ **IMPORTANT:** Ces mots de passe sont hashés avec bcrypt dans la base de données.
> Le hash utilisé est: `$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi`

---

## 🔧 FONCTIONNALITÉS AUTOMATIQUES

### Triggers automatiques:
1. **Mise à jour du stock** après chaque vente
2. **Message de bienvenue** à la première commande
3. **Calcul automatique** des sous-totaux
4. **Enregistrement des mouvements** de stock

### Vues créées:
1. **v_produits_alertes** - Produits avec alertes de réapprovisionnement
2. **v_ventes_resumees** - Résumé des ventes avec informations clients
3. **v_dashboard_stats** - Statistiques pour le tableau de bord

### Procédures stockées:
1. **sp_creer_vente** - Créer une vente complète avec calcul des taxes
2. **sp_produits_a_reapprovisionner** - Liste des produits à commander

---

## 📦 DONNÉES INCLUSES

- **30 produits** complets avec images
- **7 catégories** de produits
- **4 fournisseurs** actifs
- **4 utilisateurs** de test (1 admin, 1 employé, 2 clients)
- **1 vente** d'exemple avec facture et paiement
- **Paramètres fiscaux** configurés (TPS et TVQ)

---

## 🔍 VÉRIFICATION DE L'INSTALLATION

### Tester la connexion:

```sql
-- Se connecter à la base
USE nordik_adventures;

-- Vérifier les produits
SELECT COUNT(*) as nb_produits FROM produits;
-- Résultat attendu: 30

-- Vérifier les utilisateurs
SELECT COUNT(*) as nb_utilisateurs FROM utilisateurs;
-- Résultat attendu: 4

-- Afficher les produits en alerte
SELECT * FROM v_produits_alertes WHERE niveau_alerte != 'ok';

-- Statistiques du dashboard
SELECT * FROM v_dashboard_stats;
```

---

## 🔐 CONFIGURATION POUR PHP

### Paramètres de connexion:

```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'nordik_adventures');
define('DB_USER', 'root');           // Modifier selon votre config
define('DB_PASS', 'votre_mot_de_passe'); // Modifier selon votre config
define('DB_CHARSET', 'utf8mb4');
?>
```

---

## 📝 RÈGLES D'AFFAIRES IMPLÉMENTÉES

### ✅ Automatisations actives:

1. **Stock automatique:** Le stock se met à jour automatiquement après chaque vente
2. **Alertes de réapprovisionnement:** Détection automatique quand stock ≤ seuil
3. **Message de bienvenue:** Envoi automatique à la première commande client
4. **Calcul des taxes:** TPS 5% + TVQ 9.975% appliqués automatiquement
5. **Traçabilité:** Tous les mouvements de stock sont enregistrés

