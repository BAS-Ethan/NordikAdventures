import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { ShoppingCart as ShoppingCartIcon, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { mockOrders, Order, OrderItem } from '../data';

interface ShoppingCartProps {
  onCheckout?: (order: Order) => void;
}

export function ShoppingCart({ onCheckout }: ShoppingCartProps) {
  const { items, removeFromCart, updateQuantity, clearCart, getSubtotal, getTPS, getTVQ, getTotal } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    if (!user || items.length === 0) return;

    setIsProcessing(true);

    // Simuler le traitement du paiement
    setTimeout(() => {
      const orderItems: OrderItem[] = items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }));

      const newOrder: Order = {
        id: `o${mockOrders.length + 1}`,
        userId: user.id,
        userName: user.name,
        items: orderItems,
        subtotal: getSubtotal(),
        tps: getTPS(),
        tvq: getTVQ(),
        total: getTotal(),
        status: 'reception',
        paymentStatus: 'paid',
        paymentAmount: getTotal(),
        createdAt: new Date()
      };

      mockOrders.push(newOrder);
      clearCart();
      setIsProcessing(false);

      if (onCheckout) {
        onCheckout(newOrder);
      }
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <ShoppingCartIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <CardTitle className="mb-2">Votre panier est vide</CardTitle>
          <CardDescription>
            Ajoutez des produits depuis le catalogue pour commencer vos achats
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Liste des articles */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Panier d'achats</CardTitle>
            <CardDescription>{items.length} {items.length > 1 ? 'articles' : 'article'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="flex gap-4 pb-4 border-b last:border-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.product.name}</h4>
                  <p className="text-sm text-slate-500">{item.product.code}</p>
                  <p className="text-lg font-bold text-emerald-700 mt-1">
                    {item.product.price.toFixed(2)} $
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        updateQuantity(item.product.id, Math.min(val, item.product.stock));
                      }}
                      className="w-16 text-center"
                      min="1"
                      max={item.product.stock}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sommaire */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sommaire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Sous-total</span>
                <span className="font-semibold">{getSubtotal().toFixed(2)} $</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">TPS (5%)</span>
                <span>{getTPS().toFixed(2)} $</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">TVQ (9.975%)</span>
                <span>{getTVQ().toFixed(2)} $</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-emerald-700">
                  {getTotal().toFixed(2)} $
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-emerald-700 to-teal-600"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {isProcessing ? 'Traitement...' : 'Payer maintenant'}
            </Button>
          </CardFooter>
        </Card>

        {isProcessing && (
          <Alert>
            <AlertDescription>
              Traitement de votre paiement en cours...
            </AlertDescription>
          </Alert>
        )}

        {/* Informations fiscales */}
        <Card className="bg-slate-50">
          <CardContent className="pt-6 text-sm text-slate-600">
            <p className="mb-2">
              <strong>Taxes québécoises:</strong>
            </p>
            <ul className="space-y-1 text-xs">
              <li>• TPS (Taxe fédérale): 5%</li>
              <li>• TVQ (Taxe provinciale): 9.975%</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}