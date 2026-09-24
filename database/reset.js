const mysql = require("mysql2/promise");
require("dotenv").config();

async function resetDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "job_board"
    });

    try {
        console.log("Connexion à MySQL réussie.");

        await connection.execute("SET FOREIGN_KEY_CHECKS = 0");

        await connection.execute("DROP TABLE IF EXISTS offre_technologie");
        await connection.execute("DROP TABLE IF EXISTS offre");
        await connection.execute("DROP TABLE IF EXISTS technologie");
        await connection.execute("DROP TABLE IF EXISTS entreprise");

        await connection.execute("SET FOREIGN_KEY_CHECKS = 1");

        console.log("Anciennes tables supprimées.");

        await connection.execute(`
            CREATE TABLE entreprise (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nom VARCHAR(150) NOT NULL,
                ville VARCHAR(100) NOT NULL,
                description TEXT
            )
        `);

        await connection.execute(`
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
            )
        `);

        await connection.execute(`
            CREATE TABLE technologie (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nom VARCHAR(100) NOT NULL UNIQUE
            )
        `);

        await connection.execute(`
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
            )
        `);

        console.log("Tables recréées.");

    } catch (error) {
        console.error("Erreur pendant le reset :", error);
    } finally {
        await connection.end();
        console.log("Connexion MySQL fermée.");
    }
}

resetDatabase();