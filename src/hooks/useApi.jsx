/* eslint-disable no-unused-vars */
const apiLink = "https://consumet-api-two-nu.vercel.app";
const BASE_URL = "https://consumet-api-two-nu.vercel.app/meta/anilist/";
// eslint-disable-next-line no-unused-vars
const FALLBACK_URL = "https://api.jikan.moe/v4/";
// ANIME
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
export const FetchAnimeByID = async (query) => {
  const response = await fetch(`${BASE_URL}info/${query}`);
  const data = await response.json();
  return data;
};
export const SearchAnime = async (query) => {
  const newQuery = query.trim();
  const response = await fetch(`${BASE_URL}${newQuery}`);
  const data = await response.json();
  return data.results;
};
export const FetchStreamingData = async (query) => {
  const response = await fetch(`${BASE_URL}watch/${query}`);
  const data = await response.json();
  return data.sources;
};
export const FetchEpisodesData = async (query) => {
  const response = await fetch(`${BASE_URL}episodes/${query}`);
  const data = await response.json();
  return data;
};
export const FetchRandomAnime = async () => {
  const response = await fetch(`${BASE_URL}random-anime`);
  const data = await response.json();
  return data;
};

//MANGA
export const GetMangaDetails = async (id) => {
  const response = await fetch(
    apiLink + `/meta/anilist-manga/info/${id}?provider=mangadex`
  );
  const data = await response.json();
  return data;
};

export const GetMangaPages = async (chapterId) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist-manga/read?chapterId=${chapterId}&provider=mangadex`
  );
  const data = await response.json();
  return data;
};

export const GetMangaSearch = async (query, count) => {
  const response = await fetch(
    apiLink + `/meta/anilist-manga/${query}?page=1&perPage=${count}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaNew = async (count) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["POPULARITY_DESC"]&status=RELEASING&perPage=${count}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaTrending = async (count) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["TRENDING_DESC"]&perPage=${count}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaPopular = async (count) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["POPULARITY_DESC"]&perPage=${count}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaTop = async (count) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["SCORE_DESC"]&perPage=${count}`
  );
  const data = await response.json();
  return data.results;
};
