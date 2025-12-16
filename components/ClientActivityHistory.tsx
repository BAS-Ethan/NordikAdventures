import { useState } from "react";
import { mockActivities, mockUsers, ClientActivity } from "../data";
import { useAuth } from "../contexts/AuthContext";
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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import {
  Eye,
  Mail,
  Phone,
  FileText,
  StickyNote,
  Plus,
  Calendar,
  User as UserIcon,
} from "lucide-react";

export function ClientActivityHistory() {
  const [activities, setActivities] = useState(mockActivities);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<ClientActivity>>({
    type: "note",
  });
  const { user } = useAuth();

  // Filtrer uniquement les clients
  const clients = mockUsers.filter((u) => u.role === "client");

  // Filtrer les activités pour le client sélectionné
  const filteredActivities = selectedUserId
    ? activities.filter((a) => a.userId === selectedUserId)
    : [];

  const selectedClient = clients.find((c) => c.id === selectedUserId);

  const handleAddActivity = () => {
    if (!selectedUserId || !newActivity.description) return;

    const activity: ClientActivity = {
      id: `a${activities.length + 1}`,
      userId: selectedUserId,
      type: newActivity.type as ClientActivity["type"],
      description: newActivity.description,
      timestamp: new Date(),
      addedBy: user?.id,
    };

    setActivities([activity, ...activities]);
    setNewActivity({ type: "note" });
    setIsDialogOpen(false);
  };

  const getActivityIcon = (type: ClientActivity["type"]) => {
    const icons = {
      visit: <Eye className="w-4 h-4" />,
      page_view: <Eye className="w-4 h-4" />,
      order: <FileText className="w-4 h-4" />,
      email: <Mail className="w-4 h-4" />,
      call: <Phone className="w-4 h-4" />,
      document: <FileText className="w-4 h-4" />,
      note: <StickyNote className="w-4 h-4" />,
    };
    return icons[type];
  };

  const getActivityColor = (type: ClientActivity["type"]) => {
    const colors = {
      visit: "bg-blue-100 text-blue-800",
      page_view: "bg-blue-100 text-blue-800",
      order: "bg-green-100 text-green-800",
      email: "bg-purple-100 text-purple-800",
      call: "bg-orange-100 text-orange-800",
      document: "bg-slate-100 text-slate-800",
      note: "bg-yellow-100 text-yellow-800",
    };
    return colors[type];
  };

  const getActivityLabel = (type: ClientActivity["type"]) => {
    const labels = {
      visit: "Visite",
      page_view: "Page vue",
      order: "Commande",
      email: "Email",
      call: "Appel",
      document: "Document",
      note: "Note",
    };
    return labels[type];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historique des activités clients</CardTitle>
          <CardDescription>
            Zone réservée aux employés - Suivez toutes les interactions avec vos
            clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="client-select">Sélectionner un client</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger id="client-select">
                  <SelectValue placeholder="Choisir un client..." />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        {client.name} ({client.email})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedUserId && (
              <div className="flex items-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-linear-to-r from-emerald-700 to-teal-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une activité
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter une activité</DialogTitle>
                      <DialogDescription>
                        Client: {selectedClient?.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="activity-type">Type d'activité</Label>
                        <Select
                          value={newActivity.type}
                          onValueChange={(value: ClientActivity["type"]) =>
                            setNewActivity({ ...newActivity, type: value })
                          }
                        >
                          <SelectTrigger id="activity-type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="call">
                              Appel téléphonique
                            </SelectItem>
                            <SelectItem value="note">Note</SelectItem>
                            <SelectItem value="document">Document</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="activity-description">
                          Description
                        </Label>
                        <Textarea
                          id="activity-description"
                          value={newActivity.description || ""}
                          onChange={(e) =>
                            setNewActivity({
                              ...newActivity,
                              description: e.target.value,
                            })
                          }
                          placeholder="Décrivez l'activité..."
                          rows={4}
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
                        onClick={handleAddActivity}
                        disabled={!newActivity.description}
                        className="bg-linear-to-r from-emerald-700 to-teal-600"
                      >
                        Ajouter
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedUserId && selectedClient && (
        <Card>
          <CardHeader>
            <CardTitle>Informations du client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">Nom</p>
                <p className="font-semibold">{selectedClient.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold">{selectedClient.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Statut</p>
                <Badge
                  variant={
                    selectedClient.status === "active" ? "default" : "secondary"
                  }
                >
                  {selectedClient.status === "active" ? "Actif" : "Inactif"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-slate-500">Membre depuis</p>
                <p className="font-semibold">
                  {new Date(selectedClient.createdAt).toLocaleDateString(
                    "fr-CA"
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedUserId && (
        <Card>
          <CardHeader>
            <CardTitle>Historique horodaté</CardTitle>
            <CardDescription>
              {filteredActivities.length}{" "}
              {filteredActivities.length > 1 ? "activités" : "activité"}{" "}
              enregistrées
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                Aucune activité enregistrée pour ce client
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex gap-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(
                          activity.type
                        )}`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getActivityColor(activity.type)}>
                          {getActivityLabel(activity.type)}
                        </Badge>
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(activity.timestamp).toLocaleDateString(
                            "fr-CA",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-slate-700">{activity.description}</p>
                      {activity.addedBy && (
                        <p className="text-xs text-slate-500 mt-1">
                          Ajouté manuellement par{" "}
                          {
                            mockUsers.find((u) => u.id === activity.addedBy)
                              ?.name
                          }
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!selectedUserId && (
        <Card>
          <CardContent className="py-12 text-center text-slate-500">
            Sélectionnez un client pour voir son historique d'activités
          </CardContent>
        </Card>
      )}
    </div>
  );
}
