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

async function showCreateForm(req, res) {

    try {

        const entreprises =
            await offreRepository.getAllEntreprises();

        const technologies =
            await offreRepository.getAllTechnologies();

        res.render("admin/create", {
            entreprises: entreprises,
            technologies: technologies
        });

    } catch (error) {

        console.error("Erreur :", error.message);

        res.status(500).send(
            "Erreur lors du chargement du formulaire."
        );
    }
}


async function createOffre(req, res) {
    try {
        const {
            titre,
            entreprise_id,
            ville,
            type_contrat,
            description_courte,
            description_longue,
            profil_recherche,
            date_publication,
            lien_candidature
        } = req.body;

        let technologies = req.body.technologies;

        if (!titre || !entreprise_id || !ville || !type_contrat || !description_longue || !date_publication) {
            return res.status(400).send("Veuillez remplir tous les champs obligatoires.");
        }

        if (type_contrat !== "Stage" && type_contrat !== "Alternance") {
            return res.status(400).send("Type de contrat invalide.");
        }

        if (!technologies) {
            technologies = [];
        } else if (!Array.isArray(technologies)) {
            technologies = [technologies];
        }

        const dateMysql = date_publication.replace("T", " ") + ":00";

        const offreId = await offreRepository.createOffre({
            entreprise_id,
            titre,
            description_courte,
            description_longue,
            profil_recherche,
            type_contrat,
            ville,
            date_publication: dateMysql,
            lien_candidature
        });

        await offreRepository.addTechnologies(
            offreId,
            technologies
        );

        res.redirect("/admin/offres");

    } catch (error) {
        console.error("Erreur :", error.message);
        res.status(500).send(
            "Erreur lors de la création de l'offre."
        );
    }
}


module.exports = {
    getAllOffres,
     showCreateForm,
     createOffre
};