import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, AlertTriangle, Package, Search } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  price: number;
  stock: number;
  reorderLevel: number;
  category: string;
  image: string;
  status: "active" | "inactive";
}

interface ProductCatalogProps {
  onProductClick: (product: Product) => void;
}

const mapApiProductToProduct = (apiProduct: any): Product => ({
  id: String(apiProduct.produit_id),
  name: apiProduct.nom ?? "",
  code: apiProduct.sku ?? "",
  description: apiProduct.description ?? "",
  price: Number(apiProduct.prix_vente ?? 0),
  stock: Number(apiProduct.quantite ?? 0),
  reorderLevel: Number(apiProduct.seuil_reappro ?? 0),
  category: apiProduct.categorie_nom ?? "Autre",
  image: apiProduct.image_url ?? "/placeholder.jpg",
  status: apiProduct.actif === 1 ? "active" : "active",
});

export function ProductCatalog({ onProductClick }: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:8000/produits/produits.php")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => {
        console.log(data.data.produits[0].quantite);
        const mappedProducts = data.data.produits.map(mapApiProductToProduct);
        setProducts(mappedProducts);
      })
      .catch(() => {
        console.log("Impossible de charger les produits");
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory && product.status === "active";
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock > 0) {
      addToCart(product, 1);
      setAddedToCart(product.id);
      setTimeout(() => setAddedToCart(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle>Catalogue de produits</CardTitle>
          <CardDescription>Découvrez nos produits de plein air</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher par nom ou code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onProductClick(product)}
          >
            <CardHeader className="p-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>

            <CardContent className="pt-4">
              <p className="text-sm text-slate-500">{product.code}</p>
              <CardTitle className="text-lg">{product.name}</CardTitle>

              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-2xl font-bold text-emerald-700">
                    {product.price.toFixed(2)} $
                  </p>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    Stock: {product.stock}
                  </p>
                </div>
                <Badge>{product.category}</Badge>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                onClick={(e) => handleAddToCart(product, e)}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-slate-500">
            Aucun produit trouvé
          </CardContent>
        </Card>
      )}

      {addedToCart && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert className="bg-emerald-700 text-white">
            <ShoppingCart className="h-4 w-4" />
            <AlertDescription>Produit ajouté au panier !</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
