/* eslint-disable no-unused-vars */
const apiLink = "https://consumet-api-two-nu.vercel.app";
const BASE_URL = "https://consumet-api-two-nu.vercel.app/meta/anilist/";
const ANIWATCH_URL = "https://aniwatch-ryan.vercel.app/anime/";
// eslint-disable-next-line no-unused-vars
const FALLBACK_URL = "https://api.jikan.moe/v4/";
// ANIME
export const FetchTrendingAnime = async (page = 1, perPage = 10) => {
    const response = await fetch(`${BASE_URL}trending?page=${page}&perPage=${perPage}`);
    const data = await response.json();
    return data.results;
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
export const FetchAnimeByID = async (query, type = 'info') => {
  const response = await fetch(`${BASE_URL}${type}/${query}`);
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

export const GetMangaNew = async (count, page = 1) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["POPULARITY_DESC"]&status=RELEASING&perPage=${count}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaFavorites = async (count, page = 1) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["FAVOURITES_DESC"]&perPage=${count}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaTrending = async (count, page = 1) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["TRENDING_DESC"]&perPage=${count}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaPopular = async (count, page = 1) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["POPULARITY_DESC"]&perPage=${count}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaTop = async (count, page = 1) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["SCORE_DESC"]&perPage=${count}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const MapAnimeByTitle = async (title) => {
  try {
    const response = await fetch(
      `${ANIWATCH_URL}search?q=${title}`
    );

    const data = await response.json();

    const normalizedTitle = title.toLowerCase();
    let mappedResult = data.animes.find(
      (item) => item.name && item.name.toLowerCase() === normalizedTitle
    );

    if (!mappedResult) {
      const modifiedTitle = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/-\d+$/, "")
        .replace(/-$/, "");
      console.log("Modified title:", modifiedTitle);

      mappedResult = data.animes.find((item) => {
        const itemName = item.name
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/-\d+$/, "")
          .replace(/-$/, "");
        return itemName === modifiedTitle;
      });
    }

    if (!mappedResult) {
      mappedResult = data.animes.find((item) =>
        item.name?.toLowerCase().includes(normalizedTitle)
      );
    }

    console.log("mappedResult:", mappedResult);
    return mappedResult || null; 
  } catch (error) {
    console.error("Error in MapAnimeByTitle:", error);
    return null;
  }
};

export const FetchEpisodesByMappedID = async (id) => {
  const response = await fetch(`${ANIWATCH_URL}episodes/${id}`);
  const data = await response.json();
  return data;
};

export const FetchEpisodeLinksByMappedID = async (id, server = 'vidstreaming', category = 'sub') => {
  const response = await fetch(`${ANIWATCH_URL}episode-srcs?id=${id}?server=${server}&category=${category}`);
  const data = await response.json();
  return data;
}