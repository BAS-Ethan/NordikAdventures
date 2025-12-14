import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Plus, Mail, Phone, MapPin, Star, TrendingUp, UserPlus, MessageSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'VIP' | 'Actif' | 'Inactif';
  satisfaction: number;
}

interface Interaction {
  id: string;
  customerId: string;
  customerName: string;
  type: 'Appel' | 'Email' | 'Chat' | 'Rencontre';
  subject: string;
  date: string;
  status: 'Résolu' | 'En cours' | 'En attente';
}

export function CustomerRelationship() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isAddInteractionOpen, setIsAddInteractionOpen] = useState(false);

  const customers: Customer[] = [
    { id: '1', name: 'Martin Tremblay', email: 'martin.tremblay@email.com', phone: '514-555-0123', city: 'Montréal', totalOrders: 24, totalSpent: 8450.50, lastOrder: '2025-11-01', status: 'VIP', satisfaction: 5 },
    { id: '2', name: 'Sophie Gagnon', email: 'sophie.gagnon@email.com', phone: '418-555-0234', city: 'Québec', totalOrders: 18, totalSpent: 6230.75, lastOrder: '2025-11-01', status: 'VIP', satisfaction: 5 },
    { id: '3', name: 'Jean Bélanger', email: 'jean.belanger@email.com', phone: '514-555-0345', city: 'Laval', totalOrders: 12, totalSpent: 4567.80, lastOrder: '2025-10-31', status: 'Actif', satisfaction: 4 },
    { id: '4', name: 'Marie Côté', email: 'marie.cote@email.com', phone: '450-555-0456', city: 'Longueuil', totalOrders: 8, totalSpent: 2890.25, lastOrder: '2025-10-31', status: 'Actif', satisfaction: 5 },
    { id: '5', name: 'Pierre Bouchard', email: 'pierre.bouchard@email.com', phone: '819-555-0567', city: 'Gatineau', totalOrders: 15, totalSpent: 5678.90, lastOrder: '2025-10-30', status: 'VIP', satisfaction: 4 },
    { id: '6', name: 'Isabelle Roy', email: 'isabelle.roy@email.com', phone: '514-555-0678', city: 'Montréal', totalOrders: 6, totalSpent: 1234.50, lastOrder: '2025-10-29', status: 'Actif', satisfaction: 4 },
    { id: '7', name: 'Luc Pelletier', email: 'luc.pelletier@email.com', phone: '418-555-0789', city: 'Québec', totalOrders: 3, totalSpent: 876.40, lastOrder: '2025-08-15', status: 'Inactif', satisfaction: 3 },
    { id: '8', name: 'Nathalie Leblanc', email: 'nathalie.leblanc@email.com', phone: '450-555-0890', city: 'Sherbrooke', totalOrders: 9, totalSpent: 3456.70, lastOrder: '2025-10-27', status: 'Actif', satisfaction: 5 },
  ];

  const interactions: Interaction[] = [
    { id: '1', customerId: '1', customerName: 'Martin Tremblay', type: 'Email', subject: 'Demande de retour produit', date: '2025-11-01', status: 'En cours' },
    { id: '2', customerId: '2', customerName: 'Sophie Gagnon', type: 'Appel', subject: 'Question sur délai livraison', date: '2025-11-01', status: 'Résolu' },
    { id: '3', customerId: '3', customerName: 'Jean Bélanger', type: 'Chat', subject: 'Modification de commande', date: '2025-10-31', status: 'Résolu' },
    { id: '4', customerId: '4', customerName: 'Marie Côté', type: 'Email', subject: 'Demande de conseil produit', date: '2025-10-30', status: 'En attente' },
    { id: '5', customerId: '5', customerName: 'Pierre Bouchard', type: 'Appel', subject: 'Réclamation garantie', date: '2025-10-29', status: 'En cours' },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchQuery.toLowerCase();
    return customer.name.toLowerCase().includes(searchLower) ||
           customer.email.toLowerCase().includes(searchLower) ||
           customer.phone.includes(searchQuery);
  });

  const customerStats = {
    total: customers.length,
    vip: customers.filter(c => c.status === 'VIP').length,
    active: customers.filter(c => c.status === 'Actif').length,
    inactive: customers.filter(c => c.status === 'Inactif').length,
    avgSatisfaction: (customers.reduce((sum, c) => sum + c.satisfaction, 0) / customers.length).toFixed(1),
  };

  const getStatusBadge = (status: Customer['status']) => {
    const variants = {
      'VIP': 'bg-purple-100 text-purple-800',
      'Actif': 'bg-green-100 text-green-800',
      'Inactif': 'bg-slate-100 text-slate-800',
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  const getInteractionStatusBadge = (status: Interaction['status']) => {
    const variants = {
      'Résolu': 'bg-green-100 text-green-800',
      'En cours': 'bg-blue-100 text-blue-800',
      'En attente': 'bg-yellow-100 text-yellow-800',
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Gestion de la relation client (CRM)</h2>
          <p className="text-slate-600">Suivi des clients et interactions</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddInteractionOpen} onOpenChange={setIsAddInteractionOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Nouvelle interaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enregistrer une interaction</DialogTitle>
                <DialogDescription>Documenter un échange avec un client</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Client</Label>
                  <Select>
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="Sélectionner un client" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type d'interaction</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appel">Appel téléphonique</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="chat">Chat en ligne</SelectItem>
                      <SelectItem value="rencontre">Rencontre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" placeholder="Ex: Question sur produit" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Détails de l'interaction..." rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddInteractionOpen(false)}>Annuler</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsAddInteractionOpen(false)}>
                  Enregistrer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Nouveau client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau client</DialogTitle>
                <DialogDescription>Entrez les informations du client</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Ex: Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Courriel</Label>
                  <Input id="email" type="email" placeholder="jean.dupont@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="514-555-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" placeholder="Montréal" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCustomerOpen(false)}>Annuler</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsAddCustomerOpen(false)}>
                  Ajouter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{customerStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-600" />
              Clients VIP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{customerStats.vip}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Clients actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{customerStats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Clients inactifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{customerStats.inactive}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Satisfaction moy.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl flex items-center gap-1">
              {customerStats.avgSatisfaction}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Base de clients</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liste des clients</CardTitle>
              <CardDescription>Gérer et suivre vos clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Rechercher par nom, email ou téléphone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Ville</TableHead>
                      <TableHead className="text-right">Commandes</TableHead>
                      <TableHead className="text-right">Total dépensé</TableHead>
                      <TableHead>Dernière commande</TableHead>
                      <TableHead>Satisfaction</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-slate-500 py-8">
                          Aucun client trouvé
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div>
                              <p>{customer.name}</p>
                              <p className="text-xs text-slate-500">{customer.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            <div className="flex items-center gap-1 text-slate-600">
                              <Phone className="w-3 h-3" />
                              {customer.phone}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <MapPin className="w-3 h-3" />
                              {customer.city}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{customer.totalOrders}</TableCell>
                          <TableCell className="text-right">{customer.totalSpent.toLocaleString()} $</TableCell>
                          <TableCell className="text-sm text-slate-600">{customer.lastOrder}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {customer.satisfaction}
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(customer.status)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des interactions</CardTitle>
              <CardDescription>Suivi des échanges avec les clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Sujet</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interactions.map((interaction) => (
                      <TableRow key={interaction.id}>
                        <TableCell>{interaction.customerName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {interaction.type === 'Email' && <Mail className="w-4 h-4 text-slate-500" />}
                            {interaction.type === 'Appel' && <Phone className="w-4 h-4 text-slate-500" />}
                            {interaction.type === 'Chat' && <MessageSquare className="w-4 h-4 text-slate-500" />}
                            <span className="text-sm">{interaction.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{interaction.subject}</TableCell>
                        <TableCell className="text-sm text-slate-600">{interaction.date}</TableCell>
                        <TableCell>{getInteractionStatusBadge(interaction.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Voir détails</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <CardTitle>Top 5 clients (valeur)</CardTitle>
                </div>
                <CardDescription>Classement par montant total dépensé</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {customers
                  .sort((a, b) => b.totalSpent - a.totalSpent)
                  .slice(0, 5)
                  .map((customer, index) => (
                    <div key={customer.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-sm">
                          {index + 1}
                        </div>
                        <span className="text-sm">{customer.name}</span>
                      </div>
                      <span className="text-sm">{customer.totalSpent.toLocaleString()} $</span>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition géographique</CardTitle>
                <CardDescription>Clients par ville</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(
                  customers.reduce((acc, c) => {
                    acc[c.city] = (acc[c.city] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                )
                  .sort((a, b) => b[1] - a[1])
                  .map(([city, count]) => (
                    <div key={city} className="flex items-center justify-between">
                      <span className="text-sm">{city}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{count} clients</span>
                        <span className="text-xs text-slate-500">
                          ({((count / customers.length) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Niveau de satisfaction</CardTitle>
                <CardDescription>Distribution des notes client</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = customers.filter(c => c.satisfaction === rating).length;
                  const percentage = (count / customers.length) * 100;
                  return (
                    <div key={rating} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          {rating} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <span>{count} clients</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactions par type</CardTitle>
                <CardDescription>Canaux de communication utilisés</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(
                  interactions.reduce((acc, i) => {
                    acc[i.type] = (acc[i.type] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                )
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {type === 'Email' && <Mail className="w-4 h-4 text-slate-500" />}
                        {type === 'Appel' && <Phone className="w-4 h-4 text-slate-500" />}
                        {type === 'Chat' && <MessageSquare className="w-4 h-4 text-slate-500" />}
                        <span className="text-sm">{type}</span>
                      </div>
                      <span className="text-sm">{count} interactions</span>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
