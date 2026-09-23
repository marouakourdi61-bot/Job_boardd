const mysql = require("mysql2/promise");
require("dotenv").config();

async function seed() {
    
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "job_board"
    });

    console.log("Connexion à MySQL réussie.");

    try {
        await connection.execute("SET FOREIGN_KEY_CHECKS = 0");

        await connection.execute("TRUNCATE TABLE offre_technologie");
        await connection.execute("TRUNCATE TABLE offre");
        await connection.execute("TRUNCATE TABLE technologie");
        await connection.execute("TRUNCATE TABLE entreprise");

        await connection.execute("SET FOREIGN_KEY_CHECKS = 1");
        

        console.log("Anciennes données supprimées.");

        
        const entreprises = [
            ["TechCorp", "Casablanca", "Entreprise spécialisée dans le développement web."],
            ["WebSolutions", "Rabat", "Agence spécialisée dans les solutions digitales."],
            ["Digital Maroc", "Marrakech", "Entreprise spécialisée dans la transformation digitale."],
            ["StartUp Lab", "Fès", "Startup développant des applications web modernes."],
            ["InnovTech", "Tanger", "Entreprise spécialisée dans les technologies innovantes."]
        ];

        for (const entreprise of entreprises) {
            await connection.execute(
                `INSERT INTO entreprise (nom, ville, description)
                 VALUES (?, ?, ?)`,
                entreprise
            );
        }

        console.log("5 entreprises ajoutées.");

        
        const technologies = [
            ["JavaScript"],
            ["React"],
            ["Node.js"],
            ["Express"],
            ["PHP"],
            ["Laravel"],
            ["MySQL"],
            ["Docker"]
        ];

        for (const technologie of technologies) {
            await connection.execute(
                `INSERT INTO technologie (nom)
                 VALUES (?)`,
                technologie
            );
        }

        console.log("8 technologies ajoutées.");

        
        const offres = [
            [
                1,
                "Développeur React Junior",
                "Développeur React pour une équipe web.",
                "Nous recherchons un développeur React junior pour participer au développement de nos applications web.",
                "Formation en développement web et connaissances en JavaScript et React.",
                "Stage",
                "Casablanca",
                "2026-09-01 09:00:00",
                "https://example.com/candidature"
            ],
            [
                1,
                "Développeur Laravel Junior",
                "Développeur Laravel pour rejoindre notre équipe.",
                "Vous participerez au développement et à la maintenance de nos applications Laravel.",
                "Connaissances en PHP, Laravel et MySQL.",
                "Stage",
                "Casablanca",
                "2026-09-02 10:00:00",
                "https://example.com/candidature"
            ],
            [
                2,
                "Développeur Full Stack",
                "Développeur Full Stack JavaScript.",
                "Nous recherchons un développeur Full Stack pour travailler sur des applications web.",
                "JavaScript, Node.js, Express et React.",
                "Alternance",
                "Rabat",
                "2026-09-03 09:30:00",
                "https://example.com/candidature"
            ],
            [
                2,
                "Développeur Node.js",
                "Développeur backend Node.js.",
                "Participation au développement des API et services backend.",
                "JavaScript, Node.js et Express.",
                "Stage",
                "Rabat",
                "2026-09-04 11:00:00",
                "https://example.com/candidature"
            ],
            [
                3,
                "Développeur Web",
                "Développeur web junior.",
                "Participation à la création de sites et applications web.",
                "HTML, CSS, JavaScript et MySQL.",
                "Stage",
                "Marrakech",
                "2026-09-05 09:00:00",
                "https://example.com/candidature"
            ],
            [
                3,
                "Développeur PHP Laravel",
                "Développeur PHP/Laravel.",
                "Développement de nouvelles fonctionnalités avec Laravel.",
                "PHP, Laravel et MySQL.",
                "CDI",
                "Marrakech",
                "2026-09-06 14:00:00",
                "https://example.com/candidature"
            ],
            [
                4,
                "Frontend Developer React",
                "Développeur frontend React.",
                "Création d'interfaces modernes et responsives avec React.",
                "JavaScript, React et CSS.",
                "Stage",
                "Fès",
                "2026-09-07 10:00:00",
                "https://example.com/candidature"
            ],
            [
                4,
                "Backend Developer Node.js",
                "Développeur backend.",
                "Développement de services backend avec Node.js et Express.",
                "Node.js, Express et MySQL.",
                "Alternance",
                "Fès",
                "2026-09-08 09:30:00",
                "https://example.com/candidature"
            ],
            [
                5,
                "Développeur Full Stack Junior",
                "Développeur Full Stack junior.",
                "Participation au développement complet des applications web.",
                "React, Node.js, Express et MySQL.",
                "Stage",
                "Tanger",
                "2026-09-09 10:30:00",
                "https://example.com/candidature"
            ],
            [
                5,
                "Développeur Laravel",
                "Développeur Laravel confirmé.",
                "Développement et amélioration d'applications web avec Laravel.",
                "PHP, Laravel et MySQL.",
                "CDI",
                "Tanger",
                "2026-09-10 11:00:00",
                "https://example.com/candidature"
            ],
            [
                1,
                "DevOps Junior",
                "Développeur intéressé par le DevOps.",
                "Participation à la mise en place des environnements de développement.",
                "Docker, Node.js et MySQL.",
                "Stage",
                "Casablanca",
                "2026-09-11 09:00:00",
                "https://example.com/candidature"
            ],
            [
                2,
                "Développeur JavaScript",
                "Développeur JavaScript junior.",
                "Développement de fonctionnalités frontend et backend en JavaScript.",
                "JavaScript, React et Node.js.",
                "Stage",
                "Rabat",
                "2026-09-12 13:00:00",
                "https://example.com/candidature"
            ]
        ];

        for (const offre of offres) {
            await connection.execute(
                `INSERT INTO offre
                (
                    entreprise_id,
                    titre,
                    description_courte,
                    description_longue,
                    profil_recherche,
                    type_contrat,
                    ville,
                    date_publication,
                    lien_candidature
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                offre
            );
        }

        console.log("12 offres ajoutées.");

        
        const associations = [
            [1, 2], 
            [1, 1], 

            [2, 6], 
            [2, 5], 
            [2, 7], 

            [3, 2], 
            [3, 3], 
            [3, 4], 

            [4, 3], 
            [4, 4], 

            [5, 1], 
            [5, 7], 

            [6, 5], 
            [6, 6], 
            [6, 7], 

            [7, 1], 
            [7, 2], 

            [8, 3], 
            [8, 4], 
            [8, 7], 

            [9, 1], 
            [9, 2], 
            [9, 3], 
            [9, 7], 

            [10, 5], 
            [10, 6], 
            [10, 7], 

            [11, 8],
            [11, 3], 
            [11, 7], 

            [12, 1], 
            [12, 2], 
            [12, 3] 
        ];

        for (const association of associations) {
            await connection.execute(
                `INSERT INTO offre_technologie
                (offre_id, technologie_id)
                VALUES (?, ?)`,
                association
            );
        }

        console.log("Associations offre/technologie ajoutées.");

        console.log("Seed terminé avec succès !");
    } catch (error) {
        console.error("Erreur pendant le seed :", error);
    } finally {
        await connection.end();
        console.log("Connexion MySQL fermée.");
    }
}

seed();