let offresSuivies = [];

function chargerOffresSuivies() {

    const offresSauvegardees =
        localStorage.getItem("offresSuivies");

    if (offresSauvegardees) {
        offresSuivies = JSON.parse(offresSauvegardees);
    }
}

function sauvegarderOffresSuivies() {
    
}