import { useState, useEffect } from "react";
import { mockProducts, Product } from "../data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Plus, Edit, Power, AlertTriangle, Package } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    fetch("http://localhost:8000/produits/produits.php")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur API");
        }
        return res.json();
      })
      .then((data: Product[]) => {
        console.log(data);
        setProducts(data.data.produits);
      })
      .catch(() => {
        console.log("Impossible de charger les produits");
      });
  }, []);

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        status: "active",
        stock: 0,
        reorderLevel: 5,
        price: 0,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      // Modifier le produit existant
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? ({ ...editingProduct, ...formData } as Product)
            : p
        )
      );
    } else {
      // Ajouter un nouveau produit
      const newProduct: Product = {
        id: `p${products.length + 1}`,
        code: formData.code || "",
        name: formData.name || "",
        description: formData.description || "",
        category: formData.category || "",
        price: formData.price || 0,
        stock: formData.stock || 0,
        reorderLevel: formData.reorderLevel || 5,
        supplier: formData.supplier || "",
        deliveryTime: formData.deliveryTime || "",
        status: formData.status || "active",
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500",
      };
      setProducts([...products, newProduct]);
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData({});
  };

  const toggleProductStatus = (productId: string) => {
    setProducts(
      products.map((p) =>
        p.id === productId
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      )
    );
  };

  const lowStockProducts = products.filter(
    (p) => p.stock <= p.reorderLevel && p.status === "active"
  );

  return (
    <div className="space-y-6">
      {/* Alertes de stock bas */}
      {lowStockProducts.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>
              {lowStockProducts.length} produit(s) nécessitent un
              réapprovisionnement:
            </strong>
            <ul className="mt-2 space-y-1 text-sm">
              {lowStockProducts.slice(0, 3).map((p) => (
                <li key={p.id}>
                  {p.name} ({p.code}) - Stock: {p.stock} unités
                </li>
              ))}
              {lowStockProducts.length > 3 && (
                <li>... et {lowStockProducts.length - 3} autre(s)</li>
              )}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestion des produits</CardTitle>
              <CardDescription>
                {products.length} produits au catalogue
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-linear-to-r from-emerald-700 to-teal-600"
                  onClick={() => handleOpenDialog()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau produit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Modifier le produit" : "Nouveau produit"}
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez les informations du produit
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="code">Code produit *</Label>
                      <Input
                        id="code"
                        value={formData.code || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, code: e.target.value })
                        }
                        placeholder="TENT-001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie *</Label>
                      <Input
                        id="category"
                        value={formData.category || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        placeholder="Tentes"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du produit *</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Tente 4 Saisons Alpine Pro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description détaillée du produit..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Prix ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            stock: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reorderLevel">Seuil de réappro. *</Label>
                      <Input
                        id="reorderLevel"
                        type="number"
                        value={formData.reorderLevel || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reorderLevel: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryTime">Délai de livraison *</Label>
                      <Input
                        id="deliveryTime"
                        value={formData.deliveryTime || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deliveryTime: e.target.value,
                          })
                        }
                        placeholder="3-5 jours"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Fournisseur *</Label>
                      <Input
                        id="supplier"
                        value={formData.supplier || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, supplier: e.target.value })
                        }
                        placeholder="Mountain Gear Inc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Statut</Label>
                      <Select
                        value={formData.status || "active"}
                        onValueChange={(value: "active" | "inactive") =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="inactive">Inactif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">URL de l'image</Label>
                    <Input
                      id="image"
                      value={formData.image || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-linear-to-r from-emerald-700 to-teal-600"
                  >
                    {editingProduct ? "Enregistrer" : "Créer"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">
                    {product.code}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price.toFixed(2)} $</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400" />
                      {product.stock}
                      {product.stock <= product.reorderLevel && (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "active" ? "default" : "secondary"
                      }
                    >
                      {product.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(product)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleProductStatus(product.id)}
                      >
                        <Power
                          className={`w-3 h-3 ${
                            product.status === "active"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}