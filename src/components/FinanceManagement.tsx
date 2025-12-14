import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DollarSign, TrendingUp, TrendingDown, Receipt, CreditCard, FileText, Download } from 'lucide-react';

interface Invoice {
  id: string;
  orderNumber: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Payée' | 'En attente' | 'En retard' | 'Annulée';
  paymentMethod?: string;
}

interface FinancialSummary {
  revenue: number;
  expenses: number;
  profit: number;
  pending: number;
}

export function FinanceManagement() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const invoices: Invoice[] = [
    { id: 'FACT-2456', orderNumber: 'CMD-2456', client: 'Martin Tremblay', date: '2025-11-01', dueDate: '2025-11-31', amount: 1245.99, status: 'En attente', paymentMethod: 'Carte de crédit' },
    { id: 'FACT-2455', orderNumber: 'CMD-2455', client: 'Sophie Gagnon', date: '2025-11-01', dueDate: '2025-11-31', amount: 789.50, status: 'Payée', paymentMethod: 'Virement' },
    { id: 'FACT-2454', orderNumber: 'CMD-2454', client: 'Jean Bélanger', date: '2025-10-31', dueDate: '2025-11-30', amount: 2134.25, status: 'Payée', paymentMethod: 'Carte de crédit' },
    { id: 'FACT-2453', orderNumber: 'CMD-2453', client: 'Marie Côté', date: '2025-10-31', dueDate: '2025-11-30', amount: 456.75, status: 'En attente' },
    { id: 'FACT-2452', orderNumber: 'CMD-2452', client: 'Pierre Bouchard', date: '2025-10-30', dueDate: '2025-11-29', amount: 1876.40, status: 'Payée', paymentMethod: 'PayPal' },
    { id: 'FACT-2451', orderNumber: 'CMD-2451', client: 'Isabelle Roy', date: '2025-10-29', dueDate: '2025-10-29', amount: 345.00, status: 'En retard' },
    { id: 'FACT-2450', orderNumber: 'CMD-2450', client: 'Luc Pelletier', date: '2025-10-28', dueDate: '2025-11-27', amount: 2567.80, status: 'Payée', paymentMethod: 'Virement' },
    { id: 'FACT-2449', orderNumber: 'CMD-2449', client: 'Nathalie Leblanc', date: '2025-10-27', dueDate: '2025-11-26', amount: 678.90, status: 'En attente' },
  ];

  const financialSummary: FinancialSummary = {
    revenue: 127450,
    expenses: 78920,
    profit: 48530,
    pending: 2381.14,
  };

  const monthlyData = [
    { month: 'Juin', revenue: 98450, expenses: 62300, profit: 36150 },
    { month: 'Juillet', revenue: 112340, expenses: 68900, profit: 43440 },
    { month: 'Août', revenue: 105670, expenses: 71200, profit: 34470 },
    { month: 'Septembre', revenue: 118920, expenses: 74500, profit: 44420 },
    { month: 'Octobre', revenue: 123890, expenses: 76800, profit: 47090 },
    { month: 'Novembre', revenue: 127450, expenses: 78920, profit: 48530 },
  ];

  const getStatusBadge = (status: Invoice['status']) => {
    const variants = {
      'Payée': 'bg-green-100 text-green-800',
      'En attente': 'bg-yellow-100 text-yellow-800',
      'En retard': 'bg-red-100 text-red-800',
      'Annulée': 'bg-slate-100 text-slate-800',
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Gestion des finances</h2>
          <p className="text-slate-600">Facturation et suivi financier</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm">Revenus</CardTitle>
            <div className="bg-green-50 p-2 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{financialSummary.revenue.toLocaleString()} $</div>
            <p className="text-xs text-slate-600 mt-1">+12.5% vs. mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm">Dépenses</CardTitle>
            <div className="bg-red-50 p-2 rounded-lg">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{financialSummary.expenses.toLocaleString()} $</div>
            <p className="text-xs text-slate-600 mt-1">+8.3% vs. mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm">Profit net</CardTitle>
            <div className="bg-blue-50 p-2 rounded-lg">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{financialSummary.profit.toLocaleString()} $</div>
            <p className="text-xs text-slate-600 mt-1">Marge: {((financialSummary.profit / financialSummary.revenue) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm">Paiements en attente</CardTitle>
            <div className="bg-orange-50 p-2 rounded-lg">
              <CreditCard className="w-4 h-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{financialSummary.pending.toLocaleString()} $</div>
            <p className="text-xs text-slate-600 mt-1">{invoices.filter(i => i.status === 'En attente').length} factures</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices" className="gap-2">
            <Receipt className="w-4 h-4" />
            Factures
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileText className="w-4 h-4" />
            Rapports financiers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Factures récentes</CardTitle>
              <CardDescription>Liste de toutes les factures et leur statut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Numéro facture</TableHead>
                      <TableHead>Commande</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead className="text-right">Montant</TableHead>
                      <TableHead>Mode de paiement</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                        <TableCell className="font-mono text-sm">{invoice.orderNumber}</TableCell>
                        <TableCell>{invoice.client}</TableCell>
                        <TableCell className="text-sm text-slate-600">{invoice.date}</TableCell>
                        <TableCell className="text-sm text-slate-600">{invoice.dueDate}</TableCell>
                        <TableCell className="text-right">{invoice.amount.toFixed(2)} $</TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {invoice.paymentMethod || '-'}
                        </TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4" />
                          </Button>
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
          <Card>
            <CardHeader>
              <CardTitle>Performance financière mensuelle</CardTitle>
              <CardDescription>Évolution des revenus, dépenses et profits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {monthlyData.map((data) => (
                  <div key={data.month} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{data.month} 2025</span>
                      <span className="text-sm text-slate-600">
                        Profit: <span className="text-emerald-600">{data.profit.toLocaleString()} $</span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <div 
                          className="h-8 bg-emerald-500 rounded flex items-center justify-end px-2 text-white text-xs"
                          style={{ width: `${(data.revenue / 150000) * 100}%` }}
                        >
                          {data.revenue.toLocaleString()} $
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div 
                          className="h-8 bg-red-400 rounded flex items-center justify-end px-2 text-white text-xs"
                          style={{ width: `${(data.expenses / 150000) * 100}%` }}
                        >
                          {data.expenses.toLocaleString()} $
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                        <span>Revenus</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded"></div>
                        <span>Dépenses</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des revenus</CardTitle>
                <CardDescription>Par catégorie de produits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vêtements</span>
                  <span className="text-sm">42,340 $ (33.2%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Accessoires</span>
                  <span className="text-sm">35,890 $ (28.2%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Camping</span>
                  <span className="text-sm">28,450 $ (22.3%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chaussures</span>
                  <span className="text-sm">15,670 $ (12.3%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sacs</span>
                  <span className="text-sm">5,100 $ (4.0%)</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modes de paiement</CardTitle>
                <CardDescription>Répartition des transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Carte de crédit</span>
                  <span className="text-sm">62.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Virement bancaire</span>
                  <span className="text-sm">23.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">PayPal</span>
                  <span className="text-sm">10.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Autres</span>
                  <span className="text-sm">3.5%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
