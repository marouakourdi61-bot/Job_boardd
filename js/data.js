

async function chargerOffres() {
    const response = await fetch("data/offres.json");

    const offres = await response.json();

    return offres;
}