CREATE DATABASE IF NOT EXISTS job_board;

USE job_board;

CREATE TABLE entreprise (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    description TEXT
);
--@block
CREATE TABLE offre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entreprise_id INT NOT NULL,
    titre VARCHAR(200) NOT NULL,
    description_courte VARCHAR(255),
    description_longue TEXT NOT NULL,
    profil_recherche TEXT,
    type_contrat VARCHAR(50) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    date_publication DATETIME NOT NULL,
    lien_candidature VARCHAR(500),

    FOREIGN KEY (entreprise_id)
        REFERENCES entreprise(id)
);
--@block
CREATE TABLE technologie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE
);
--@block
CREATE TABLE offre_technologie (
    offre_id INT NOT NULL,
    technologie_id INT NOT NULL,

    PRIMARY KEY (offre_id, technologie_id),

    FOREIGN KEY (offre_id)
        REFERENCES offre(id)
        ON DELETE CASCADE,

    FOREIGN KEY (technologie_id)
        REFERENCES technologie(id)
        ON DELETE CASCADE
);