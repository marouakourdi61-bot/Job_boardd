
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