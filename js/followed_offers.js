async function afficher_Offres_Suivies()
{
    const response = await fetch("../data/offres.json");
    const offres = await response.json();

    const suivies = getFollowed_Offers();

    const result = offres.filter((offre) =>
        suivies.includes(offre.id)
    );

    afficherOffres(result);
    initFollowed_Offers();
}

afficher_Offres_Suivies();