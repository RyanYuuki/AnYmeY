/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import VerticalAnimeCards from "./VerticalAnimeCards";
import "./css/AnimeTable.css";
import { FetchPopularAnime, FetchTrendingAnime } from "../hooks/useApi";
export default function AnimeTable() {
  const [topAiringData, setTopAiringData] = useState([]);
  const [mostPopularData, setMostPopularData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [latestCompletedData, setLatestCompletedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const TopAiringData = await FetchTrendingAnime();
        const MostPopularData = await FetchPopularAnime();
        const FavouriteData = await FetchPopularAnime(2);
        const LatestCompletedData = await FetchPopularAnime(3);
        setTopAiringData(TopAiringData);
        setMostPopularData(MostPopularData);
        setFavouriteData(FavouriteData)
        setLatestCompletedData(LatestCompletedData);
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="anime-table">
      <div className="rows">
        <h2>Top Airing</h2>
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
