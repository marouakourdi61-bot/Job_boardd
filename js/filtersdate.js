let ordreDate = "ancien";

function trierParDate(offres) {

    offres.sort((a, b) => {

        const dateA = new Date(a.datePublication);
        const dateB = new Date(b.datePublication);

        if (ordreDate === "ancien") {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });
}