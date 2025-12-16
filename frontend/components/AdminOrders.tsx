import { useState } from "react";
import { mockOrders, Order } from "../data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Package, Calendar, CreditCard, Eye } from "lucide-react";
import { Separator } from "./ui/separator";

export function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const updatePaymentStatus = (
    orderId: string,
    paymentStatus: Order["paymentStatus"]
  ) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, paymentStatus } : order
      )
    );
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      reception: "bg-blue-100 text-blue-800",
      preparation: "bg-yellow-100 text-yellow-800",
      shipped: "bg-purple-100 text-purple-800",
      invoiced: "bg-orange-100 text-orange-800",
      paid: "bg-green-100 text-green-800",
    };
    return colors[status];
  };

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    const colors = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-orange-100 text-orange-800",
      partial: "bg-yellow-100 text-yellow-800",
    };
    return colors[status];
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const paidOrders = orders.filter((o) => o.paymentStatus === "paid").length;

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total des commandes</CardDescription>
            <CardTitle className="text-3xl">{orders.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Commandes payées</CardDescription>
            <CardTitle className="text-3xl text-green-700">
              {paidOrders}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenus totaux</CardDescription>
            <CardTitle className="text-3xl text-emerald-700">
              {totalRevenue.toFixed(2)} $
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table des commandes */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des commandes</CardTitle>
          <CardDescription>
            Suivre et gérer toutes les commandes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut commande</TableHead>
                <TableHead>Statut paiement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">#{order.id}</TableCell>
                  <TableCell className="font-medium">
                    {order.userName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleDateString("fr-CA")}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {order.total.toFixed(2)} $
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value: Order["status"]) =>
                        updateOrderStatus(order.id, value)
                      }
                    >
                      <SelectTrigger className="w-35">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reception">Réception</SelectItem>
                        <SelectItem value="preparation">Préparation</SelectItem>
                        <SelectItem value="shipped">Expédiée</SelectItem>
                        <SelectItem value="invoiced">Facturée</SelectItem>
                        <SelectItem value="paid">Payée/Fermée</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.paymentStatus}
                      onValueChange={(value: Order["paymentStatus"]) =>
                        updatePaymentStatus(order.id, value)
                      }
                    >
                      <SelectTrigger className="w-30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Payé</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="partial">Partiel</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Voir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog détails de commande */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Détails de la commande #{selectedOrder?.id}
            </DialogTitle>
            <DialogDescription>
              Client: {selectedOrder?.userName} | Date:{" "}
              {selectedOrder?.createdAt
                ? new Date(selectedOrder.createdAt).toLocaleDateString("fr-CA")
                : ""}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {/* Statuts */}
              <div className="flex gap-4">
                <Badge className={getStatusColor(selectedOrder.status)}>
                  <Package className="w-3 h-3 mr-1" />
                  {selectedOrder.status}
                </Badge>
                <Badge
                  className={getPaymentStatusColor(selectedOrder.paymentStatus)}
                >
                  <CreditCard className="w-3 h-3 mr-1" />
                  {selectedOrder.paymentStatus}
                </Badge>
              </div>

              <Separator />

              {/* Articles */}
              <div>
                <h4 className="font-semibold mb-3">Articles commandés</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3 bg-slate-50 rounded"
                    >
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-slate-500">
                          Quantité: {item.quantity} × {item.price.toFixed(2)} $
                        </p>
                      </div>
                      <p className="font-semibold">
                        {(item.quantity * item.price).toFixed(2)} $
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Totaux */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Sous-total</span>
                  <span className="font-semibold">
                    {selectedOrder.subtotal.toFixed(2)} $
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">TPS (5%)</span>
                  <span>{selectedOrder.tps.toFixed(2)} $</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">TVQ (9.975%)</span>
                  <span>{selectedOrder.tvq.toFixed(2)} $</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-emerald-700">
                    {selectedOrder.total.toFixed(2)} $
                  </span>
                </div>
                {selectedOrder.paymentStatus === "partial" && (
                  <>
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>Montant payé</span>
                      <span>{selectedOrder.paymentAmount.toFixed(2)} $</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-orange-600">
                      <span>Solde dû</span>
                      <span>
                        {(
                          selectedOrder.total - selectedOrder.paymentAmount
                        ).toFixed(2)}{" "}
                        $
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}