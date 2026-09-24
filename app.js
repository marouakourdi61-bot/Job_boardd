const express = require("express");
require("dotenv").config();

const offreRepository = require("./repositories/offreRepository");

const app = express();

const PORT = process.env.PORT || 3000;

// Configur EJS
app.set("view engine", "ejs");
app.set("views", "./views");

//  afficher les offres
app.get("/offres", async (req, res) => {
    try {
        const offres = await offreRepository.getAllOffres();

        res.render("offres/index", {
            offres: offres
        });
    } catch (error) {
        console.error("Erreur :", error.message);
        res.status(500).send("Erreur lors de la récupération des offres.");
    }
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});



// aficher detail
app.get("/offres/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const offre = await offreRepository.getOffreById(id);

        if (!offre) {
            return res.status(404).send("Offre introuvable.");
        }

        res.render("offres/detail", {
            offre: offre
        });
    } catch (error) {
        console.error("Erreur :", error.message);
        res.status(500).send("Erreur lors de la récupération de l'offre.");
    }
});