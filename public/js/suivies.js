const followed = getFollowedOffers();

const offerCards = document.querySelectorAll(".offer-card");

const emptyMessage = document.querySelector("#empty-message");

let followedCount = 0;

offerCards.forEach((card) => {

    const offreId = Number(card.dataset.offreId);

    if (followed.includes(offreId)) {

        followedCount++;

    } else {

        card.remove();

    }

});

if (followedCount > 0) {
    emptyMessage.style.display = "none";
}