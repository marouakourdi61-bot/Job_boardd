function getFollowedOffers() {
    const followed = localStorage.getItem("followedOffers");

    if (followed === null) {
        return [];
    }

    return JSON.parse(followed);
}


function addFollowedOffer(id) {
    const followed = getFollowedOffers();

    if (!followed.includes(id)) {
        followed.push(id);
    }

    localStorage.setItem(
        "followedOffers",
        JSON.stringify(followed)
    );
}


function removeFollowedOffer(id) {
    const followed = getFollowedOffers();

    const updatedFollowed = followed.filter(
        (offerId) => offerId !== id
    );

    localStorage.setItem(
        "followedOffers",
        JSON.stringify(updatedFollowed)
    );
}


const followButtons = document.querySelectorAll(".follow-button");

followButtons.forEach((button) => {

    const offreId = Number(button.dataset.offreId);

    const followed = getFollowedOffers();

    if (followed.includes(offreId)) {
        button.textContent = "★ Suivie";
    } else {
        button.textContent = "☆ Suivre";
    }

    button.addEventListener("click", () => {

        const followed = getFollowedOffers();

        if (followed.includes(offreId)) {

            removeFollowedOffer(offreId);

            button.textContent = "☆ Suivre";

        } else {

            addFollowedOffer(offreId);

            button.textContent = "★ Suivie";
        }
    });

});