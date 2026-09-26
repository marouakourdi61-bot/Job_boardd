const express = require("express");
require("dotenv").config();

const offreRepository = require("./repositories/offreRepository");

const app = express();

const PORT = process.env.PORT || 3000;

// EJS
app.set("view engine", "ejs");
app.set("views", "./views");

//  les offres
app.get("/offres", async (req, res) => {
    try {

        const search = req.query.search || "";

        console.log("Mot-clé :", search);

        const offres = await offreRepository.getAllOffres(search);

        res.render("offres/index", {
            offres: offres,
            search: search
        });
    } catch (error) {
        console.error("Erreur :", error.message);
        res.status(500).send("Erreur lors de la récupération des offres.");
    }
});





//  detail
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

// console.log("server");

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

