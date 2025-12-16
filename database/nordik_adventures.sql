-- ============================================================================
-- BASE DE DONNÉES NORDIK ADVENTURES - TP#3
-- Script de création complet (structure + données)
-- ============================================================================

-- Création de la base de données
DROP DATABASE IF EXISTS nordik_adventures;
CREATE DATABASE nordik_adventures CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nordik_adventures;

-- ============================================================================
-- TABLES DE BASE
-- ============================================================================

-- Table des catégories
CREATE TABLE categories (
    categorie_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table des fournisseurs
CREATE TABLE fournisseurs (
    fournisseur_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    email VARCHAR(100),
    telephone VARCHAR(20),
    code_fournisseur VARCHAR(50),
    remise_defaut DECIMAL(5,2) DEFAULT 0,
    statut ENUM('actif', 'inactif') DEFAULT 'actif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table des produits
CREATE TABLE produits (
    produit_id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    nom VARCHAR(200) NOT NULL,
    description TEXT,
    categorie_id INT,
    prix_achat DECIMAL(10,2) NOT NULL,
    prix_vente DECIMAL(10,2) NOT NULL,
    marge_brute DECIMAL(5,4),
    quantite INT DEFAULT 0,
    seuil_reappro INT DEFAULT 5,
    stock_min_securite INT DEFAULT 3,
    delai_livraison INT DEFAULT 7,
    fournisseur_id INT,
    poids DECIMAL(10,2),
    emplacement_entrepot VARCHAR(50),
    statut ENUM('actif', 'inactif') DEFAULT 'actif',
    date_entree_stock DATE,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(categorie_id),
    FOREIGN KEY (fournisseur_id) REFERENCES fournisseurs(fournisseur_id)
) ENGINE=InnoDB;

-- Table des utilisateurs
CREATE TABLE utilisateurs (
    utilisateur_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    telephone VARCHAR(20),
    role ENUM('admin', 'employe', 'client') NOT NULL,
    statut ENUM('actif', 'inactif') DEFAULT 'actif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table des clients (informations supplémentaires)
CREATE TABLE clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT UNIQUE NOT NULL,
    adresse VARCHAR(255),
    ville VARCHAR(100),
    province VARCHAR(50),
    code_postal VARCHAR(10),
    date_premiere_commande DATE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(utilisateur_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================================
-- MODULE VENTES ET FACTURATION
-- ============================================================================

-- Table des ventes
CREATE TABLE ventes (
    vente_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    date_vente DATETIME DEFAULT CURRENT_TIMESTAMP,
    sous_total DECIMAL(10,2) NOT NULL,
    tps DECIMAL(10,2) NOT NULL,
    tvq DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    statut ENUM('reception', 'preparation', 'expedie', 'facture', 'paye') DEFAULT 'reception',
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
) ENGINE=InnoDB;

-- Table des lignes de vente
CREATE TABLE lignes_vente (
    ligne_vente_id INT AUTO_INCREMENT PRIMARY KEY,
    vente_id INT NOT NULL,
    produit_id INT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    sous_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (vente_id) REFERENCES ventes(vente_id) ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES produits(produit_id)
) ENGINE=InnoDB;

-- Table des factures
CREATE TABLE factures (
    facture_id INT AUTO_INCREMENT PRIMARY KEY,
    vente_id INT UNIQUE NOT NULL,
    numero_facture VARCHAR(50) UNIQUE NOT NULL,
    date_facture DATE NOT NULL,
    date_echeance DATE,
    total DECIMAL(10,2) NOT NULL,
    statut ENUM('payee', 'en_attente', 'partielle') DEFAULT 'en_attente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vente_id) REFERENCES ventes(vente_id)
) ENGINE=InnoDB;

-- Table des paiements
CREATE TABLE paiements (
    paiement_id INT AUTO_INCREMENT PRIMARY KEY,
    facture_id INT NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    date_paiement DATETIME DEFAULT CURRENT_TIMESTAMP,
    mode_paiement ENUM('carte', 'virement', 'comptant', 'cheque') DEFAULT 'carte',
    reference VARCHAR(100),
    FOREIGN KEY (facture_id) REFERENCES factures(facture_id)
) ENGINE=InnoDB;

-- ============================================================================
-- MODULE RELATION CLIENT
-- ============================================================================

-- Table des interactions clients
CREATE TABLE interactions (
    interaction_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    type_interaction ENUM('visite', 'vue_page', 'commande', 'email', 'appel', 'document', 'note') NOT NULL,
    description TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ajoute_par INT,
    FOREIGN KEY (client_id) REFERENCES clients(client_id),
    FOREIGN KEY (ajoute_par) REFERENCES utilisateurs(utilisateur_id)
) ENGINE=InnoDB;

-- Table des évaluations
CREATE TABLE evaluations (
    evaluation_id INT AUTO_INCREMENT PRIMARY KEY,
    vente_id INT UNIQUE NOT NULL,
    client_id INT NOT NULL,
    note INT CHECK (note >= 1 AND note <= 5),
    commentaire TEXT,
    date_evaluation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vente_id) REFERENCES ventes(vente_id),
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
) ENGINE=InnoDB;

-- Table des campagnes marketing
CREATE TABLE campagnes (
    campagne_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    description TEXT,
    date_debut DATE,
    date_fin DATE,
    budget DECIMAL(10,2),
    taux_reponse DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table de liaison clients-campagnes
CREATE TABLE clients_campagnes (
    client_campagne_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    campagne_id INT NOT NULL,
    date_participation DATE,
    FOREIGN KEY (client_id) REFERENCES clients(client_id),
    FOREIGN KEY (campagne_id) REFERENCES campagnes(campagne_id),
    UNIQUE KEY (client_id, campagne_id)
) ENGINE=InnoDB;

-- ============================================================================
-- MODULE ACHATS ET STOCK
-- ============================================================================

-- Table des achats (commandes fournisseurs)
CREATE TABLE achats (
    achat_id INT AUTO_INCREMENT PRIMARY KEY,
    fournisseur_id INT NOT NULL,
    date_achat DATE NOT NULL,
    date_reception DATE,
    total DECIMAL(10,2) NOT NULL,
    statut ENUM('commande', 'en_transit', 'recu', 'facture') DEFAULT 'commande',
    FOREIGN KEY (fournisseur_id) REFERENCES fournisseurs(fournisseur_id)
) ENGINE=InnoDB;

-- Table des lignes d'achat
CREATE TABLE lignes_achat (
    ligne_achat_id INT AUTO_INCREMENT PRIMARY KEY,
    achat_id INT NOT NULL,
    produit_id INT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (achat_id) REFERENCES achats(achat_id) ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES produits(produit_id)
) ENGINE=InnoDB;

-- Table des mouvements de stock
CREATE TABLE mouvements (
    mouvement_id INT AUTO_INCREMENT PRIMARY KEY,
    produit_id INT NOT NULL,
    type_mouvement ENUM('entree', 'sortie', 'ajustement') NOT NULL,
    quantite INT NOT NULL,
    date_mouvement DATETIME DEFAULT CURRENT_TIMESTAMP,
    reference VARCHAR(100),
    note TEXT,
    FOREIGN KEY (produit_id) REFERENCES produits(produit_id)
) ENGINE=InnoDB;

-- ============================================================================
-- MODULE COMPTABILITÉ
-- ============================================================================

-- Table des paramètres fiscaux
CREATE TABLE parametres_fiscaux (
    parametre_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    taux DECIMAL(6,4) NOT NULL,
    actif BOOLEAN DEFAULT TRUE,
    date_debut DATE,
    date_fin DATE
) ENGINE=InnoDB;

-- Table du journal comptable
CREATE TABLE journal_comptable (
    ecriture_id INT AUTO_INCREMENT PRIMARY KEY,
    date_ecriture DATE NOT NULL,
    type_ecriture ENUM('debit', 'credit') NOT NULL,
    description TEXT,
    montant DECIMAL(10,2) NOT NULL,
    reference VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================================
-- INSERTION DES DONNÉES DE BASE
-- ============================================================================

-- Insertion des paramètres fiscaux (TPS et TVQ)
INSERT INTO parametres_fiscaux (nom, taux, actif, date_debut) VALUES
('TPS', 0.05, TRUE, '2024-01-01'),
('TVQ', 0.09975, TRUE, '2024-01-01');

-- Insertion des catégories
INSERT INTO categories (nom, description) VALUES
('Tentes & abris', 'Tentes, abris et accessoires de camping'),
('Sacs à dos', 'Sacs de randonnée et urbains'),
('Vêtements', 'Vêtements techniques et accessoires'),
('Couchage', 'Sacs de couchage et matelas'),
('Cuisine', 'Réchauds et ustensiles de camping'),
('Éclairage', 'Lampes et lanternes'),
('Navigation', 'GPS, boussoles et cartes'),
('Électronique & navigation', 'Montres GPS, boussoles, chargeurs solaires et accessoires électroniques');

-- Insertion des fournisseurs
INSERT INTO fournisseurs (nom, adresse, email, telephone, code_fournisseur, remise_defaut, statut) VALUES
('AventureX', '123 Rue Principale, Montréal, QC', 'contact@aventurex.ca', '514-555-0100', 'AX', 5.00, 'actif'),
('TrekSupply', '456 Ave du Trekking, Québec, QC', 'info@treksupply.ca', '418-555-0200', 'TS', 4.00, 'actif'),
('MontNord', '789 Blvd du Nord, Sherbrooke, QC', 'ventes@montnord.ca', '819-555-0300', 'MN', 3.00, 'actif'),
('OutdoorPro', '321 Rue Aventure, Gatineau, QC', 'commandes@outdoorpro.ca', '819-555-0400', 'OP', 6.00, 'actif');

-- Insertion des utilisateurs (mot de passe : "password123" - haché pour l'exemple)
INSERT INTO utilisateurs (email, password_hash, nom, prenom, telephone, role, statut) VALUES
('admin@nordik.ca', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'Nordik', '514-555-1000', 'admin', 'actif'),
('employe@nordik.ca', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Tremblay', 'Marie', '514-555-1001', 'employe', 'actif'),
('client1@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dupont', 'Jean', '514-555-2001', 'client', 'actif'),
('client2@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Martin', 'Sophie', '514-555-2002', 'client', 'actif');

-- Insertion des informations clients
INSERT INTO clients (utilisateur_id, adresse, ville, province, code_postal) VALUES
(3, '123 Rue Exemple', 'Montréal', 'QC', 'H1A 1A1'),
(4, '456 Ave Test', 'Québec', 'QC', 'G1A 1A1');

-- ============================================================================
-- INSERTION DES 30 PRODUITS DEPUIS LE FICHIER EXCEL
-- ============================================================================

-- Produits Tentes & abris (catégorie 1)
INSERT INTO produits (sku, nom, description, categorie_id, prix_achat, prix_vente, marge_brute, quantite, seuil_reappro, stock_min_securite, delai_livraison, fournisseur_id, poids, date_entree_stock, emplacement_entrepot, statut, image_url) VALUES
('NC-TNT-001', 'Tente légère 2 places', 'Tente ultra-légère parfaite pour la randonnée. Résistante aux intempéries avec double toit.', 1, 145.00, 299.00, 0.5150, 18, 5, 3, 10, 1, 2.8, '2025-03-02', 'A1', 'actif', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500'),
('NC-TNT-002', 'Tente familiale 6 places', 'Grande tente familiale spacieuse avec 2 chambres séparées. Montage facile.', 1, 260.00, 499.00, 0.4790, 9, 3, 2, 14, 1, 6.5, '2025-02-18', 'A1', 'actif', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500'),
('NC-TNT-003', 'Toile imperméable 3x3 m', 'Toile polyvalente pour abri de fortune. 100% imperméable avec œillets renforcés.', 1, 25.00, 59.00, 0.5760, 25, 8, 5, 7, 2, 1.1, '2025-03-10', 'A2', 'actif', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500'),
('NC-TNT-004', 'Tapis de sol isolant', 'Tapis isolant thermique et imperméable. Léger et compact.', 1, 18.00, 39.00, 0.5380, 40, 10, 6, 6, 3, 0.9, '2025-03-05', 'A2', 'actif', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500'),
('NC-TNT-005', 'Abri cuisine pliable', 'Abri de cuisine avec structure pliable. Protection contre soleil et pluie.', 1, 75.00, 149.00, 0.4970, 12, 4, 3, 9, 1, 5.0, '2025-02-20', 'A1', 'actif', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500');

-- Produits Sacs à dos (catégorie 2)
INSERT INTO produits (sku, nom, description, categorie_id, prix_achat, prix_vente, marge_brute, quantite, seuil_reappro, stock_min_securite, delai_livraison, fournisseur_id, poids, date_entree_stock, emplacement_entrepot, statut, image_url) VALUES
('NC-SAC-001', 'Sac à dos randonnée 65L', 'Grand sac technique avec armature ajustable. Système hydratation compatible.', 2, 110.00, 229.00, 0.5197, 15, 6, 4, 8, 2, 2.3, '2025-02-25', 'B1', 'actif', 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=500'),
('NC-SAC-002', 'Sac à dos urbain 25L', 'Sac compact pour usage quotidien. Compartiment laptop 15 pouces.', 2, 38.00, 89.00, 0.5730, 25, 8, 5, 5, 2, 0.8, '2025-03-08', 'B1', 'actif', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'),
('NC-SAC-003', 'Sac hydratation 2L', 'Système d''hydratation avec poche 2L. Compatible tous sacs.', 2, 15.00, 35.00, 0.5714, 30, 10, 6, 6, 2, 0.3, '2025-03-12', 'B2', 'actif', 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=500'),
('NC-SAC-004', 'Housse imperméable sac', 'Housse de protection pluie pour sacs 40-70L. Ultra-légère.', 2, 8.00, 19.00, 0.5789, 35, 12, 7, 5, 3, 0.15, '2025-03-01', 'B2', 'actif', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'),
('NC-SAC-005', 'Sac bandoulière compact', 'Petit sac bandoulière pour accessoires. Idéal pour excursions.', 2, 22.00, 49.00, 0.5510, 20, 7, 4, 7, 2, 0.4, '2025-02-28', 'B1', 'actif', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500');

-- Produits Vêtements (catégorie 3)
INSERT INTO produits (sku, nom, description, categorie_id, prix_achat, prix_vente, marge_brute, quantite, seuil_reappro, stock_min_securite, delai_livraison, fournisseur_id, poids, date_entree_stock, emplacement_entrepot, statut, image_url) VALUES
('NC-VET-001', 'Veste imperméable technique', 'Veste Gore-Tex 3 couches. Respirante et coupe-vent. Capuchon ajustable.', 3, 195.00, 449.00, 0.5656, 20, 8, 5, 12, 4, 0.6, '2025-02-15', 'C1', 'actif', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'),
('NC-VET-002', 'Pantalon trekking convertible', 'Pantalon convertible en short. Tissu anti-UV et séchage rapide.', 3, 52.00, 119.00, 0.5630, 18, 7, 4, 10, 4, 0.4, '2025-02-22', 'C1', 'actif', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500'),
('NC-VET-003', 'Gants thermiques', 'Gants isolants avec doigts tactiles. Résistants au vent.', 3, 18.00, 42.00, 0.5714, 28, 10, 6, 8, 4, 0.12, '2025-03-05', 'C2', 'actif', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'),
('NC-VET-004', 'Tuque laine mérinos', 'Bonnet en laine mérinos naturelle. Chaud et respirant.', 3, 12.00, 29.00, 0.5862, 32, 12, 7, 7, 3, 0.08, '2025-03-08', 'C2', 'actif', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'),
('NC-VET-005', 'Bas de randonnée lot 3', 'Lot de 3 paires de bas techniques. Anti-ampoules et respirants.', 3, 16.00, 38.00, 0.5789, 40, 15, 8, 6, 3, 0.2, '2025-03-10', 'C2', 'actif', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500');

-- Produits Couchage (catégorie 4)
INSERT INTO produits (sku, nom, description, categorie_id, prix_achat, prix_vente, marge_brute, quantite, seuil_reappro, stock_min_securite, delai_livraison, fournisseur_id, poids, date_entree_stock, emplacement_entrepot, statut, image_url) VALUES
('NC-COU-001', 'Sac de couchage -20°C', 'Sac duvet d''oie 800 fill. Confort extrême jusqu''à -20°C. Ultra-compressible.', 4, 145.00, 329.00, 0.5593, 10, 4, 3, 14, 1, 1.2, '2025-02-12', 'D1', 'actif', 'https://images.unsplash.com/photo-1536304929831-4f8774a0d1d0?w=500'),
('NC-COU-002', 'Matelas gonflable isolant', 'Matelas autogonflant avec isolation thermique. R-Value 4.5.', 4, 68.00, 149.00, 0.5436, 14, 5, 3, 11, 1, 0.8, '2025-02-18', 'D1', 'actif', 'https://images.unsplash.com/photo-1536304929831-4f8774a0d1d0?w=500'),
('NC-COU-003', 'Oreiller camping compressible', 'Oreiller léger et compressible. Housse douce en microfibre.', 4, 12.00, 28.00, 0.5714, 22, 8, 5, 8, 3, 0.15, '2025-03-02', 'D2', 'actif', 'https://images.unsplash.com/photo-1536304929831-4f8774a0d1d0?w=500'),
('NC-COU-004', 'Drap de soie ultra-léger', 'Drap de voyage en soie. Confort et hygiène supplémentaires.', 4, 22.00, 52.00, 0.5769, 16, 6, 4, 9, 3, 0.12, '2025-02-28', 'D2', 'actif', 'https://images.unsplash.com/photo-1536304929831-4f8774a0d1d0?w=500'),
('NC-COU-005', 'Couverture polaire compacte', 'Couverture polaire chaude et légère. Se compresse facilement.', 4, 18.00, 42.00, 0.5714, 18, 7, 4, 7, 3, 0.45, '2025-03-05', 'D1', 'actif', 'https://images.unsplash.com/photo-1536304929831-4f8774a0d1d0?w=500');

-- Produits Cuisine (catégorie 5)
INSERT INTO produits (sku, nom, description, categorie_id, prix_achat, prix_vente, marge_brute, quantite, seuil_reappro, stock_min_securite, delai_livraison, fournisseur_id, poids, date_entree_stock, emplacement_entrepot, statut, image_url) VALUES
('NC-CUI-001', 'Réchaud camping portable gaz', 'Réchaud compact au gaz. Allumage piezo intégré. Puissant 3000W.', 5, 35.00, 79.00, 0.5570, 18, 6, 4, 9, 2, 0.35, '2025-02-20', 'E1', 'actif', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500'),
('NC-CUI-002', 'Set ustensiles camping titane', 'Ensemble complet en titane: casserole, poêle, assiette, tasse.', 5, 42.00, 95.00, 0.5579, 12, 5, 3, 10, 2, 0.28, '2025-02-25', 'E1', 'actif', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500'),
('NC-CUI-003', 'Bouteille filtrante 650ml', 'Gourde avec système de filtration intégré. Élimine 99.9% bactéries.', 5, 28.00, 65.00, 0.5692, 20, 7, 4, 8, 2, 0.18, '2025-03-01', 'E2', 'actif', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500'),
('NC-CUI-004', 'Glacière souple 12L', 'Sac isotherme pliable. Garde le froid 24h.', 5, 22.00, 49.00, 0.5510, 15, 6, 4, 7, 3, 0.3, '2025-03-08', 'E2', 'actif', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500'),
('NC-CUI-005', 'Multi-outil camping 15 fonctions', 'Couteau suisse avec 15 outils. Acier inoxydable de qualité.', 5, 18.00, 42.00, 0.5714, 25, 9, 5, 6, 3, 0.12, '2025-03-10', 'E1', 'actif', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500');

-- Produits Électronique & navigation (catégorie 8)
INSERT INTO produits (sku, nom, description, categorie_id, prix_achat, prix_vente, marge_brute, quantite, seuil_reappro, stock_min_securite, delai_livraison, fournisseur_id, poids, date_entree_stock, emplacement_entrepot, statut, image_url) VALUES
('NC-ELE-001', 'Montre GPS plein air', 'Montre GPS avec cartographie intégrée. Altimètre, baromètre et boussole. Étanche 100m.', 8, 185.00, 399.00, 0.5363, 8, 3, 2, 15, 4, 0.08, '2025-02-10', 'F1', 'actif', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'),
('NC-ELE-002', 'Chargeur solaire 20W', 'Panneau solaire portable pliable 20W. Charge smartphones et powerbanks. USB-A et USB-C.', 8, 48.00, 109.00, 0.5596, 12, 4, 3, 12, 4, 0.65, '2025-02-15', 'F1', 'actif', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500'),
('NC-ELE-003', 'Boussole de précision', 'Boussole professionnelle avec visée. Graduation 360°. Liquide anti-bulle.', 8, 22.00, 52.00, 0.5769, 15, 5, 3, 8, 3, 0.12, '2025-03-01', 'F2', 'actif', 'https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=500'),
('NC-ELE-004', 'Radio météo portable', 'Radio AM/FM/météo avec alerte automatique. Manivelle et solaire. Lampe intégrée.', 8, 32.00, 75.00, 0.5733, 10, 4, 2, 11, 4, 0.25, '2025-02-22', 'F2', 'actif', 'https://images.unsplash.com/photo-1593359863503-f598f4a74f5d?w=500'),
('NC-ELE-005', 'Lampe USB rechargeable', 'Lampe LED ultra-puissante 500 lumens. Rechargeable USB-C. Autonomie 10h.', 8, 28.00, 65.00, 0.5692, 18, 6, 4, 9, 4, 0.15, '2025-03-05', 'F1', 'actif', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500');

-- ============================================================================
-- VUES UTILES POUR L'API
-- ============================================================================

-- Vue produits avec alertes de réapprovisionnement
CREATE VIEW v_produits_alertes AS
SELECT 
    p.*,
    c.nom as categorie_nom,
    f.nom as fournisseur_nom,
    CASE 
        WHEN p.quantite <= p.seuil_reappro THEN 'reappro_urgent'
        WHEN p.quantite <= p.stock_min_securite THEN 'stock_critique'
        ELSE 'ok'
    END as niveau_alerte
FROM produits p
LEFT JOIN categories c ON p.categorie_id = c.categorie_id
LEFT JOIN fournisseurs f ON p.fournisseur_id = f.fournisseur_id;

-- Vue résumé des ventes
CREATE VIEW v_ventes_resumees AS
SELECT 
    v.vente_id,
    v.date_vente,
    v.total,
    v.statut,
    u.nom as client_nom,
    u.prenom as client_prenom,
    u.email as client_email,
    COUNT(lv.ligne_vente_id) as nb_articles,
    f.statut as statut_facture
FROM ventes v
JOIN clients c ON v.client_id = c.client_id
JOIN utilisateurs u ON c.utilisateur_id = u.utilisateur_id
LEFT JOIN lignes_vente lv ON v.vente_id = lv.vente_id
LEFT JOIN factures f ON v.vente_id = f.vente_id
GROUP BY v.vente_id;

-- Vue statistiques dashboard
CREATE VIEW v_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM ventes WHERE DATE(date_vente) = CURDATE()) as ventes_aujourdhui,
    (SELECT COALESCE(SUM(total), 0) FROM ventes WHERE DATE(date_vente) = CURDATE()) as revenus_aujourdhui,
    (SELECT COUNT(*) FROM ventes WHERE MONTH(date_vente) = MONTH(CURDATE())) as ventes_mois,
    (SELECT COALESCE(SUM(total), 0) FROM ventes WHERE MONTH(date_vente) = MONTH(CURDATE())) as revenus_mois,
    (SELECT COUNT(*) FROM produits WHERE quantite <= seuil_reappro) as produits_alerte,
    (SELECT COUNT(*) FROM utilisateurs WHERE role = 'client' AND statut = 'actif') as clients_actifs,
    (SELECT COALESCE(AVG(note), 0) FROM evaluations) as satisfaction_moyenne;

-- ============================================================================
-- TRIGGERS POUR AUTOMATISATION
-- ============================================================================

-- Trigger: Mise à jour automatique du stock après une vente
DELIMITER //
CREATE TRIGGER after_ligne_vente_insert
AFTER INSERT ON lignes_vente
FOR EACH ROW
BEGIN
    -- Mettre à jour le stock du produit
    UPDATE produits 
    SET quantite = quantite - NEW.quantite
    WHERE produit_id = NEW.produit_id;
    
    -- Enregistrer le mouvement de stock
    INSERT INTO mouvements (produit_id, type_mouvement, quantite, reference)
    VALUES (NEW.produit_id, 'sortie', NEW.quantite, CONCAT('VENTE-', NEW.vente_id));
END//
DELIMITER ;

-- Trigger: Message de bienvenue lors de la première commande
DELIMITER //
CREATE TRIGGER after_first_order
AFTER INSERT ON ventes
FOR EACH ROW
BEGIN
    DECLARE first_order INT;
    
    -- Vérifier si c'est la première commande
    SELECT COUNT(*) INTO first_order
    FROM ventes
    WHERE client_id = NEW.client_id;
    
    -- Si c'est la première commande, ajouter une interaction
    IF first_order = 1 THEN
        INSERT INTO interactions (client_id, type_interaction, description)
        VALUES (NEW.client_id, 'email', 'Message de bienvenue automatique envoyé');
        
        -- Mettre à jour la date de première commande
        UPDATE clients 
        SET date_premiere_commande = NEW.date_vente
        WHERE client_id = NEW.client_id;
    END IF;
END//
DELIMITER ;

-- Trigger: Calculer automatiquement le sous-total d'une ligne de vente
DELIMITER //
CREATE TRIGGER before_ligne_vente_insert
BEFORE INSERT ON lignes_vente
FOR EACH ROW
BEGIN
    SET NEW.sous_total = NEW.prix_unitaire * NEW.quantite;
END//
DELIMITER ;

-- Trigger: Mettre à jour le stock après réception d'un achat
DELIMITER //
CREATE TRIGGER after_achat_reception
AFTER UPDATE ON achats
FOR EACH ROW
BEGIN
    IF NEW.statut = 'recu' AND OLD.statut != 'recu' THEN
        -- Mettre à jour le stock pour chaque ligne d'achat
        UPDATE produits p
        INNER JOIN lignes_achat la ON p.produit_id = la.produit_id
        SET p.quantite = p.quantite + la.quantite
        WHERE la.achat_id = NEW.achat_id;
        
        -- Enregistrer les mouvements
        INSERT INTO mouvements (produit_id, type_mouvement, quantite, reference)
        SELECT produit_id, 'entree', quantite, CONCAT('ACHAT-', NEW.achat_id)
        FROM lignes_achat
        WHERE achat_id = NEW.achat_id;
    END IF;
END//
DELIMITER ;

-- ============================================================================
-- PROCÉDURES STOCKÉES UTILES
-- ============================================================================

-- Procédure: Créer une vente complète
DELIMITER //
CREATE PROCEDURE sp_creer_vente(
    IN p_client_id INT,
    IN p_produits JSON
)
BEGIN
    DECLARE v_vente_id INT;
    DECLARE v_sous_total DECIMAL(10,2) DEFAULT 0;
    DECLARE v_tps DECIMAL(10,2);
    DECLARE v_tvq DECIMAL(10,2);
    DECLARE v_total DECIMAL(10,2);
    DECLARE v_taux_tps DECIMAL(6,4);
    DECLARE v_taux_tvq DECIMAL(6,4);
    
    -- Récupérer les taux de taxes
    SELECT taux INTO v_taux_tps FROM parametres_fiscaux WHERE nom = 'TPS' AND actif = TRUE LIMIT 1;
    SELECT taux INTO v_taux_tvq FROM parametres_fiscaux WHERE nom = 'TVQ' AND actif = TRUE LIMIT 1;
    
    -- Calculer le sous-total (à faire avec les données JSON)
    -- Note: Ceci est une version simplifiée, l'implémentation complète nécessite de parser le JSON
    
    SET v_tps = v_sous_total * v_taux_tps;
    SET v_tvq = v_sous_total * v_taux_tvq;
    SET v_total = v_sous_total + v_tps + v_tvq;
    
    -- Créer la vente
    INSERT INTO ventes (client_id, sous_total, tps, tvq, total)
    VALUES (p_client_id, v_sous_total, v_tps, v_tvq, v_total);
    
    SET v_vente_id = LAST_INSERT_ID();
    
    -- Retourner l'ID de la vente créée
    SELECT v_vente_id as vente_id;
END//
DELIMITER ;

-- Procédure: Obtenir les produits nécessitant réapprovisionnement
DELIMITER //
CREATE PROCEDURE sp_produits_a_reapprovisionner()
BEGIN
    SELECT 
        p.produit_id,
        p.sku,
        p.nom,
        p.quantite,
        p.seuil_reappro,
        p.stock_min_securite,
        (p.seuil_reappro - p.quantite + p.stock_min_securite) as quantite_recommandee,
        f.nom as fournisseur,
        f.email as fournisseur_email,
        p.delai_livraison
    FROM produits p
    LEFT JOIN fournisseurs f ON p.fournisseur_id = f.fournisseur_id
    WHERE p.quantite <= p.seuil_reappro
    AND p.statut = 'actif'
    ORDER BY (p.quantite / p.seuil_reappro) ASC;
END//
DELIMITER ;

-- ============================================================================
-- INDEX POUR OPTIMISATION DES PERFORMANCES
-- ============================================================================

CREATE INDEX idx_produits_statut ON produits(statut);
CREATE INDEX idx_produits_categorie ON produits(categorie_id);
CREATE INDEX idx_produits_sku ON produits(sku);
CREATE INDEX idx_ventes_date ON ventes(date_vente);
CREATE INDEX idx_ventes_statut ON ventes(statut);
CREATE INDEX idx_ventes_client ON ventes(client_id);
CREATE INDEX idx_utilisateurs_email ON utilisateurs(email);
CREATE INDEX idx_utilisateurs_role ON utilisateurs(role);
CREATE INDEX idx_interactions_client ON interactions(client_id);
CREATE INDEX idx_interactions_date ON interactions(timestamp);

-- ============================================================================
-- DONNÉES DE TEST SUPPLÉMENTAIRES
-- ============================================================================

-- Insertion d'une vente de test
INSERT INTO ventes (client_id, date_vente, sous_total, tps, tvq, total, statut) VALUES
(1, NOW(), 549.99, 27.50, 54.86, 632.35, 'paye');

SET @last_vente_id = LAST_INSERT_ID();

-- Lignes de la vente de test
INSERT INTO lignes_vente (vente_id, produit_id, quantite, prix_unitaire, sous_total) VALUES
(@last_vente_id, 1, 1, 299.00, 299.00),
(@last_vente_id, 11, 1, 229.00, 229.00);

-- Facture pour la vente de test
INSERT INTO factures (vente_id, numero_facture, date_facture, total, statut) VALUES
(@last_vente_id, CONCAT('FAC-', YEAR(NOW()), '-', LPAD(@last_vente_id, 6, '0')), CURDATE(), 632.35, 'payee');

-- Paiement pour la facture
INSERT INTO paiements (facture_id, montant, mode_paiement) VALUES
(LAST_INSERT_ID(), 632.35, 'carte');

-- Évaluation pour la vente
INSERT INTO evaluations (vente_id, client_id, note, commentaire) VALUES
(@last_vente_id, 1, 5, 'Excellente qualité de produits et livraison rapide!');

-- Interactions clients de test
INSERT INTO interactions (client_id, type_interaction, description, ajoute_par) VALUES
(1, 'visite', 'Première visite sur le site', NULL),
(1, 'vue_page', 'Page consultée: Tentes & abris', NULL),
(1, 'commande', CONCAT('Commande #', @last_vente_id, ' - 632.35$'), NULL),
(1, 'email', 'Email de bienvenue envoyé automatiquement', 2);

-- ============================================================================
-- INFORMATIONS DE CONNEXION ET VÉRIFICATION
-- ============================================================================

-- Afficher un résumé de la base de données
SELECT 'BASE DE DONNÉES CRÉÉE AVEC SUCCÈS!' as message;
SELECT 
    (SELECT COUNT(*) FROM categories) as nb_categories,
    (SELECT COUNT(*) FROM fournisseurs) as nb_fournisseurs,
    (SELECT COUNT(*) FROM produits) as nb_produits,
    (SELECT COUNT(*) FROM utilisateurs) as nb_utilisateurs,
    (SELECT COUNT(*) FROM ventes) as nb_ventes;

-- Afficher les produits nécessitant réapprovisionnement
SELECT 'PRODUITS À RÉAPPROVISIONNER:' as info;
CALL sp_produits_a_reapprovisionner();

-- ============================================================================
-- FIN DU SCRIPT
-- ============================================================================