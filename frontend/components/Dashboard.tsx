import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Package,
  DollarSign,
  Users,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function Dashboard() {
  const stats = [
    {
      title: "Revenus du mois",
      value: "127 450 $",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Commandes actives",
      value: "48",
      change: "+3",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Produits en stock",
      value: "1,247",
      change: "-5.2%",
      trend: "down",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Clients actifs",
      value: "892",
      change: "+8.1%",
      trend: "up",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const lowStock = [
    {
      name: "Veste technique Arc'teryx",
      stock: 5,
      minimum: 15,
      sku: "VET-001",
    },
    { name: "Sac à dos Osprey 65L", stock: 8, minimum: 20, sku: "SAC-012" },
    {
      name: "Bottes randonnée Salomon",
      stock: 12,
      minimum: 25,
      sku: "CHAUS-005",
    },
    { name: "Tente 4 saisons MSR", stock: 3, minimum: 10, sku: "CAMP-018" },
  ];

  const recentOrders = [
    {
      id: "CMD-2456",
      client: "Martin Tremblay",
      total: 1245.99,
      status: "En traitement",
      date: "2025-11-01",
    },
    {
      id: "CMD-2455",
      client: "Sophie Gagnon",
      total: 789.5,
      status: "Expédiée",
      date: "2025-11-01",
    },
    {
      id: "CMD-2454",
      client: "Jean Bélanger",
      total: 2134.25,
      status: "Livrée",
      date: "2025-10-31",
    },
    {
      id: "CMD-2453",
      client: "Marie Côté",
      total: 456.75,
      status: "En traitement",
      date: "2025-10-31",
    },
  ];

  const topProducts = [
    { name: "Veste imperméable North Face", sales: 145, revenue: 21750 },
    { name: "Sac de couchage -20°C", sales: 98, revenue: 19600 },
    { name: "Bâtons de randonnée", sales: 234, revenue: 14040 },
    { name: "Lampe frontale LED", sales: 312, revenue: 12480 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Tableau de bord</h2>
        <p className="text-slate-600">
          Vue d'ensemble des opérations Nordik Adventures
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-600" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                  <span>vs. mois dernier</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <CardTitle>Alertes de stock faible</CardTitle>
            </div>
            <CardDescription>
              Produits nécessitant un réapprovisionnement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStock.map((item) => (
              <div key={item.sku} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-orange-600 border-orange-600"
                  >
                    {item.stock} unités
                  </Badge>
                </div>
                <Progress
                  value={(item.stock / item.minimum) * 100}
                  className="h-2"
                />
                <p className="text-xs text-slate-500">
                  Minimum recommandé: {item.minimum} unités
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>Dernières transactions client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between pb-3 border-b last:border-b-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm">{order.id}</p>
                    <p className="text-xs text-slate-500">{order.client}</p>
                    <p className="text-xs text-slate-400">{order.date}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm">{order.total.toFixed(2)} $</p>
                    <Badge
                      variant={
                        order.status === "Livrée" ? "default" : "secondary"
                      }
                      className={
                        order.status === "Livrée"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Expédiée"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <CardTitle>Produits les plus vendus</CardTitle>
            </div>
            <CardDescription>
              Performance des produits ce mois-ci
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{product.name}</p>
                    <p className="text-xs text-slate-500">
                      {product.sales} ventes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {product.revenue.toLocaleString()} $
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}