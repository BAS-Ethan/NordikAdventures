# 📘 Documentation technique

## 🏗️ Architecture de l'application

### Stack technique
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI (accessibilité)
- **Charts**: Recharts
- **Icons**: Lucide React

### Gestion d'état
- **Context API** pour l'état global
- Pas de Redux/Zustand (simplicité)

## 📦 Modules principaux

### 1. Authentification (AuthContext)

**Fichier:** `/contexts/AuthContext.tsx`

**État géré:**
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (email: string, password: string, name: string) => boolean;
  isAdmin: () => boolean;
  isEmployee: () => boolean;
  isClient: () => boolean;
}
```

**Utilisation:**
```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isAdmin } = useAuth();
  // ...
}
```

### 2. Panier d'achats (CartContext)

**Fichier:** `/contexts/CartContext.tsx`

**État géré:**
```typescript
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTPS: () => number;        // 5%
  getTVQ: () => number;        // 9.975%
  getTotal: () => number;
}
```

**Calcul des taxes:**
```typescript
const getTPS = () => getSubtotal() * 0.05;      // TPS 5%
const getTVQ = () => getSubtotal() * 0.09975;   // TVQ 9.975%
const getTotal = () => getSubtotal() + getTPS() + getTVQ();
```

## 📊 Modèle de données

### Product (Produit)
```typescript
interface Product {
  id: string;
  code: string;              // Ex: "TENT-001"
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  reorderLevel: number;      // Seuil de réapprovisionnement
  supplier: string;
  deliveryTime: string;      // Ex: "3-5 jours"
  status: 'active' | 'inactive';
  image: string;
}
```

### User (Utilisateur)
```typescript
interface User {
  id: string;
  email: string;
  password: string;          // En production: haché avec bcrypt
  name: string;
  role: 'admin' | 'employee' | 'client';
  status: 'active' | 'inactive';
  createdAt: Date;
}
```

### Order (Commande)
```typescript
interface Order {
  id: string;
  userId: string;
  userName: string;
  items: OrderItem[];
  subtotal: number;
  tps: number;               // TPS 5%
  tvq: number;               // TVQ 9.975%
  total: number;
  status: 'reception' | 'preparation' | 'shipped' | 'invoiced' | 'paid';
  paymentStatus: 'paid' | 'pending' | 'partial';
  paymentAmount: number;
  createdAt: Date;
  rating?: number;           // 1-5 étoiles
}
```

### ClientActivity (Activité client)
```typescript
interface ClientActivity {
  id: string;
  userId: string;
  type: 'visit' | 'page_view' | 'order' | 'email' | 'call' | 'document' | 'note';
  description: string;
  timestamp: Date;
  addedBy?: string;          // Pour les entrées manuelles
}
```

## 🔐 Système de rôles

### Rôle "client"
- ✅ Voir le catalogue produits
- ✅ Ajouter au panier
- ✅ Passer des commandes
- ✅ Voir son historique de commandes
- ❌ Pas d'accès admin

### Rôle "employee"
- ✅ Voir le tableau de bord
- ✅ Voir toutes les commandes
- ✅ Gérer les produits
- ✅ Voir les activités clients
- ✅ Ajouter des notes manuelles
- ⚠️ Accès limité vs admin

### Rôle "admin"
- ✅ Tous les droits
- ✅ CRUD complet sur produits
- ✅ Gestion des commandes
- ✅ Gestion des clients
- ✅ Voir tous les KPIs

## 🎨 Composants UI réutilisables

Tous les composants UI sont dans `/components/ui/`

### Composants utilisés
- `Button` - Boutons avec variantes
- `Card` - Cartes de contenu
- `Input` - Champs de saisie
- `Select` - Listes déroulantes
- `Dialog` - Modales
- `Table` - Tableaux de données
- `Tabs` - Navigation par onglets
- `Badge` - Badges de statut
- `Alert` - Messages d'alerte

### Exemple d'utilisation
```tsx
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Titre</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Cliquer</Button>
      </CardContent>
    </Card>
  );
}
```

## 🔄 Flux de données

### 1. Authentification
```
LoginPage
    ↓
AuthContext.login()
    ↓
Vérification dans mockUsers
    ↓
Mise à jour de l'état user
    ↓
App affiche le contenu authentifié
```

### 2. Ajout au panier
```
ProductCatalog/ProductDetail
    ↓
CartContext.addToCart()
    ↓
Mise à jour de items[]
    ↓
Badge du panier se met à jour
```

### 3. Passage de commande
```
ShoppingCart
    ↓
Calcul TPS + TVQ + Total
    ↓
Création de l'objet Order
    ↓
Ajout dans mockOrders
    ↓
Vider le panier
    ↓
Redirection vers OrderHistory
```

## 🎯 Fonctionnalités clés

### Alerte de réapprovisionnement
```typescript
const needsReorder = product.stock <= product.reorderLevel;

if (needsReorder && isEmployee()) {
  // Afficher l'alerte
}
```

### Calcul des taxes québécoises
```typescript
const subtotal = items.reduce((sum, item) => 
  sum + item.product.price * item.quantity, 0
);

const tps = subtotal * 0.05;       // 5%
const tvq = subtotal * 0.09975;    // 9.975%
const total = subtotal + tps + tvq;
```

### Statuts de commande
```
reception → preparation → shipped → invoiced → paid
```

### Historique horodaté
Toutes les activités sont enregistrées avec un timestamp :
```typescript
{
  timestamp: new Date(),
  type: 'order',
  description: 'Commande #o1 - 896.77$'
}
```

## 🚀 Performance

### Optimisations appliquées
- ✅ Composants fonctionnels (pas de classes)
- ✅ Hooks React optimisés
- ✅ Vite pour le build ultra-rapide
- ✅ Code splitting automatique par Vite
- ✅ Tailwind JIT (génération à la volée)

### À implémenter en production
- [ ] Lazy loading des routes
- [ ] Virtualisation des listes longues
- [ ] Cache des images
- [ ] Service Worker pour offline
- [ ] Compression gzip/brotli

## 🔮 Migration vers production

### Étapes recommandées

**1. Base de données**
```typescript
// Remplacer mockProducts par:
import { supabase } from './supabase';

const { data: products } = await supabase
  .from('products')
  .select('*');
```

**2. Authentification**
```typescript
// Remplacer AuthContext par:
import { supabase } from './supabase';

const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});
```

**3. Storage des images**
```typescript
const { data } = await supabase.storage
  .from('products')
  .upload(`${productId}.jpg`, file);
```

## 📝 Conventions de code

### Nommage
- **Composants**: PascalCase (`ProductCatalog.tsx`)
- **Hooks**: camelCase avec prefix `use` (`useAuth`)
- **Contextes**: PascalCase + suffix `Context` (`AuthContext`)
- **Interfaces**: PascalCase (`Product`, `User`)

### Structure des fichiers
```
MonComposant.tsx
├── Imports
├── Interfaces TypeScript
├── Composant principal (default export)
└── Composants auxiliaires (si nécessaire)
```

### Imports organisés
```typescript
// 1. Bibliothèques externes
import { useState } from 'react';

// 2. Contextes
import { useAuth } from '../contexts/AuthContext';

// 3. Composants
import { Button } from './ui/button';

// 4. Types/Data
import { Product } from '../data';
```

## 🐛 Debugging

### React DevTools
1. Installer l'extension React DevTools
2. Inspecter les composants
3. Voir les props et l'état

### Console logs utiles
```typescript
console.log('User:', user);
console.log('Cart items:', items);
console.log('Total:', getTotal());
```

### Vérifier les contextes
```typescript
// Dans le composant
const auth = useAuth();
console.log('Auth state:', auth);
```

---

**Architecture simple, code propre, performance optimale** ✨
