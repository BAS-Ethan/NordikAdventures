# ⚡ Démarrage en 30 secondes

## 🚀 Les 2 seules commandes à exécuter

```bash
npm install && npm run dev
```

C'est tout ! L'application démarre sur **http://localhost:3000**

---

## 🔐 Connexion

Email : `admin@nordik.ca`  
Mot de passe : `admin123`

---

## ✅ Si ça marche

Vous devriez voir une belle interface avec :
- Un fond blanc propre
- Des boutons colorés
- Une page de connexion stylisée
- Des icônes affichées correctement

**Bravo ! Profitez de l'application.** 🎉

---

## 🔴 Si ça ne marche pas

### Problème 1 : Erreur de dépendances

```
Error: @radix-ui/react-progress could not be resolved
```

**Solution** :
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

📖 Détails → [`INSTALL_FIX.md`](./INSTALL_FIX.md)

---

### Problème 2 : Pas de CSS (tout est blanc et moche)

L'application s'affiche mais sans aucun style.

**✅ Ce problème est déjà résolu !**

Si vous l'avez quand même :
1. Arrêtez le serveur (`Ctrl+C`)
2. Relancez : `npm run dev`
3. Rechargez la page (`F5`)

📖 Détails → [`FIX_CSS.md`](./FIX_CSS.md)

---

### Problème 3 : Port déjà utilisé

```
Error: Port 3000 is already in use
```

**Solution** : Ouvrez `/vite.config.ts` et changez le port :
```typescript
server: {
  port: 3001, // Changez 3000 en 3001
}
```

---

### Problème 4 : Node.js trop ancien

```
Error: Unsupported Node.js version
```

**Solution** : Installez Node.js >= 18.0.0
```bash
node --version  # Vérifier la version
```

Si < 18.0.0, téléchargez la dernière version sur https://nodejs.org

---

## 📚 Pour aller plus loin

Une fois que l'application fonctionne :

1. 📖 Lisez [`START_HERE.md`](./START_HERE.md) - Guide complet
2. 🔍 Explorez [`READY_TO_USE.md`](./READY_TO_USE.md) - Toutes les fonctionnalités
3. 🛠️ Consultez [`TECHNICAL.md`](./TECHNICAL.md) - Documentation technique

---

## 🎯 Fonctionnalités disponibles

### Clients
- Parcourir le catalogue
- Ajouter au panier
- Passer commande (avec TPS + TVQ)
- Voir l'historique des commandes
- Laisser des avis

### Admin/Employés
- Dashboard avec statistiques
- Gérer les produits (CRUD)
- Gérer les commandes
- Voir l'activité des clients
- Rapports et graphiques

---

## ✨ Rappel

**Commande unique** :
```bash
npm install && npm run dev
```

**Connexion** : `admin@nordik.ca` / `admin123`

**URL** : http://localhost:3000

---

**C'est aussi simple que ça !** 🚀
