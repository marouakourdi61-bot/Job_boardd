async function init() {
    const offres = await chargerOffres();

    afficherOffres(offres);
}

init();