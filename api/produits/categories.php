<?php
/**
 * API Catégories - Liste des catégories
 * GET /api/produits/categories.php
 */

require_once '../config.php';
require_once '../session_helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    errorResponse('Méthode non autorisée', 405);
}

try {
    $db = getDB();
    
    $stmt = $db->query("
        SELECT c.categorie_id, c.nom, c.description,
               COUNT(p.produit_id) as nb_produits
        FROM categories c
        LEFT JOIN produits p ON c.categorie_id = p.categorie_id AND p.statut = 'actif'
        GROUP BY c.categorie_id
        ORDER BY c.nom
    ");
    $categories = $stmt->fetchAll();
    
    successResponse(['categories' => $categories]);

} catch (Exception $e) {
    errorResponse('Erreur serveur: ' . $e->getMessage(), 500);
}
