

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
    inputSearch.addEventListener('input', () => 
        {
        const result = get_data.filter(offer => 
        {

            if (inputSearch.value === "") return true;

             const props_offer = Object.values(offer)
             let match = false;
             props_offer.forEach( prop => 
            { 
                if (String(prop).toLocaleLowerCase().includes(inputSearch.value.toLowerCase()))
                    match = true;
                
             });
             return match;


        });

        console.log(result); 

    });



}

filter();
// inputSearch.addEventListener('input' ,() => {
//     console.log(inputSearch.value);

// });

