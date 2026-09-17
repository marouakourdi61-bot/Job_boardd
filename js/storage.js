function getFollowed_Offers()
{
    const followed = localStorage.getItem("followedOffers");

    if (followed === null)
    {
        return [];
    }

    return JSON.parse(followed);
}


function addFollowed_Offer(id)
{
    const followed = getFollowed_Offers();

    if (!followed.includes(id))
    {
        followed.push(id);
    }

    localStorage.setItem("followedOffers", JSON.stringify(followed));
}


function removeFollowed_Offer(id)
{
    const followed = getFollowed_Offers();

    const result = followed.filter((offerId) => offerId !== id);

    localStorage.setItem("followedOffers", JSON.stringify(result));
}


function initFollowed_Offers()
{
    const stars = document.querySelectorAll(".star");

    stars.forEach((star) =>
    {
        const id = Number(star.dataset.id);

        if (getFollowed_Offers().includes(id))
        {
            star.textContent = "★";
        }

        star.addEventListener("click", () =>
        {
            if (getFollowed_Offers().includes(id))
            {
                removeFollowed_Offer(id);
                star.textContent = "☆";

                if (window.location.pathname.includes("offres-suivies.html"))
                {
                    window.location.reload();
                }
            }
            else
            {
                addFollowed_Offer(id);
                star.textContent = "★";
            }
        });
    });
}