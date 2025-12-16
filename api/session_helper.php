<?php
/**
 * Fonctions utilitaires pour la gestion des sessions
 */

function startSession() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
}

function isLoggedIn() {
    startSession();
    return isset($_SESSION['user_id']);
}

function getCurrentUser() {
    startSession();
    if (!isLoggedIn()) {
        return null;
    }
    return [
        'user_id' => $_SESSION['user_id'],
        'email' => $_SESSION['email'],
        'nom' => $_SESSION['nom'],
        'role' => $_SESSION['role']
    ];
}

function hasRole($role) {
    startSession();
    if (!isLoggedIn()) {
        return false;
    }
    return $_SESSION['role'] === $role;
}

function isAdminOrEmployee() {
    startSession();
    if (!isLoggedIn()) {
        return false;
    }
    return in_array($_SESSION['role'], ['admin', 'employe']);
}

function jsonResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function errorResponse($message, $code = 400) {
    jsonResponse(['error' => $message], $code);
}

function successResponse($data, $message = null) {
    $response = ['success' => true];
    if ($message) {
        $response['message'] = $message;
    }
    if ($data) {
        $response['data'] = $data;
    }
    jsonResponse($response);
}

function requireAuth() {
    if (!isLoggedIn()) {
        errorResponse('Non authentifié', 401);
    }
}

function requireAdminOrEmployee() {
    requireAuth();
    if (!isAdminOrEmployee()) {
        errorResponse('Accès refusé', 403);
    }
}
