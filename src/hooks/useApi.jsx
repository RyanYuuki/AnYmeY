const BASE_URL = "https://consumet-api-two-nu.vercel.app/meta/anilist/";
const FALLBACK_URL = "https://api.jikan.moe/v4/";

export const FetchTrendingAnime = async (page) => {
  if (page == undefined) {
    const response = await fetch(`${BASE_URL}trending`);
    const data = await response.json();
    return data.results;
  } else {
    const response = await fetch(`${BASE_URL}trending?page=${page}`);
    const data = await response.json();
    return data.results;
  }
};
export const FetchPopularAnime = async (page) => {
    if (page == undefined) {
        const response = await fetch(`${BASE_URL}popular`);
        const data = await response.json();
        return data.results;
      } else {
        const response = await fetch(`${BASE_URL}popular?page=${page}`);
        const data = await response.json();
        return data.results;
      }
};
export const FetchRandomAnime = async () => {
  const response = await fetch(`${FALLBACK_URL}anime/random`);
  const data = await response.json();
  return data.results;
};
export const FetchAnimeByID = async (query) => {
  const response = await fetch(`${BASE_URL}info/${query}`);
  const data = await response.json();
  return data;
};
export const SearchAnime = async (query) => {
  const response = await fetch(`${BASE_URL}${query}`);
  const data = await response.json();
  return data.results;
};
export const FetchStreamingData = async (query) => {
  const response = await fetch(`${BASE_URL}watch/${query}`);
  const data = await response.json();
  return data.sources;
}
export const FetchEpisodesData = async (query) => {
  const response = await fetch(`${BASE_URL}episodes/${query}`);
  const data = await response.json();
  return data;
}