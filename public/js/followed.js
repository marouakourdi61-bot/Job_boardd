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


const followButtons = document.querySelectorAll(".follow-button");

followButtons.forEach((button) => {

    const offreId = Number(
        button.dataset.offreId
    );

    const followed = getFollowedOffers();

    if (followed.includes(offreId)) {
        button.textContent = "★ Suivie";
    }

    button.addEventListener("click", () => {

        addFollowedOffer(offreId);

        button.textContent = "★ Suivie";
    });

});