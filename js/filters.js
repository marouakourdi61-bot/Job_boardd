const inputSearch = document.querySelector("#input_search");
const filterPlace = document.querySelector("#filter_place");
const filterTec = document.querySelector("#filter_tec");
const filterContrat = document.querySelector("#filter_contrat");


async function get_offers()
{
    try
    {
        const get_response = await fetch("./data/offres.json");
        const data = await get_response.json();
        return data;
    }
    catch (error)
    {
        console.log(error);
    }
}


async function filter()
{
    const get_data = await get_offers();

    get_data.forEach((offer) =>
    {
        offer.technologies.forEach((technologie) =>
        {
            const option = document.createElement("option");

            if (!filterTec.innerHTML.includes(technologie))
            {
                option.textContent = technologie;
                filterTec.appendChild(option);
            }
        });
    });


    get_data.forEach((offer) =>
    {
        const option = document.createElement("option");

        if (!filterPlace.innerHTML.includes(offer.ville))
        {
            option.textContent = offer.ville;
            filterPlace.appendChild(option);
        }
    });


    get_data.forEach((offer) =>
    {
        const option = document.createElement("option");

        if (!filterContrat.innerHTML.includes(offer.typeContrat))
        {
            option.textContent = offer.typeContrat;
            filterContrat.appendChild(option);
        }
    });


    inputSearch.addEventListener("input", () =>
    {
        const result = get_data.filter((offer) =>
        {
            return offer.titre.toLowerCase().includes(inputSearch.value.toLowerCase());
        });

        afficherOffres(result);
    });


    filterPlace.addEventListener("change", () =>
    {
        const result = get_data.filter((offer) =>
        {
            if (filterPlace.value === "Toutes les villes")
            {
                return true;
            }

            return offer.ville === filterPlace.value;
        });

        afficherOffres(result);
    });


    filterTec.addEventListener("change", () =>
    {
        const result = get_data.filter((offer) =>
        {
            if (filterTec.value === "Toutes les technos")
            {
                return true;
            }

            return offer.technologies.includes(filterTec.value);
        });

        afficherOffres(result);
    });


    filterContrat.addEventListener("change", () =>
    {
        const result = get_data.filter((offer) =>
        {
            if (filterContrat.value === "Tous les contrats")
            {
                return true;
            }

            return offer.typeContrat === filterContrat.value;
        });

        afficherOffres(result);
    });
}


filter();