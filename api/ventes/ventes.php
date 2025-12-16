<?php
/**
 * API Ventes - Gestion des ventes/commandes
 * GET /api/ventes/ventes.php - Liste des ventes (selon le rôle)
 * GET /api/ventes/ventes.php?id=X - Détails d'une vente
 */

require_once '../config.php';
require_once '../session_helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    errorResponse('Méthode non autorisée', 405);
}

requireAuth();

try {
    $db = getDB();
    $user = getCurrentUser();
    
    if (isset($_GET['id'])) {
        $vente_id = intval($_GET['id']);
        
        $query = "
            SELECT v.*, 
                   u.nom as client_nom, u.prenom as client_prenom, u.email as client_email,
                   f.numero_facture, f.statut as statut_facture
            FROM ventes v
            JOIN clients c ON v.client_id = c.client_id
            JOIN utilisateurs u ON c.utilisateur_id = u.utilisateur_id
            LEFT JOIN factures f ON v.vente_id = f.vente_id
            WHERE v.vente_id = ?
        ";
        
        if ($user['role'] === 'client') {
            $query .= " AND c.client_id = ?";
            $stmt = $db->prepare($query);
            $stmt->execute([$vente_id, $_SESSION['client_id']]);
        } else {
            $stmt = $db->prepare($query);
            $stmt->execute([$vente_id]);
        }
        
        $vente = $stmt->fetch();
        
        if (!$vente) {
            errorResponse('Vente non trouvée', 404);
        }
        
        $stmt = $db->prepare("
            SELECT lv.*, p.nom as produit_nom, p.sku, p.image_url
            FROM lignes_vente lv
            JOIN produits p ON lv.produit_id = p.produit_id
            WHERE lv.vente_id = ?
        ");
        $stmt->execute([$vente_id]);
        $vente['items'] = $stmt->fetchAll();
        
        $stmt = $db->prepare("
            SELECT note, commentaire, date_evaluation
            FROM evaluations
            WHERE vente_id = ?
        ");
        $stmt->execute([$vente_id]);
        $vente['evaluation'] = $stmt->fetch();
        
        successResponse(['vente' => $vente]);
    }
    
    else {
        $query = "
            SELECT v.vente_id, v.date_vente, v.total, v.statut,
                   u.nom as client_nom, u.prenom as client_prenom,
                   COUNT(lv.ligne_vente_id) as nb_articles,
                   f.numero_facture, f.statut as statut_facture
            FROM ventes v
            JOIN clients c ON v.client_id = c.client_id
            JOIN utilisateurs u ON c.utilisateur_id = u.utilisateur_id
            LEFT JOIN lignes_vente lv ON v.vente_id = lv.vente_id
            LEFT JOIN factures f ON v.vente_id = f.vente_id
        ";
        
        if ($user['role'] === 'client') {
            $query .= " WHERE c.client_id = ?";
            $query .= " GROUP BY v.vente_id ORDER BY v.date_vente DESC";
            
            $stmt = $db->prepare($query);
            $stmt->execute([$_SESSION['client_id']]);
        } else {
            $query .= " GROUP BY v.vente_id ORDER BY v.date_vente DESC";
            
            if (isset($_GET['statut'])) {
                $query = str_replace('GROUP BY', 'WHERE v.statut = ? GROUP BY', $query);
                $stmt = $db->prepare($query);
                $stmt->execute([clean($_GET['statut'])]);
            } else {
                $stmt = $db->query($query);
            }
        }
        
        $ventes = $stmt->fetchAll();
        
        successResponse(['ventes' => $ventes]);
    }
    
} catch (Exception $e) {
    errorResponse('Erreur serveur: ' . $e->getMessage(), 500);
}
