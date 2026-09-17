async function chargerDetailOffre() {

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    const response = await fetch("../data/offres.json");

    const offres = await response.json();

    const offre = offres.find((offre) => offre.id === id);

    if (!offre) {
        document.querySelector(".detail-card").innerHTML = `
            <p>Offre introuvable.</p>
        `;

        return;
    }

    afficherDetailOffre(offre);
}


function afficherDetailOffre(offre) {

    document.querySelector("#offer-title").textContent = offre.titre;

    document.querySelector("#offer-company").textContent =
        `${offre.entreprise} - ${offre.ville}`;

    document.querySelector("#offer-type").textContent =
        offre.typeContrat;

    document.querySelector("#offer-date").textContent =
        offre.datePublication;

    document.querySelector("#offer-description").textContent =
        offre.descriptionLongue;

    document.querySelector("#offer-profile").textContent =
        offre.profilRecherche;


    const technologiesContainer =
        document.querySelector("#offer-technologies");

    technologiesContainer.innerHTML = "";

    offre.technologies.forEach((technologie) => {

        const tag = document.createElement("span");

        tag.classList.add("tag");

        tag.textContent = technologie;

        technologiesContainer.appendChild(tag);
    });


    const applicationContainer =
        document.querySelector("#offer-application");


    if (offre.emailContact) {

        applicationContainer.innerHTML = `
            <a
                href="mailto:${offre.emailContact}"
                class="email-link"
            >
                ${offre.emailContact}
            </a>
        `;

    } else if (offre.lienCandidature) {

        applicationContainer.innerHTML = `
            <a
                href="${offre.lienCandidature}"
                class="email-link"
                target="_blank"
            >
                Candidater
            </a>
        `;
    }
}


chargerDetailOffre();