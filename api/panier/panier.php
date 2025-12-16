<?php
/**
 * API Panier - Gestion du panier d'achat
 * GET /api/panier/panier.php - Voir le panier
 * POST /api/panier/panier.php - Ajouter au panier
 * PUT /api/panier/panier.php - Modifier quantité
 * DELETE /api/panier/panier.php?produit_id=X - Retirer du panier
 */

require_once '../config.php';
require_once '../session_helper.php';

startSession();

if (!isset($_SESSION['panier'])) {
    $_SESSION['panier'] = [];
}

function calculerTotalPanier($db) {
    if (empty($_SESSION['panier'])) {
        return [
            'items' => [],
            'sous_total' => 0,
            'tps' => 0,
            'tvq' => 0,
            'total' => 0,
            'nb_articles' => 0
        ];
    }
    
    $produit_ids = array_keys($_SESSION['panier']);
    $placeholders = str_repeat('?,', count($produit_ids) - 1) . '?';
    
    $stmt = $db->prepare("
        SELECT produit_id, sku, nom, prix_vente, quantite as stock, image_url
        FROM produits 
        WHERE produit_id IN ($placeholders) AND statut = 'actif'
    ");
    $stmt->execute($produit_ids);
    $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $items = [];
    $sous_total = 0;
    $nb_articles = 0;
    
    foreach ($produits as $produit) {
        $produit_id = $produit['produit_id'];
        $quantite = $_SESSION['panier'][$produit_id];
        
        if ($quantite > $produit['stock']) {
            $quantite = $produit['stock'];
            $_SESSION['panier'][$produit_id] = $quantite;
        }
        
        $prix_total = $produit['prix_vente'] * $quantite;
        $sous_total += $prix_total;
        $nb_articles += $quantite;
        
        $items[] = [
            'produit_id' => $produit_id,
            'sku' => $produit['sku'],
            'nom' => $produit['nom'],
            'prix_unitaire' => $produit['prix_vente'],
            'quantite' => $quantite,
            'stock_disponible' => $produit['stock'],
            'prix_total' => $prix_total,
            'image_url' => $produit['image_url']
        ];
    }
    
    $taxes = calculerTaxes($sous_total);
    
    return [
        'items' => $items,
        'sous_total' => $taxes['sous_total'],
        'tps' => $taxes['tps'],
        'tvq' => $taxes['tvq'],
        'total' => $taxes['total'],
        'nb_articles' => $nb_articles
    ];
}

try {
    $db = getDB();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $panier = calculerTotalPanier($db);
        successResponse(['panier' => $panier]);
    }
    
    else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['produit_id'])) {
            errorResponse('produit_id requis');
        }
        
        $produit_id = intval($input['produit_id']);
        $quantite = isset($input['quantite']) ? intval($input['quantite']) : 1;
        
        $stmt = $db->prepare("
            SELECT produit_id, nom, quantite as stock 
            FROM produits 
            WHERE produit_id = ? AND statut = 'actif'
        ");
        $stmt->execute([$produit_id]);
        $produit = $stmt->fetch();
        
        if (!$produit) {
            errorResponse('Produit non trouvé', 404);
        }
        
        $quantite_actuelle = isset($_SESSION['panier'][$produit_id]) ? $_SESSION['panier'][$produit_id] : 0;
        $nouvelle_quantite = $quantite_actuelle + $quantite;
        
        if ($nouvelle_quantite > $produit['stock']) {
            errorResponse('Stock insuffisant. Stock disponible: ' . $produit['stock']);
        }
        
        $_SESSION['panier'][$produit_id] = $nouvelle_quantite;
        
        $panier = calculerTotalPanier($db);
        successResponse(['panier' => $panier], 'Produit ajouté au panier');
    }
    
    else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['produit_id']) || !isset($input['quantite'])) {
            errorResponse('produit_id et quantite requis');
        }
        
        $produit_id = intval($input['produit_id']);
        $quantite = intval($input['quantite']);
        
        if ($quantite < 1) {
            errorResponse('La quantité doit être au moins 1');
        }
        
        if (!isset($_SESSION['panier'][$produit_id])) {
            errorResponse('Produit non trouvé dans le panier', 404);
        }
        
        $stmt = $db->prepare("SELECT quantite as stock FROM produits WHERE produit_id = ?");
        $stmt->execute([$produit_id]);
        $produit = $stmt->fetch();
        
        if ($quantite > $produit['stock']) {
            errorResponse('Stock insuffisant. Stock disponible: ' . $produit['stock']);
        }
        
        $_SESSION['panier'][$produit_id] = $quantite;
        
        $panier = calculerTotalPanier($db);
        successResponse(['panier' => $panier], 'Quantité mise à jour');
    }
    
    else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        if (empty($_GET['produit_id'])) {
            errorResponse('produit_id requis');
        }
        
        $produit_id = intval($_GET['produit_id']);
        
        if (!isset($_SESSION['panier'][$produit_id])) {
            errorResponse('Produit non trouvé dans le panier', 404);
        }
        
        unset($_SESSION['panier'][$produit_id]);
        
        $panier = calculerTotalPanier($db);
        successResponse(['panier' => $panier], 'Produit retiré du panier');
    }
    
    else {
        errorResponse('Méthode non autorisée', 405);
    }
    
} catch (Exception $e) {
    errorResponse('Erreur serveur: ' . $e->getMessage(), 500);
}
