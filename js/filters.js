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
    catch (error) {

    }
}


async function filter()
{
    const get_data = await get_offers();

    inputSearch.addEventListener("input", () => 
    {
        const result = get_data.filter(offer => 
        {
            if (inputSearch.value === "") return true;

            const props_offer = Object.values(offer);

            let match = false;

            props_offer.forEach(prop => 
            { 
                if (String(prop).toLocaleLowerCase().includes(inputSearch.value.toLowerCase()))
                    match = true;
            });

            return match;
        });

        console.log(result);
    });


    filterPlace.addEventListener("change", () =>
    {
        const result = get_data.filter(offer =>
        {
            if (filterPlace.value === "Toutes les villes") return true;

            return offer.ville === filterPlace.value;
        });

        
    });


    filterTec.addEventListener("change", () =>
    {
        const result = get_data.filter(offer =>
        {
            if (filterTec.value === "Toutes les technos") return true;

            return offer.technologies.includes(filterTec.value);
        });

        
    });


    filterContrat.addEventListener("change", () =>
    {
        const result = get_data.filter(offer =>
        {
            if (filterContrat.value === "Tous les contrats") return true;

            return offer.contrat === filterContrat.value;
        });

        console.log(result);
    });
}


filter();