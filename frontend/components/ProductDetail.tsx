import { useState } from "react";
import { Product } from "../data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Store,
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();
  const { isEmployee } = useAuth();

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const needsReorder = product.stock <= product.reorderLevel;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour au catalogue
      </Button>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image */}
        <Card>
          <CardContent className="p-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Informations */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">{product.code}</p>
                  <CardTitle className="text-3xl">{product.name}</CardTitle>
                </div>
                <Badge
                  variant={product.stock > 0 ? "default" : "secondary"}
                  className="text-base px-3 py-1"
                >
                  {product.category}
                </Badge>
              </div>
              <div className="pt-4">
                <p className="text-4xl font-bold text-emerald-700">
                  {product.price.toFixed(2)} $
                </p>
                <p className="text-sm text-slate-500">+ taxes applicables</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <CardDescription className="text-base leading-relaxed">
                  {product.description}
                </CardDescription>
              </div>

              {/* Informations de stock */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-500">Stock disponible</p>
                    <p className="font-semibold">{product.stock} unités</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-500">Livraison</p>
                    <p className="font-semibold">{product.deliveryTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-500">Fournisseur</p>
                    <p className="font-semibold text-sm">{product.supplier}</p>
                  </div>
                </div>
                {isEmployee() && (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="text-sm text-slate-500">Seuil réappro.</p>
                      <p className="font-semibold">
                        {product.reorderLevel} unités
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Alerte de réapprovisionnement */}
              {needsReorder && isEmployee() && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Alerte de réapprovisionnement!</strong>
                    <br />
                    Le stock est en dessous du seuil de réapprovisionnement (
                    {product.reorderLevel} unités). Contactez {product.supplier}{" "}
                    pour commander.
                  </AlertDescription>
                </Alert>
              )}

              {/* Ajout au panier */}
              {product.stock > 0 ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="quantity">Quantité</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(parseInt(e.target.value) || 1)
                        }
                        className="w-24"
                      />
                      <Button
                        className="flex-1 bg-linear-to-r from-emerald-700 to-teal-600"
                        onClick={handleAddToCart}
                        disabled={quantity > product.stock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Ajouter au panier
                      </Button>
                    </div>
                    {quantity > product.stock && (
                      <p className="text-sm text-red-500 mt-1">
                        Quantité non disponible (max: {product.stock})
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    Ce produit est actuellement en rupture de stock. Délai de
                    livraison du fournisseur: {product.deliveryTime}
                  </AlertDescription>
                </Alert>
              )}

              {/* Message de succès */}
              {showSuccess && (
                <Alert className="bg-emerald-50 border-emerald-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <AlertDescription className="text-emerald-700">
                    {quantity}{" "}
                    {quantity > 1 ? "produits ajoutés" : "produit ajouté"} au
                    panier!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}