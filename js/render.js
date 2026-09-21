function afficherOffres(offres) {
    const container = document.querySelector("#offres-container");
    const resultCount = document.querySelector("#result-count");

    container.innerHTML = "";

    // Nombre d'offres
    resultCount.textContent = `${offres.length} offres trouvées`;

    offres.forEach((offre) => {


        const carte = document.createElement("article");
        carte.classList.add("offer-card");



        const offerHeader = document.createElement("div");
        offerHeader.classList.add("offer-header");



        const headerInfo = document.createElement("div");



        const badge = document.createElement("span");

        const badgeClass =
            offre.typeContrat.toLowerCase() === "stage"
                ? "badge-stage"
                : "badge-alternance";

        badge.classList.add(badgeClass);
        badge.textContent = offre.typeContrat;



        const date = document.createElement("span");
        date.classList.add("date");
        date.textContent = offre.datePublication;



        headerInfo.appendChild(badge);
        headerInfo.appendChild(date);



        const star = document.createElement("span");
        star.classList.add("star");
        star.textContent = "☆";
        star.dataset.id = offre.id;



        offerHeader.appendChild(headerInfo);
        offerHeader.appendChild(star);



        const titre = document.createElement("h2");
        titre.classList.add("offer-title");
        titre.textContent = offre.titre;



        const entreprise = document.createElement("p");
        entreprise.classList.add("company-info");
        entreprise.textContent =
            `${offre.entreprise} - ${offre.ville}`;



        const description = document.createElement("p");
        description.classList.add("description");
        description.textContent = offre.descriptionCourte;



        const tags = document.createElement("div");
        tags.classList.add("tags");



        offre.technologies.forEach((technologie) => {

            const tag = document.createElement("span");

            tag.classList.add("tag");

            tag.textContent = technologie;

            tags.appendChild(tag);
        });



        const boutonVoir = document.createElement("button");

        boutonVoir.classList.add("btn-voir");
        boutonVoir.textContent = "Voir";

        boutonVoir.addEventListener("click", () => {
            window.location.href =
                `${window.location.pathname.includes("/pages/") ? "./offre-detail.html" : "./pages/offre-detail.html"}?id=${offre.id}`;
        });



        carte.appendChild(offerHeader);
        carte.appendChild(titre);
        carte.appendChild(entreprise);
        carte.appendChild(description);
        carte.appendChild(tags);
        carte.appendChild(boutonVoir);



        container.appendChild(carte);
    });
}