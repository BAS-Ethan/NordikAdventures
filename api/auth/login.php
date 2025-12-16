<?php
/**
 * API Login - Connexion utilisateur
 * POST /api/auth/login.php
 * Body: {"email": "...", "password": "..."}
 */

require_once '../config.php';
require_once '../session_helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Méthode non autorisée', 405);
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['email']) || empty($input['password'])) {
    errorResponse('Email et mot de passe requis');
}

$email = clean($input['email']);
$password = $input['password'];

try {
    $db = getDB();
    
    $stmt = $db->prepare("
        SELECT u.utilisateur_id, u.email, u.password_hash, u.nom, u.prenom, u.role, u.statut,
               c.client_id
        FROM utilisateurs u
        LEFT JOIN clients c ON u.utilisateur_id = c.utilisateur_id
        WHERE u.email = ? AND u.statut = 'actif'
    ");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user) {
        errorResponse('Email ou mot de passe incorrect', 401);
    }
    
    if (!verifyPassword($password, $user['password_hash'])) {
        errorResponse('Email ou mot de passe incorrect', 401);
    }
    
    startSession();
    
    $_SESSION['user_id'] = $user['utilisateur_id'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['nom'] = $user['nom'];
    $_SESSION['prenom'] = $user['prenom'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['client_id'] = $user['client_id'];
    
    if ($user['role'] === 'client' && $user['client_id']) {
        $stmt = $db->prepare("
            INSERT INTO interactions (client_id, type_interaction, description)
            VALUES (?, 'visite', 'Connexion au site')
        ");
        $stmt->execute([$user['client_id']]);
    }
    
    successResponse([
        'user' => [
            'id' => $user['utilisateur_id'],
            'email' => $user['email'],
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'role' => $user['role']
        ]
    ], 'Connexion réussie');
    
} catch (Exception $e) {
    errorResponse('Erreur serveur: ' . $e->getMessage(), 500);
}
