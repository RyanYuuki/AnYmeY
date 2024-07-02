const BASE_URL = 'https://consumet-api-two-nu.vercel.app/meta/anilist/';

export const FetchTrendingAnime = async () => {
    const response = await fetch(`${BASE_URL}trending`);
    const data = await response.json();
    return data.results;
}
export const FetchPopularAnime = async () => {
    const response = await fetch(`${BASE_URL}popular`);
    const data = await response.json();
    return data.results;
}
export const FetchRandomAnime = async () => {
    const response = await fetch(`${BASE_URL}trending`);
    const data = await response.json();
    return data.results;
}
export const SearchAnime = async (query) => {
    const response = await fetch(`${BASE_URL}${query}`);
    const data = await response.json();
    return data.results;
}