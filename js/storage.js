
function getFollowed_offers()
{
    const followed = localStorage.getItem("followedOffers");

    if (followed === null)
    {
        return [];
    }

    return JSON.parse(followed);
}

function removefollowed_offer(id)
{
    const followed = getFollowed_Offers();

    const result = followed.filter((offerId) => offerId !== id);

    localStorage.setItem("followedOffers", JSON.stringify(result));
}

function addFollowed_offer(id)
{
    const followed = getFollowed_Offers();

    if (!followed.includes(id))
    {
        followed.push(id);
    }

    localStorage.setItem("followedOffers", JSON.stringify(followed));
}
