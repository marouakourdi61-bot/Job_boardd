const offreRepository = require("../repositories/offreRepository");

async function getAllOffres(req, res) {
    try {

        const offres = await offreRepository.getAllOffres();

        res.render("admin/index", {
            offres: offres
        });

    } catch (error) {

        console.error("Erreur :", error.message);

        res.status(500).send(
            "Erreur lors de la récupération des offres."
        );
    }
}

module.exports = {
    getAllOffres
};