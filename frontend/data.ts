// Données mock pour le prototype
// Ces données seront remplacées par Supabase pour la version finale

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  reorderLevel: number;
  supplier: string;
  deliveryTime: string;
  status: 'active' | 'inactive';
  image: string;
}

export interface User {
  id: string;
  email: string;
  password: string; // Dans un vrai système, ceci serait haché
  name: string;
  role: 'admin' | 'employee' | 'client';
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: OrderItem[];
  subtotal: number;
  tps: number; // 5%
  tvq: number; // 9.975%
  total: number;
  status: 'reception' | 'preparation' | 'shipped' | 'invoiced' | 'paid';
  paymentStatus: 'paid' | 'pending' | 'partial';
  paymentAmount: number;
  createdAt: Date;
  rating?: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface ClientActivity {
  id: string;
  userId: string;
  type: 'visit' | 'page_view' | 'order' | 'email' | 'call' | 'document' | 'note';
  description: string;
  timestamp: Date;
  addedBy?: string; // Pour les entrées manuelles
}

// Produits Nordik Adventures
export const mockProducts: Product[] = [
  {
    id: 'p1',
    code: 'TENT-001',
    name: 'Tente 4 Saisons Alpine Pro',
    description: 'Tente ultra-résistante pour conditions extrêmes. Capacité 2 personnes. Tissu ripstop imperméable.',
    category: 'Tentes',
    price: 549.99,
    stock: 12,
    reorderLevel: 5,
    supplier: 'Mountain Gear Inc.',
    deliveryTime: '3-5 jours',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500'
  },
  {
    id: 'p2',
    code: 'TENT-002',
    name: 'Tente Camping Familiale 6P',
    description: 'Grande tente familiale avec 2 chambres séparées. Facile à monter.',
    category: 'Tentes',
    price: 389.99,
    stock: 8,
    reorderLevel: 3,
    supplier: 'Mountain Gear Inc.',
    deliveryTime: '3-5 jours',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500'
  },
  {
    id: 'p3',
    code: 'BAG-001',
    name: 'Sac à Dos Randonnée 65L',
    description: 'Sac à dos technique avec armature ajustable. Système d\'hydratation compatible.',
    category: 'Sacs',
    price: 229.99,
    stock: 15,
    reorderLevel: 8,
    supplier: 'Trail Equipment Ltd.',
    deliveryTime: '2-4 jours',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=500'
  },
  {
    id: 'p4',
    code: 'BAG-002',
    name: 'Sac à Dos Urbain 25L',
    description: 'Sac compact pour usage quotidien. Compartiment laptop 15".',
    category: 'Sacs',
    price: 89.99,
    stock: 25,
    reorderLevel: 10,
    supplier: 'Trail Equipment Ltd.',
    deliveryTime: '2-4 jours',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
  },
  {
    id: 'p5',
    code: 'CLOTH-001',
    name: 'Veste Technique Imperméable',
    description: 'Veste Gore-Tex 3 couches. Respirante et coupe-vent.',
    category: 'Vêtements',
    price: 449.99,
    stock: 20,
    reorderLevel: 10,
    supplier: 'Outdoor Apparel Co.',
    deliveryTime: '5-7 jours',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'
  },
  {
    id: 'p6',
    code: 'CLOTH-002',
    name: 'Pantalon Trekking Convertible',
    description: 'Pantalon convertible en short. Tissu anti-UV et séchage rapide.',
    category: 'Vêtements',
    price: 119.99,
    stock: 4,
    reorderLevel: 8,
    supplier: 'Outdoor Apparel Co.',
    deliveryTime: '5-7 jours',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500'
  },
  {
    id: 'p7',
    code: 'SLEEP-001',
    name: 'Sac de Couchage -20°C',
    description: 'Sac de couchage duvet d\'oie. Confort extrême jusqu\'à -20°C.',
    category: 'Couchage',
    price: 329.99,
    stock: 10,
    reorderLevel: 5,
    supplier: 'Mountain Gear Inc.',
    deliveryTime: '3-5 jours',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1536304929831-4f8774a0d1d0?w=500'
  },
  {
    id: 'p8',
    code: 'COOK-001',
    name: 'Réchaud Camping Portable',
    description: 'Réchaud compact au gaz. Allumage piezo intégré.',
    category: 'Cuisine',
    price: 79.99,
    stock: 18,
    reorderLevel: 6,
    supplier: 'Camp Kitchen Supplies',
    deliveryTime: '2-3 jours',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500'
  }
];

// Utilisateurs mock
export const mockUsers: User[] = [
  {
    id: 'u1',
    email: 'admin@nordik.ca',
    password: 'admin123',
    name: 'Admin Nordik',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'u2',
    email: 'employe@nordik.ca',
    password: 'emp123',
    name: 'Marie Tremblay',
    role: 'employee',
    status: 'active',
    createdAt: new Date('2024-02-15')
  },
  {
    id: 'u3',
    email: 'client@example.com',
    password: 'client123',
    name: 'Jean Dupont',
    role: 'client',
    status: 'active',
    createdAt: new Date('2024-10-01')
  }
];

// Commandes mock
export const mockOrders: Order[] = [
  {
    id: 'o1',
    userId: 'u3',
    userName: 'Jean Dupont',
    items: [
      { productId: 'p1', productName: 'Tente 4 Saisons Alpine Pro', quantity: 1, price: 549.99 },
      { productId: 'p3', productName: 'Sac à Dos Randonnée 65L', quantity: 1, price: 229.99 }
    ],
    subtotal: 779.98,
    tps: 38.99,
    tvq: 77.80,
    total: 896.77,
    status: 'paid',
    paymentStatus: 'paid',
    paymentAmount: 896.77,
    createdAt: new Date('2024-11-15'),
    rating: 5
  },
  {
    id: 'o2',
    userId: 'u3',
    userName: 'Jean Dupont',
    items: [
      { productId: 'p5', productName: 'Veste Technique Imperméable', quantity: 1, price: 449.99 }
    ],
    subtotal: 449.99,
    tps: 22.50,
    tvq: 44.87,
    total: 517.36,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentAmount: 517.36,
    createdAt: new Date('2024-12-01')
  }
];

// Activités client mock
export const mockActivities: ClientActivity[] = [
  {
    id: 'a1',
    userId: 'u3',
    type: 'visit',
    description: 'Première visite sur le site',
    timestamp: new Date('2024-10-01 14:30')
  },
  {
    id: 'a2',
    userId: 'u3',
    type: 'page_view',
    description: 'Page: Tentes',
    timestamp: new Date('2024-10-01 14:35')
  },
  {
    id: 'a3',
    userId: 'u3',
    type: 'order',
    description: 'Commande #o1 - 896.77$',
    timestamp: new Date('2024-11-15 10:20')
  },
  {
    id: 'a4',
    userId: 'u3',
    type: 'email',
    description: 'Email de bienvenue envoyé',
    timestamp: new Date('2024-11-15 10:25'),
    addedBy: 'u2'
  },
  {
    id: 'a5',
    userId: 'u3',
    type: 'call',
    description: 'Appel téléphonique: Question sur délai de livraison',
    timestamp: new Date('2024-11-20 15:00'),
    addedBy: 'u2'
  }
];
