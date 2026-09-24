const db = require("../config/database");

async function getAllOffres() {
    const [rows] = await db.execute(`
        SELECT *
        FROM offre
        ORDER BY date_publication DESC
    `);

    return rows;
}

async function getOffreById(id) {
    const [rows] = await db.execute(
        `
        SELECT *
        FROM offre
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
}

module.exports = {
    getAllOffres,
    getOffreById
};