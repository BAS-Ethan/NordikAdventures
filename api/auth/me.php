<?php
/**
 * API Me - Obtenir l'utilisateur connecté
 * GET /api/auth/me.php
 */

require_once '../config.php';
require_once '../session_helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    errorResponse('Méthode non autorisée', 405);
}

requireAuth();

successResponse([
    'user' => getCurrentUser()
]);
