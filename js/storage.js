
function getFollowed_Offers()
{
    const followed = localStorage.getItem("followedOffers");

    if (followed === null)
    {
        return [];
    }

    return JSON.parse(followed);
}