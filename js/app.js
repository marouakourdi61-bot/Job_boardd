async function init() {

    const offres = await chargerOffres();

    const boutonDate = document.querySelector(".btn-date");

    boutonDate.addEventListener("click", () => {

        trierParDate(offres);

        afficherOffres(offres);

        if (ordreDate === "ancien") {
            ordreDate = "recent";
            boutonDate.textContent = "Date ↓";
        } else {
            ordreDate = "ancien";
            boutonDate.textContent = "Date ↑";
        }
    });

    afficherOffres(offres);
}

init();