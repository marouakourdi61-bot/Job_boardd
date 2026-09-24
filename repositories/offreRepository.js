const db = require("../config/database");

async function getAllOffres() {
    const [rows] = await db.execute(`
        SELECT
            offre.*,
            entreprise.nom AS entreprise_nom,
            entreprise.description AS entreprise_description,
            entreprise.ville AS entreprise_ville
        FROM offre
        JOIN entreprise
            ON offre.entreprise_id = entreprise.id
        ORDER BY date_publication DESC
    `);

    for (const offre of rows) {
        const [technologies] = await db.execute(
            `
            SELECT technologie.nom
            FROM technologie
            JOIN offre_technologie
                ON technologie.id = offre_technologie.technologie_id
            WHERE offre_technologie.offre_id = ?
            `,
            [offre.id]
        );

        offre.technologies = technologies;
    }

    return rows;
}

async function getOffreById(id) {
    const [rows] = await db.execute(
        `
        SELECT
            offre.*,
            entreprise.nom AS entreprise_nom,
            entreprise.description AS entreprise_description,
            entreprise.ville AS entreprise_ville
        FROM offre
        JOIN entreprise
            ON offre.entreprise_id = entreprise.id
        WHERE offre.id = ?
        `,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    const offre = rows[0];

    const [technologies] = await db.execute(
        `
        SELECT technologie.nom
        FROM technologie
        JOIN offre_technologie
            ON technologie.id = offre_technologie.technologie_id
        WHERE offre_technologie.offre_id = ?
        `,
        [id]
    );

    offre.technologies = technologies;

    return offre;
}

module.exports = {
    getAllOffres,
    getOffreById
};