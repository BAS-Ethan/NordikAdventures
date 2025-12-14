import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { LoginPage } from './components/LoginPage';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetail } from './components/ProductDetail';
import { ShoppingCart } from './components/ShoppingCart';
import { OrderHistory } from './components/OrderHistory';
import { Dashboard } from './components/Dashboard';
import { AdminProducts } from './components/AdminProducts';
import { AdminOrders } from './components/AdminOrders';
import { ClientActivityHistory } from './components/ClientActivityHistory';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import {
  Mountain,
  ShoppingBag,
  ShoppingCart as CartIcon,
  History,
  LayoutDashboard,
  Package,
  FileText,
  Users,
  LogOut
} from 'lucide-react';
import { Product, Order } from './data';
import { Alert, AlertDescription } from './components/ui/alert';

function AppContent() {
  const { user, logout, isAdmin, isEmployee } = useAuth();
  const { items } = useCart();
  const [currentPage, setCurrentPage] = useState<'catalog' | 'cart' | 'orders' | 'admin'>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
  };

  const handleCheckout = (order: Order) => {
    setLastOrder(order);
    setShowOrderSuccess(true);
    setCurrentPage('orders');
    setTimeout(() => setShowOrderSuccess(false), 5000);
  };

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!user) {
    return <LoginPage onLoginSuccess={() => setCurrentPage('catalog')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mountain className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Nordik Adventures</h1>
                <p className="text-emerald-100 text-sm">Système PGI - {user.role === 'admin' ? 'Administrateur' : user.role === 'employee' ? 'Employé' : 'Client'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm opacity-90">{user.name}</p>
                <p className="text-xs opacity-75">{user.email}</p>
              </div>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b sticky top-[88px] z-40">
        <div className="container mx-auto px-4">
          {isEmployee() ? (
            // Menu Admin/Employé
            <Tabs value={currentPage} onValueChange={(v) => setCurrentPage(v as any)} className="w-full">
              <TabsList className="w-full justify-start h-14 bg-transparent border-0 p-0">
                <TabsTrigger value="catalog" className="gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                  <LayoutDashboard className="w-4 h-4" />
                  Tableau de bord
                </TabsTrigger>
                <TabsTrigger value="products" className="gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                  <Package className="w-4 h-4" />
                  Gestion produits
                </TabsTrigger>
                <TabsTrigger value="orders" className="gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                  <FileText className="w-4 h-4" />
                  Gestion commandes
                </TabsTrigger>
                <TabsTrigger value="clients" className="gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                  <Users className="w-4 h-4" />
                  Activités clients
                </TabsTrigger>
              </TabsList>
            </Tabs>
          ) : (
            // Menu Client
            <Tabs value={currentPage} onValueChange={(v) => setCurrentPage(v as any)} className="w-full">
              <TabsList className="w-full justify-start h-14 bg-transparent border-0 p-0">
                <TabsTrigger value="catalog" className="gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                  <ShoppingBag className="w-4 h-4" />
                  Catalogue
                </TabsTrigger>
                <TabsTrigger value="cart" className="gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                  <CartIcon className="w-4 h-4" />
                  Panier
                  {cartItemCount > 0 && (
                    <Badge className="ml-1 bg-emerald-700">{cartItemCount}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="orders" className="gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                  <History className="w-4 h-4" />
                  Mes commandes
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-6">
        {showOrderSuccess && lastOrder && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              <strong>Commande confirmée!</strong> Merci pour votre achat. Votre commande #{lastOrder.id} d'un montant de {lastOrder.total.toFixed(2)} $ a été enregistrée.
              {!lastOrder.rating && (
                <p className="mt-2 text-sm">Un message de bienvenue vous a été envoyé par email!</p>
              )}
            </AlertDescription>
          </Alert>
        )}

        {isEmployee() ? (
          // Vue Admin/Employé
          <>
            {currentPage === 'catalog' && <Dashboard />}
            {currentPage === 'products' && <AdminProducts />}
            {currentPage === 'orders' && <AdminOrders />}
            {currentPage === 'clients' && <ClientActivityHistory />}
          </>
        ) : (
          // Vue Client
          <>
            {currentPage === 'catalog' && (
              <>
                {selectedProduct ? (
                  <ProductDetail product={selectedProduct} onBack={handleBackToCatalog} />
                ) : (
                  <ProductCatalog onProductClick={handleProductClick} />
                )}
              </>
            )}
            {currentPage === 'cart' && <ShoppingCart onCheckout={handleCheckout} />}
            {currentPage === 'orders' && <OrderHistory />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mountain className="w-6 h-6" />
                <span className="font-bold">Nordik Adventures</span>
              </div>
              <p className="text-sm text-slate-300">
                Votre spécialiste en équipement de plein air au Québec
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-sm text-slate-300">
                Email: info@nordikadventures.ca<br />
                Tél: 1-888-NORDIK-1<br />
                Québec, QC
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Système PGI</h3>
              <p className="text-sm text-slate-300">
                Gestion intégrée des produits, finances et clients
              </p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            © 2024 Nordik Adventures. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
