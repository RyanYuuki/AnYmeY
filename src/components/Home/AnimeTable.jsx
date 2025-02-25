/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import VerticalAnimeCards from "./VerticalAnimeCards";
import "../Styling/AnimeTable.css";
import {
  FetchPopularAnime,
  FetchTrendingAnime,
  GetMangaNew,
  GetMangaPopular,
  GetMangaTop,
  GetMangaFavorites,
  GetMangaTrending
} from "../../hooks/useApi";
import { SkeletonCard } from "../General/Skeleton";
export default function AnimeTable({ isManga }) {
  const [topAiringData, setTopAiringData] = useState([]);
  const [mostPopularData, setMostPopularData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [latestCompletedData, setLatestCompletedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isManga) {
          const TopAiringData = await GetMangaTrending(5);
          const MostPopularData = await GetMangaPopular(5);
          const FavouriteData = await GetMangaFavorites(5, 3);
          const LatestCompletedData = await GetMangaTop(5, 2);
          setTopAiringData(TopAiringData);
          setMostPopularData(MostPopularData);
          setFavouriteData(FavouriteData);
          setLatestCompletedData(LatestCompletedData);
        } else {
          const TopAiringData = await FetchTrendingAnime();
          const MostPopularData = await FetchPopularAnime();
          const FavouriteData = await FetchPopularAnime(4);
          const LatestCompletedData = await FetchPopularAnime(3);
          setTopAiringData(TopAiringData);
          setMostPopularData(MostPopularData);
          setFavouriteData(FavouriteData);
          setLatestCompletedData(LatestCompletedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const truncateString = (str, num) => {
    if (num === undefined) {
      let truncatedString = str.substring(0, 35) + "...";
      return truncatedString;
    } else {
      let truncatedString = str.substring(0, num) + "...";
      return truncatedString;
    }
  };

  if (isLoading)
    return (
      <div style={{ height: "600px", width: "100%", marginTop: "20px" }}>
        <SkeletonCard />
      </div>
    );

  return (
    <div className="anime-table">
      <div className="rows">
        <div className="row-title">
          <h2>Top Airing</h2>
        </div>
        <VerticalAnimeCards data={topAiringData} />
      </div>
      <div className="rows">
        <div className="row-title">
          <h2>Most Popular</h2>
        </div>
        <VerticalAnimeCards data={mostPopularData} />
      </div>
      <div className="rows">
        <div className="row-title">
          <h2>Most Favourite</h2>
        </div>
        <VerticalAnimeCards data={favouriteData} />
      </div>
      <div className="rows">
        <div className="row-title">
          <h2>Latest Completed</h2>
        </div>
        <VerticalAnimeCards data={latestCompletedData} />
      </div>
    </div>
  );
}
