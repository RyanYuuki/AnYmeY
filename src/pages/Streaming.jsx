/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FetchAnimeByID,
  FetchEpisodesData,
  FetchStreamingData,
} from "../hooks/useApi";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "./css/Streaming.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import SeasonCard from "../components/SeasonCard";

function Streaming() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [animeData, setAnimeData] = useState(null);
  const [streamingData, setStreamingData] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [currentEpisodeID, setCurrentEpisodeID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [episodeLoading, setEpisodeLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const AnimeData = await FetchAnimeByID(id);
        const EpisodesData = await FetchEpisodesData(id);
        setAnimeData(AnimeData);
        setData(EpisodesData);
        setCurrentEpisodeID(EpisodesData[0].id);
      } catch (err) {
        setError("Failed to load episodes.");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  useEffect(() => {
    const loadStreamingData = async () => {
      if (!currentEpisodeID) return;
      try {
        setEpisodeLoading(true);
        const StreamingData = await FetchStreamingData(currentEpisodeID);
        setStreamingData(StreamingData);
      } catch (err) {
        setError("Failed to load streaming data.");
        console.log(err);
      } finally {
        setEpisodeLoading(false);
      }
    };
    loadStreamingData();
  }, [currentEpisodeID]);

  const handleEpisode = (episode) => {
    setCurrentEpisode(episode.number);
    setCurrentEpisodeID(episode.id);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredEpisodes = data?.filter((episode) => {
    return (
      episode.title.toLowerCase().includes(searchTerm) ||
      episode.number.toString().includes(searchTerm)
    );
  });

  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="streaming-body">
      <div className="streaming-section">
        <div className="video-player-container">
          {streamingData ? (
            <MediaPlayer
              title={data[currentEpisode - 1]?.title}
              src={streamingData[4]?.url}
              playsInline={true}
              crossOrigin={true}
              streamType="on-demand"
              viewType="video"
            >
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
          ) : (
            "Loading..."
          )}
        </div>
        <div className="streaming-episodes">
          <div className="streaming-episodes-header">
            <select>
              <option value={`${data[0].number} - ${data.length - 1}`}>
                Episodes{` ${data[0].number} - ${data.length - 1}`}
              </option>
            </select>
            <div className="streaming-input-box">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Filter Episodes..."
              />
              <FontAwesomeIcon
                className="search-icon"
                icon={faMagnifyingGlass}
              />
            </div>
          </div>

          {filteredEpisodes?.map((episode) => (
            <div
              key={episode.id}
              className={`episode ${
                currentEpisode === episode.number ? "episode-active" : ""
              } `}
              onClick={() => handleEpisode(episode)}
            >
              <img src={episode.image} alt={episode.title || episode.number} />
              <span className="episode-tag">Ep {episode.number}</span>
              <div className="textContainer">
                <span>Episode {episode.number}</span> {episode.title || episode.id}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mid-section">
        <div className="streaming-anime-details">
          <div className="streaming-details-container">
            <div className="streaming-details-row first-row">
              <img src={animeData.image || ""} alt="" />
              <button style={{ width: "100%" }}>TRAILER</button>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10%" }}
              >
                <button style={{ width: "45%" }}>A</button>
                <button style={{ width: "45%" }}>MAL</button>
              </div>
            </div>
            <div style={{ width: "80%" }} className="streaming-details-row">
              <h2>{animeData.title.english || "??"}</h2>
              <p
                style={{
                  color: animeData.color || "inherit",
                  fontStyle: "italic",
                }}
              >
                {animeData.title.romaji || "??"}
              </p>
              <div className="anime-details-description">
                {(animeData.description &&
                  animeData.description
                    .replace(/<[^>]*>?/gm, "")
                    .substring(0, 350) + "...") ||
                  "??"}
              </div>
              <div className="anime-details-fullInfo">
                <div className="full-info-row">
                  <p>
                    Japanese: <span>{animeData.title?.native || "??"}</span>
                  </p>
                  <p>
                    Season:{" "}
                    <span>
                      {animeData.season || "??"}{" "}
                      {animeData.startDate?.year || "??"}
                    </span>
                  </p>
                  <p>
                    Aired:{" "}
                    <span>
                      {animeData.startDate?.year || "??"}{" "}
                      {Months[animeData.startDate?.month - 1] || "??"}{" "}
                      {animeData.startDate?.day || "??"} -{" "}
                      {(animeData.endDate?.year || "??") +
                        " " +
                        (Months[animeData.endDate?.month - 1] || "??") +
                        " " +
                        (animeData.endDate?.day || "??")}
                    </span>
                  </p>
                  <p>
                    Premiered:{" "}
                    <span>
                      {animeData.startDate?.year || "??"}{" "}
                      {Months[animeData.startDate?.month - 1] || "??"}{" "}
                      {animeData.startDate?.day || "??"}
                    </span>
                  </p>
                </div>
                <div className="full-info-row">
                  <p>
                    Episodes: <span>{animeData.totalEpisodes || "??"}</span>{" "}
                  </p>
                  <p>
                    Duration:{" "}
                    <span>
                      {animeData.duration ? `${animeData.duration} Min` : "??"}
                    </span>{" "}
                  </p>
                  <p>
                    Status: <span>{animeData.status || "??"}</span>{" "}
                  </p>
                  <p>
                    MAL Score: <span>{animeData.rating || "??"}</span>
                  </p>
                </div>
                <div className="full-info-row">
                  <p>
                    Studio:{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {animeData.studios?.[0] || "??"}
                    </span>
                  </p>
                  <div className="full-info-genre">
                    {animeData.genres?.map((genre, index) => (
                      <span className="genre" key={index}>
                        {" "}
                        {genre || "??"}{" "}
                      </span>
                    )) || "??"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="streaming-related-section">
            <h2>Related</h2>
            {animeData?.relations?.map((anime) => (
              <Link key={anime.mal_id} to={`/anime/${anime.id}`}>
                <div className="related-anime">
                  <img src={anime.image} alt={anime.title.english} />
                  <div className="related-anime-details">
                    <h4>{anime.title.english || "??"}</h4>
                    <p>
                      <span> {animeData.type} </span>
                      <span>
                        <FontAwesomeIcon icon={faStar} />
                        {animeData.rating}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="streaming-anime-seasons">
            <h2>Seasons</h2>
            <div className="season-card-container">
            {animeData?.relations?.map((anime) =>
              anime.relationType == "PREQUEL" ? (
                <SeasonCard data={anime} />
              ) : anime?.relationType == "SEQUEL" ? (
                <SeasonCard data={anime} />
              ) : null
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Streaming;
