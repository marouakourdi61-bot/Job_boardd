function afficherOffres(offres) {
    const container = document.querySelector("#offres-container");
    const resultCount = document.querySelector("#result-count");

    container.innerHTML = "";

    // Nombre d'offres
    resultCount.textContent = `${offres.length} offres trouvées`;

    offres.forEach((offre) => {
        const carte = document.createElement("article");

        carte.classList.add("offer-card");

        // Badge selon le type de contrat
        const badgeClass =
            offre.typeContrat.toLowerCase() === "stage"
                ? "badge-stage"
                : "badge-alternance";

        carte.innerHTML = `
            <div class="offer-header">
                <div>
                    <span class="${badgeClass}">
                        ${offre.typeContrat}
                    </span>

                    <span class="date">
                        ${offre.datePublication}
                    </span>
                </div>

                <span class="star">☆</span>
            </div>

            <h2 class="offer-title">
                ${offre.titre}
            </h2>

            <p class="company-info">
                ${offre.entreprise} - ${offre.ville}
            </p>

            <p class="description">
                ${offre.descriptionCourte}
            </p>

            <div class="tags">
                ${offre.technologies
                .map((technologie) => `
                        <span class="tag">${technologie}</span>
                    `)
                .join("")}
            </div>

           <button class="btn-voir" onclick="window.location.href='./pages/offre-detail.html?id=${offre.id}'">
            Voir
           </button>
        `;

        container.appendChild(carte);
    });
}