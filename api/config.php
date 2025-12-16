<?php
/**
 * Configuration de la base de données - Nordik Adventures
 * 
 * Ce fichier contient les paramètres de connexion à la base de données MySQL
 * Modifiez les valeurs selon votre environnement
 */

// ============================================================================
// PARAMÈTRES DE CONNEXION
// ============================================================================

define('DB_HOST', 'db');        // Hôte MySQL (généralement localhost)
define('DB_NAME', 'nordik_adventures'); // Nom de la base de données
define('DB_USER', 'root');              // Utilisateur MySQL
define('DB_PASS', 'Rugby/2004/');                  // Mot de passe MySQL (vide par défaut avec XAMPP)
define('DB_CHARSET', 'utf8mb4');        // Encodage des caractères

// ============================================================================
// PARAMÈTRES DE L'APPLICATION
// ============================================================================

// Taux de taxes (aussi dans la base de données)
define('TPS_RATE', 0.05);      // 5%
define('TVQ_RATE', 0.09975);   // 9.975%

// Configuration des sessions
define('SESSION_LIFETIME', 7200); // 2 heures en secondes

// Mode développement (affiche les erreurs)
define('DEBUG_MODE', true);

// ============================================================================
// CLASSE DE CONNEXION À LA BASE DE DONNÉES
// ============================================================================

class Database {
    private static $instance = null;
    private $connection;
    
    /**
     * Constructeur privé (Singleton)
     */
    private function __construct() {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            
            $this->connection = new PDO($dsn, DB_USER, DB_PASS, $options);
            
        } catch (PDOException $e) {
            if (DEBUG_MODE) {
                die("Erreur de connexion à la base de données: " . $e->getMessage());
            } else {
                die("Erreur de connexion à la base de données. Veuillez contacter l'administrateur.");
            }
        }
    }
    
    /**
     * Obtenir l'instance unique de la connexion (Singleton)
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Obtenir la connexion PDO
     */
    public function getConnection() {
        return $this->connection;
    }
    
    /**
     * Empêcher le clonage de l'instance
     */
    private function __clone() {}
    
    /**
     * Empêcher la désérialisation de l'instance
     */
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
}

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Obtenir une connexion à la base de données
 * @return PDO
 */
function getDB() {
    return Database::getInstance()->getConnection();
}

/**
 * Tester la connexion à la base de données
 * @return bool
 */
function testConnection() {
    try {
        $db = getDB();
        $stmt = $db->query("SELECT 1");
        return true;
    } catch (Exception $e) {
        return false;
    }
}

/**
 * Calculer les taxes
 * @param float $montant Montant avant taxes
 * @return array ['tps' => float, 'tvq' => float, 'total' => float]
 */
function calculerTaxes($montant) {
    $tps = round($montant * TPS_RATE, 2);
    $tvq = round($montant * TVQ_RATE, 2);
    $total = $montant + $tps + $tvq;
    
    return [
        'sous_total' => round($montant, 2),
        'tps' => $tps,
        'tvq' => $tvq,
        'total' => round($total, 2)
    ];
}

/**
 * Hasher un mot de passe de manière sécurisée
 * @param string $password
 * @return string
 */
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

/**
 * Vérifier un mot de passe
 * @param string $password Mot de passe en clair
 * @param string $hash Hash stocké en base
 * @return bool
 */
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

/**
 * Générer un numéro de facture unique
 * @param int $vente_id
 * @return string
 */
function genererNumeroFacture($vente_id) {
    return 'FAC-' . date('Y') . '-' . str_pad($vente_id, 6, '0', STR_PAD_LEFT);
}

/**
 * Formater un prix pour l'affichage
 * @param float $prix
 * @return string
 */
function formaterPrix($prix) {
    return number_format($prix, 2, ',', ' ') . ' $';
}

/**
 * Sanitize input pour éviter XSS
 * @param string $data
 * @return string
 */
function clean($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

// ============================================================================
// GESTION DES ERREURS
// ============================================================================

if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// ============================================================================
// CONFIGURATION DES EN-TÊTES
// ============================================================================

// Permettre les requêtes CORS (si frontend sur un autre port)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Gérer les requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
