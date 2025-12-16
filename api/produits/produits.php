<?php
/**
 * API Produits - Liste et détails des produits
 * GET /api/produits/produits.php - Liste tous les produits actifs
 * GET /api/produits/produits.php?id=X - Détails d'un produit
 * GET /api/produits/produits.php?categorie=X - Produits par catégorie
 */

require_once '../config.php';
require_once '../session_helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    errorResponse('Méthode non autorisée', 405);
}

try {
    $db = getDB();
    
    if (isset($_GET['id'])) {
        $produit_id = intval($_GET['id']);
        
        $stmt = $db->prepare("
            SELECT p.*, 
                   c.nom as categorie_nom,
                   f.nom as fournisseur_nom,
                   CASE 
                       WHEN p.quantite <= p.seuil_reappro THEN 'alerte'
                       ELSE 'ok'
                   END as statut_stock
            FROM produits p
            LEFT JOIN categories c ON p.categorie_id = c.categorie_id
            LEFT JOIN fournisseurs f ON p.fournisseur_id = f.fournisseur_id
            WHERE p.produit_id = ? AND p.statut = 'actif'
        ");
        $stmt->execute([$produit_id]);
        $produit = $stmt->fetch();

        if (!$produit) {
            errorResponse('Produit non trouvé', 404);
        }
        
        successResponse(['produit' => $produit]);
    }
    
    else if (isset($_GET['categorie'])) {
        $categorie_id = intval($_GET['categorie']);
        
        $stmt = $db->prepare("
            SELECT p.produit_id, p.sku, p.nom, p.description, p.prix_vente, 
                   p.quantite, p.image_url, c.nom as categorie_nom
            FROM produits p
            LEFT JOIN categories c ON p.categorie_id = c.categorie_id
            WHERE p.categorie_id = ? AND p.statut = 'actif'
            ORDER BY p.nom
        ");
        $stmt->execute([$categorie_id]);
        $produits = $stmt->fetchAll();
        
        successResponse(['produits' => $produits]);
    }
    
    else {
        $stmt = $db->query("
            SELECT p.produit_id, p.sku, p.nom, p.description, p.prix_vente, 
                   p.quantite, p.image_url, p.seuil_reappro,
                   c.nom as categorie_nom,
                   CASE 
                       WHEN p.quantite <= p.seuil_reappro THEN 'alerte'
                       WHEN p.quantite > p.seuil_reappro THEN 'ok'
                   END as statut_stock
            FROM produits p
            LEFT JOIN categories c ON p.categorie_id = c.categorie_id
            WHERE p.statut = 'actif'
            ORDER BY p.categorie_id, p.nom
        ");
        $produits = $stmt->fetchAll();
        
        successResponse(['produits' => $produits]);
    }
    
} catch (Exception $e) {
    errorResponse('Erreur serveur: ' . $e->getMessage(), 500);
}
