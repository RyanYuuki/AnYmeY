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
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  useMediaState,
} from "@vidstack/react";
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
  const [animeError, setAnimeError] = useState(null);
  const [episodesError, setEpisodesError] = useState(null);
  const [streamingError, setStreamingError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setAnimeError(null);
      setEpisodesError(null);
      try {
        const AnimeData = await FetchAnimeByID(id);
        const EpisodesData = await FetchEpisodesData(id);
        setAnimeData(AnimeData);
        setData(EpisodesData);
        setCurrentEpisodeID(EpisodesData[0]?.id || null);
      } catch (err) {
        setAnimeError("Failed to load anime data.");
        setEpisodesError("Failed to load episodes.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  useEffect(() => {
    const loadStreamingData = async () => {
      if (!currentEpisodeID) return;
      setEpisodeLoading(true);
      setStreamingError(null);
      try {
        const StreamingData = await FetchStreamingData(currentEpisodeID);
        setStreamingData(StreamingData);
      } catch (err) {
        setStreamingError("Failed to load streaming data.");
        console.error(err);
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
  if (animeError || episodesError) {
    return (
      <div>
        <h1>{animeError || "Error loading anime details"}</h1>
        <h2>{episodesError || "Error loading episodes"}</h2>
      </div>
    );
  }

  return (
    <div className="streaming-body">
      <div className="streaming-section">
        <div className="video-player-container">
          {episodeLoading ? (
            <h1>Loading...</h1>
          ) : streamingError ? (
            <h1>{streamingError}</h1>
          ) : streamingData ? (
            <MediaPlayer
              className="player"
              aspectRatio="16/9"
              title={data[currentEpisode - 1]?.title}
              src={streamingData[4]?.url}
              playsInline
              crossOrigin
              streamType="on-demand"
              viewType="video"
              load="eager"
              posterLoad="eager"
            >
              <MediaProvider>
                <Poster
                  className="vds-poster"
                  src={data[currentEpisode - 1].image}
                />
              </MediaProvider>
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
          ) : (
            "No streaming data available."
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
                className="input"
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
                <span>Episode {episode.number}</span>{" "}
                {episode.title || episode.id}
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
            {animeData?.relations.length > 0 ? (
              animeData?.relations?.map((anime) => (
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
              ))
            ) : (
              <p>No Related Anime Available...</p>
            )}
          </div>
          <div className="streaming-anime-seasons">
            <h2>Seasons</h2>
            <div className="season-card-container">
              {animeData.relations.length > 0 ? (
                animeData.relations.some(
                  (relation) =>
                    relation.relationType === "PREQUEL" ||
                    relation.relationType === "SEQUEL"
                ) ? (
                  animeData.relations.map(
                    (anime, index) =>
                      (anime.relationType === "PREQUEL" ||
                        anime.relationType === "SEQUEL") && (
                        <SeasonCard key={index} data={anime} />
                      )
                  )
                ) : (
                  <p>No Sequels / Prequels Available...</p>
                )
              ) : (
                <p>No Sequels / Prequels Available...</p>
              )}
            </div>
          </div>

          <div
            style={{ marginTop: "40px" }}
            className="streaming-related-section"
          >
            <h2>Recommendation</h2>
            {animeData?.recommendations.length > 0 ? (
              animeData?.recommendations?.map((anime) => (
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
              ))
            ) : (
              <p>No Recommendation Anime Available...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Streaming;
