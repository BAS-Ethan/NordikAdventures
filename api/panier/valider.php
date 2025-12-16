<?php
/**
 * API Valider Panier - Transformer le panier en commande
 * POST /api/panier/valider.php
 */

require_once '../config.php';
require_once '../session_helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Méthode non autorisée', 405);
}

requireAuth();

startSession();

if ($_SESSION['role'] !== 'client' || empty($_SESSION['client_id'])) {
    errorResponse('Seuls les clients peuvent passer des commandes', 403);
}

if (empty($_SESSION['panier'])) {
    errorResponse('Le panier est vide');
}

try {
    $db = getDB();
    $db->beginTransaction();
    
    $client_id = $_SESSION['client_id'];
    $produit_ids = array_keys($_SESSION['panier']);
    
    $placeholders = str_repeat('?,', count($produit_ids) - 1) . '?';
    $stmt = $db->prepare("
        SELECT produit_id, nom, prix_vente, quantite as stock
        FROM produits 
        WHERE produit_id IN ($placeholders) AND statut = 'actif'
        FOR UPDATE
    ");
    $stmt->execute($produit_ids);
    $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $items = [];
    $sous_total = 0;
    
    foreach ($produits as $produit) {
        $produit_id = $produit['produit_id'];
        $quantite_demandee = $_SESSION['panier'][$produit_id];
        
        if ($quantite_demandee > $produit['stock']) {
            $db->rollBack();
            errorResponse("Stock insuffisant pour {$produit['nom']}. Stock disponible: {$produit['stock']}");
        }
        
        $prix_ligne = $produit['prix_vente'] * $quantite_demandee;
        $sous_total += $prix_ligne;
        
        $items[] = [
            'produit_id' => $produit_id,
            'nom' => $produit['nom'],
            'quantite' => $quantite_demandee,
            'prix_unitaire' => $produit['prix_vente'],
            'sous_total' => $prix_ligne
        ];
    }
    
    $taxes = calculerTaxes($sous_total);
    
    $stmt = $db->prepare("
        INSERT INTO ventes (client_id, sous_total, tps, tvq, total, statut)
        VALUES (?, ?, ?, ?, ?, 'reception')
    ");
    $stmt->execute([
        $client_id,
        $taxes['sous_total'],
        $taxes['tps'],
        $taxes['tvq'],
        $taxes['total']
    ]);
    
    $vente_id = $db->lastInsertId();
    
    $stmt = $db->prepare("
        INSERT INTO lignes_vente (vente_id, produit_id, quantite, prix_unitaire, sous_total)
        VALUES (?, ?, ?, ?, ?)
    ");
    
    foreach ($items as $item) {
        $stmt->execute([
            $vente_id,
            $item['produit_id'],
            $item['quantite'],
            $item['prix_unitaire'],
            $item['sous_total']
        ]);
    }

    $numero_facture = genererNumeroFacture($vente_id);
    $stmt = $db->prepare("
        INSERT INTO factures (vente_id, numero_facture, date_facture, total, statut)
        VALUES (?, ?, CURDATE(), ?, 'en_attente')
    ");
    $stmt->execute([$vente_id, $numero_facture, $taxes['total']]);
    
    $facture_id = $db->lastInsertId();
    
    $stmt = $db->prepare("
        INSERT INTO interactions (client_id, type_interaction, description)
        VALUES (?, 'commande', ?)
    ");
    $stmt->execute([
        $client_id, 
        "Commande #{$vente_id} - {$taxes['total']}$"
    ]);

    $_SESSION['panier'] = [];
    
    $db->commit();
    
    successResponse([
        'vente_id' => $vente_id,
        'facture_id' => $facture_id,
        'numero_facture' => $numero_facture,
        'total' => $taxes['total'],
        'details' => [
            'sous_total' => $taxes['sous_total'],
            'tps' => $taxes['tps'],
            'tvq' => $taxes['tvq'],
            'total' => $taxes['total']
        ]
    ], 'Commande créée avec succès');
    
} catch (Exception $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    errorResponse('Erreur lors de la création de la commande: ' . $e->getMessage(), 500);
}
