import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Plus, Edit, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { Textarea } from './ui/textarea';

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: number;
  supplier: string;
  status: 'En stock' | 'Stock faible' | 'Rupture';
}

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const products: Product[] = [
    { id: '1', sku: 'VET-001', name: "Veste technique Arc'teryx", category: 'Vêtements', quantity: 5, minQuantity: 15, price: 349.99, supplier: "Arc'teryx Canada", status: 'Stock faible' },
    { id: '2', sku: 'VET-002', name: 'Pantalon imperméable North Face', category: 'Vêtements', quantity: 42, minQuantity: 20, price: 189.99, supplier: 'The North Face', status: 'En stock' },
    { id: '3', sku: 'SAC-012', name: 'Sac à dos Osprey 65L', category: 'Sacs', quantity: 8, minQuantity: 20, price: 299.99, supplier: 'Osprey Europe', status: 'Stock faible' },
    { id: '4', sku: 'SAC-013', name: 'Sac à dos journée 25L', category: 'Sacs', quantity: 67, minQuantity: 30, price: 89.99, supplier: 'Osprey Europe', status: 'En stock' },
    { id: '5', sku: 'CHAUS-005', name: 'Bottes randonnée Salomon', category: 'Chaussures', quantity: 12, minQuantity: 25, price: 249.99, supplier: 'Salomon Sports', status: 'Stock faible' },
    { id: '6', sku: 'CHAUS-006', name: 'Chaussures trail running', category: 'Chaussures', quantity: 0, minQuantity: 20, price: 179.99, supplier: 'Salomon Sports', status: 'Rupture' },
    { id: '7', sku: 'CAMP-018', name: 'Tente 4 saisons MSR', category: 'Camping', quantity: 3, minQuantity: 10, price: 899.99, supplier: 'MSR International', status: 'Stock faible' },
    { id: '8', sku: 'CAMP-019', name: 'Sac de couchage -20°C', category: 'Camping', quantity: 28, minQuantity: 15, price: 199.99, supplier: 'Mountain Gear Co.', status: 'En stock' },
    { id: '9', sku: 'ACC-045', name: 'Bâtons de randonnée', category: 'Accessoires', quantity: 156, minQuantity: 50, price: 59.99, supplier: 'Black Diamond', status: 'En stock' },
    { id: '10', sku: 'ACC-046', name: 'Lampe frontale LED 400 lumens', category: 'Accessoires', quantity: 89, minQuantity: 40, price: 39.99, supplier: 'Petzl Canada', status: 'En stock' },
  ];

  const categories = ['all', 'Vêtements', 'Sacs', 'Chaussures', 'Camping', 'Accessoires'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stockSummary = {
    total: products.length,
    inStock: products.filter(p => p.status === 'En stock').length,
    lowStock: products.filter(p => p.status === 'Stock faible').length,
    outOfStock: products.filter(p => p.status === 'Rupture').length,
    totalValue: products.reduce((sum, p) => sum + (p.quantity * p.price), 0),
  };

  const getStatusBadge = (status: Product['status']) => {
    const variants = {
      'En stock': 'bg-green-100 text-green-800',
      'Stock faible': 'bg-orange-100 text-orange-800',
      'Rupture': 'bg-red-100 text-red-800',
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Gestion des stocks</h2>
          <p className="text-slate-600">Suivi et gestion de l'inventaire</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau produit</DialogTitle>
              <DialogDescription>Entrez les détails du produit à ajouter à l'inventaire</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="VET-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vêtements">Vêtements</SelectItem>
                      <SelectItem value="sacs">Sacs</SelectItem>
                      <SelectItem value="chaussures">Chaussures</SelectItem>
                      <SelectItem value="camping">Camping</SelectItem>
                      <SelectItem value="accessoires">Accessoires</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit</Label>
                <Input id="name" placeholder="Ex: Veste technique..." />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantité</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minQuantity">Stock minimum</Label>
                  <Input id="minQuantity" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (CAD $)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Fournisseur</Label>
                <Input id="supplier" placeholder="Nom du fournisseur" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Description du produit..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsAddDialogOpen(false)}>
                Ajouter le produit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stockSummary.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              En stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stockSummary.inStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              Stock faible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-600">{stockSummary.lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Package className="w-4 h-4 text-red-600" />
              Rupture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">{stockSummary.outOfStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Valeur totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stockSummary.totalValue.toLocaleString()} $</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Inventaire des produits</CardTitle>
          <CardDescription>Rechercher et filtrer les produits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Rechercher par nom ou SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.filter(c => c !== 'all').map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead className="text-right">Quantité</TableHead>
                  <TableHead className="text-right">Min.</TableHead>
                  <TableHead className="text-right">Prix</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-slate-500 py-8">
                      Aucun produit trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">{product.quantity}</TableCell>
                      <TableCell className="text-right text-slate-500">{product.minQuantity}</TableCell>
                      <TableCell className="text-right">{product.price.toFixed(2)} $</TableCell>
                      <TableCell className="text-sm text-slate-600">{product.supplier}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
