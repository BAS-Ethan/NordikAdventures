import { useState } from "react";
import { mockOrders, Order } from "../data";
import { useAuth } from "../contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Package,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";

export function OrderHistory() {
  const { user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Filtrer les commandes pour l'utilisateur connecté
  const userOrders = mockOrders.filter((order) => order.userId === user?.id);

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

  const getStatusLabel = (status: Order["status"]) => {
    const labels = {
      reception: "Réception",
      preparation: "Préparation",
      shipped: "Expédiée",
      invoiced: "Facturée",
      paid: "Payée/Fermée",
    };
    return labels[status];
  };

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    const colors = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-orange-100 text-orange-800",
      partial: "bg-yellow-100 text-yellow-800",
    };
    return colors[status];
  };

  const getPaymentStatusLabel = (status: Order["paymentStatus"]) => {
    const labels = {
      paid: "Payé",
      pending: "En attente",
      partial: "Partiel",
    };
    return labels[status];
  };

  if (userOrders.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Package className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <CardTitle className="mb-2">Aucune commande</CardTitle>
          <CardDescription>
            Vous n'avez pas encore passé de commande
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Historique des commandes</CardTitle>
          <CardDescription>
            {userOrders.length}{" "}
            {userOrders.length > 1 ? "commandes" : "commande"}
          </CardDescription>
        </CardHeader>
      </Card>

      {userOrders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Commande #{order.id}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(order.createdAt).toLocaleDateString("fr-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getStatusColor(order.status)}>
                  {getStatusLabel(order.status)}
                </Badge>
                <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                  <CreditCard className="w-3 h-3 mr-1" />
                  {getPaymentStatusLabel(order.paymentStatus)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Articles */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
              >
                <span className="font-semibold">
                  {order.items.length}{" "}
                  {order.items.length > 1 ? "articles" : "article"}
                </span>
                {expandedOrder === order.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>

              {expandedOrder === order.id && (
                <div className="mt-4 space-y-3">
                  {order.items.map((item, idx) => (
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
              )}
            </div>

            <Separator />

            {/* Totaux */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Sous-total</span>
                <span>{order.subtotal.toFixed(2)} $</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">TPS (5%)</span>
                <span>{order.tps.toFixed(2)} $</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">TVQ (9.975%)</span>
                <span>{order.tvq.toFixed(2)} $</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-emerald-700">
                  {order.total.toFixed(2)} $
                </span>
              </div>
              {order.paymentStatus === "partial" && (
                <div className="flex justify-between text-sm text-orange-600">
                  <span>Montant payé</span>
                  <span>{order.paymentAmount.toFixed(2)} $</span>
                </div>
              )}
              {order.paymentStatus === "partial" && (
                <div className="flex justify-between text-sm font-semibold text-orange-600">
                  <span>Solde dû</span>
                  <span>
                    {(order.total - order.paymentAmount).toFixed(2)} $
                  </span>
                </div>
              )}
            </div>

            {/* Évaluation */}
            {order.rating && (
              <div className="flex items-center gap-2 pt-2 border-t">
                <span className="text-sm text-slate-600">
                  Votre évaluation:
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= order.rating!
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}