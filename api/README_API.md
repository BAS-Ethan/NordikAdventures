# 🚀 API NORDIK ADVENTURES - PHASE 1

API REST simple en PHP pour le site e-commerce Nordik Adventures

---

## 📁 STRUCTURE DES FICHIERS

```
api/
├── config.php                    # Configuration DB + utilitaires
├── session_helper.php            # Gestion des sessions
│
├── auth/
│   ├── login.php                 # POST - Connexion
│   ├── logout.php                # POST - Déconnexion
│   └── me.php                    # GET - Utilisateur connecté
│
├── produits/
│   ├── produits.php              # GET - Liste/détails produits
│   └── categories.php            # GET - Liste des catégories
│
├── panier/
│   ├── panier.php                # GET/POST/PUT/DELETE - Gestion panier
│   └── valider.php               # POST - Transformer panier en commande
│
└── ventes/
    └── ventes.php                # GET - Liste/détails ventes
```

---

## 🔐 AUTHENTIFICATION

### 1. Connexion (Login)
**POST** `/api/auth/login.php`

**Body:**
```json
{
  "email": "admin@nordik.ca",
  "password": "password123"
}
```

**Réponse succès (200):**
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "user": {
      "id": 1,
      "email": "admin@nordik.ca",
      "nom": "Admin",
      "prenom": "Nordik",
      "role": "admin"
    }
  }
}
```

### 2. Déconnexion (Logout)
**POST** `/api/auth/logout.php`

**Réponse succès (200):**
```json
{
  "success": true,
  "message": "Déconnexion réussie"
}
```

### 3. Utilisateur connecté
**GET** `/api/auth/me.php`

**Réponse succès (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "user_id": 1,
      "email": "admin@nordik.ca",
      "nom": "Admin",
      "role": "admin"
    }
  }
}
```

---

## 📦 PRODUITS

### 1. Liste tous les produits
**GET** `/api/produits/produits.php`

**Réponse succès (200):**
```json
{
  "success": true,
  "data": {
    "produits": [
      {
        "produit_id": 1,
        "sku": "NC-TNT-001",
        "nom": "Tente légère 2 places",
        "description": "...",
        "prix_vente": 299.00,
        "quantite": 18,
        "categorie_nom": "Tentes & abris",
        "image_url": "...",
        "statut_stock": "ok"
      }
    ]
  }
}
```

### 2. Détails d'un produit
**GET** `/api/produits/produits.php?id=1`

### 3. Produits par catégorie
**GET** `/api/produits/produits.php?categorie=1`

### 4. Liste des catégories
**GET** `/api/produits/categories.php`

---

## 🛒 PANIER

### 1. Voir le panier
**GET** `/api/panier/panier.php`

**Réponse succès (200):**
```json
{
  "success": true,
  "data": {
    "panier": {
      "items": [
        {
          "produit_id": 1,
          "sku": "NC-TNT-001",
          "nom": "Tente légère 2 places",
          "prix_unitaire": 299.00,
          "quantite": 2,
          "stock_disponible": 18,
          "prix_total": 598.00,
          "image_url": "..."
        }
      ],
      "sous_total": 598.00,
      "tps": 29.90,
      "tvq": 59.65,
      "total": 687.55,
      "nb_articles": 2
    }
  }
}
```

### 2. Ajouter au panier
**POST** `/api/panier/panier.php`

**Body:**
```json
{
  "produit_id": 1,
  "quantite": 2
}
```

### 3. Modifier quantité
**PUT** `/api/panier/panier.php`

**Body:**
```json
{
  "produit_id": 1,
  "quantite": 3
}
```

### 4. Retirer du panier
**DELETE** `/api/panier/panier.php?produit_id=1`

### 5. Valider le panier (créer commande)
**POST** `/api/panier/valider.php`

⚠️ Nécessite d'être connecté en tant que client

**Réponse succès (200):**
```json
{
  "success": true,
  "message": "Commande créée avec succès",
  "data": {
    "vente_id": 2,
    "facture_id": 2,
    "numero_facture": "FAC-2024-000002",
    "total": 687.55,
    "details": {
      "sous_total": 598.00,
      "tps": 29.90,
      "tvq": 59.65,
      "total": 687.55
    }
  }
}
```

---

## 📋 VENTES

### 1. Liste des ventes
**GET** `/api/ventes/ventes.php`

⚠️ Nécessite d'être connecté
- **Client**: Voit seulement ses ventes
- **Admin/Employé**: Voit toutes les ventes

**Filtres disponibles:**
- `?statut=paye` - Filtrer par statut

### 2. Détails d'une vente
**GET** `/api/ventes/ventes.php?id=1`

**Réponse succès (200):**
```json
{
  "success": true,
  "data": {
    "vente": {
      "vente_id": 1,
      "date_vente": "2024-12-16 10:30:00",
      "sous_total": 598.00,
      "tps": 29.90,
      "tvq": 59.65,
      "total": 687.55,
      "statut": "paye",
      "client_nom": "Dupont",
      "client_prenom": "Jean",
      "numero_facture": "FAC-2024-000001",
      "items": [
        {
          "produit_id": 1,
          "produit_nom": "Tente légère 2 places",
          "sku": "NC-TNT-001",
          "quantite": 2,
          "prix_unitaire": 299.00,
          "sous_total": 598.00
        }
      ]
    }
  }
}
```

---

## 🔧 CODES DE RÉPONSE HTTP

- **200** - Succès
- **201** - Créé avec succès
- **400** - Erreur de validation (données manquantes/invalides)
- **401** - Non authentifié
- **403** - Accès refusé (permissions insuffisantes)
- **404** - Ressource non trouvée
- **405** - Méthode HTTP non autorisée
- **500** - Erreur serveur

---

## ✅ FONCTIONNALITÉS AUTOMATIQUES

### Triggers de la base de données:
1. **Stock automatique** - Le stock se met à jour après chaque vente
2. **Mouvements de stock** - Chaque mouvement est enregistré
3. **Message de bienvenue** - Envoyé automatiquement à la première commande
4. **Calcul des sous-totaux** - Calculé automatiquement pour chaque ligne

### Gestion de session:
- Les sessions PHP gèrent l'authentification
- Le panier est stocké en session
- Cookie de session automatique

---

## 🧪 TESTER L'API

### Avec cURL:

**1. Login:**
```bash
curl -X POST http://localhost/api/auth/login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"client1@example.com","password":"password123"}' \
  -c cookies.txt
```

**2. Voir les produits:**
```bash
curl http://localhost/api/produits/produits.php
```

**3. Ajouter au panier:**
```bash
curl -X POST http://localhost/api/panier/panier.php \
  -H "Content-Type: application/json" \
  -d '{"produit_id":1,"quantite":2}' \
  -b cookies.txt
```

**4. Voir le panier:**
```bash
curl http://localhost/api/panier/panier.php -b cookies.txt
```

**5. Valider la commande:**
```bash
curl -X POST http://localhost/api/panier/valider.php -b cookies.txt
```

---

## 📝 COMPTES DE TEST

### Administrateur:
- Email: `admin@nordik.ca`
- Password: `password123`

### Employé:
- Email: `employe@nordik.ca`
- Password: `password123`

### Client:
- Email: `client1@example.com`
- Password: `password123`

---

## ⚙️ CONFIGURATION

Modifier `/api/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'nordik_adventures');
define('DB_USER', 'root');
define('DB_PASS', '');  // Votre mot de passe MySQL
```

---

## 🎯 RÈGLES D'AFFAIRES IMPLÉMENTÉES

✅ Validation du stock avant ajout au panier
✅ Calcul automatique TPS (5%) + TVQ (9.975%)
✅ Mise à jour automatique du stock après vente
✅ Génération automatique de numéro de facture
✅ Message de bienvenue à la première commande
✅ Enregistrement automatique des interactions
✅ Protection SQL injection (requêtes préparées)
✅ Gestion des permissions par rôle

---

## ✨ PROCHAINES ÉTAPES (Phase 2 et 3)

- Dashboard avec statistiques
- Gestion admin des produits (CRUD complet)
- Mise à jour statut des commandes
- Évaluations clients
- Historique des interactions
- Génération de factures PDF
- Alertes de réapprovisionnement

---

**API créée avec ❤️ pour le TP#3 Nordik Adventures**
