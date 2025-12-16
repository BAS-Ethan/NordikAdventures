<?php
/**
 * API Logout - Déconnexion utilisateur
 * POST /api/auth/logout.php
 */

require_once '../config.php';
require_once '../session_helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Méthode non autorisée', 405);
}

startSession();

$_SESSION = array();

if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

session_destroy();

successResponse(null, 'Déconnexion réussie');
