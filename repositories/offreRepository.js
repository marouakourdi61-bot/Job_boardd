const db = require("../config/database");

async function getAllOffres(search = "", ville = "", typeContrat = "", technologie = "", sort = "desc") {

    let sql = `
        SELECT
            offre.*,
            entreprise.nom AS entreprise_nom,
            entreprise.description AS entreprise_description,
            entreprise.ville AS entreprise_ville
        FROM offre
        JOIN entreprise
            ON offre.entreprise_id = entreprise.id
    `;

    const params = [];
    const conditions = [];

    if (search) {
        conditions.push(`
        (
            offre.titre LIKE ?
            OR entreprise.nom LIKE ?
            OR offre.description_courte LIKE ?
            OR offre.description_longue LIKE ?
        )
    `);

        const keyword = `%${search}%`;

        params.push(
            keyword,
            keyword,
            keyword,
            keyword
        );
    }

    if (ville) {
        conditions.push("offre.ville = ?");
        params.push(ville);
    }

    if (typeContrat) {
        conditions.push("offre.type_contrat = ?");
        params.push(typeContrat);
    }

    if (technologie) {
        conditions.push(`
        EXISTS (
            SELECT 1
            FROM offre_technologie
            JOIN technologie
                ON technologie.id = offre_technologie.technologie_id
            WHERE offre_technologie.offre_id = offre.id
            AND technologie.nom = ?
        )
    `);

        params.push(technologie);
    }

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    const order = sort === "asc" ? "ASC" : "DESC";

    sql += `
    ORDER BY offre.date_publication ${order}
`;

    const [rows] = await db.execute(sql, params);

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



async function getAllVilles() {
    const [rows] = await db.execute(`
        SELECT DISTINCT ville
        FROM offre
        ORDER BY ville ASC
    `);

    return rows;
}



async function getAllTechnologies() {
    const [rows] = await db.execute(`
        SELECT id, nom
        FROM technologie
        ORDER BY nom ASC
    `);

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
    getOffreById,
    getAllVilles,
    getAllTechnologies
};