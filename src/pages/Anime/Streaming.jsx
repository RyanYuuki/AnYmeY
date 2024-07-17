import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FetchAnimeByID,
  FetchEpisodeLinksByMappedID,
  FetchEpisodesByMappedID,
  FetchEpisodesData,
  MapAnimeByTitle,
} from "../../hooks/useApi";
import VideoPlayer from "../../components/Watch/VideoPlayer";
import EpisodeList from "../../components/Watch/EpisodeList";
import AnimeDetails from "../../components/Watch/AnimeDetails";
import AnimeList from "../../components/Watch/AnimeList";
import SeasonsList from "../../components/Watch/SeasonsList";
import "../css/Streaming.css";
import {
  SkeletonPlayer,
  SkeletonCard,
  SkeletonEpisodes,
} from "../../components/General/Skeleton";
import CurrentEpisode from "../../components/Watch/CurrentEpisode";
import ErrorPlayer from "../../components/Shared/ErrorPlayer";

const Streaming = () => {
  const { id, mappedId } = useParams();
  const [data, setData] = useState(null);
  const [animeData, setAnimeData] = useState(null);
  const [streamingData, setStreamingData] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [currentEpisodeID, setCurrentEpisodeID] = useState(null);
  const [server, setServer] = useState("vidstreaming");
  const [category, setCategory] = useState("sub");
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
        let AnimeData;
        let EpisodesData;
  
        if (id === "21" || id === 21) {
          AnimeData = await FetchAnimeByID(id, "data");
        } else {
          AnimeData = await FetchAnimeByID(id);
        }
  
        if (AnimeData && !mappedId) {
          const fallback = await MapAnimeByTitle(AnimeData.title.english);
          EpisodesData = await FetchEpisodesByMappedID(fallback.id);
        } else {
          EpisodesData = await FetchEpisodesByMappedID(mappedId);
        }
  
        const EpisodesImagesData = await FetchEpisodesData(id);
  
        if (AnimeData) {
          setAnimeData(AnimeData);
        }
  
        if (EpisodesData && EpisodesImagesData) {
          setData(
            EpisodesData.episodes.map((episode, index) => ({
              ...episode,
              image: EpisodesImagesData[index]?.image,
            }))
          );
          setCurrentEpisodeID(EpisodesData.episodes[0]?.episodeId || "NA");
        } else {
          setEpisodesError("Failed to load episodes data.");
        }
      } catch (err) {
        setAnimeError("Failed to load anime data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadData();
  }, [id, mappedId]);
  

  useEffect(() => {
    const loadStreamingData = async () => {
      setEpisodeLoading(true);
      setStreamingError(null);
      try {
        if (currentEpisodeID === "NA") {
          setStreamingError("Error");
        } else {
          const StreamingData = await FetchEpisodeLinksByMappedID(
            currentEpisodeID,
            server,
            category
          );
          setStreamingData(StreamingData);
        }
      } catch (err) {
        setStreamingError("Failed to load streaming data.");
        console.error(err);
      } finally {
        setEpisodeLoading(false);
      }
    };

    if (currentEpisodeID) {
      loadStreamingData();
    }
  }, [currentEpisodeID, server, category]);

  const handleEpisode = (episode) => {
    setCurrentEpisode(episode.number);
    setCurrentEpisodeID(episode.episodeId);
  };

  const handleEpisodeContexts = (server, category) => {
    setServer(server.toString().toLowerCase());
    setCategory(category);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const Skeleton = ["", "", "", "", "", ""];

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

  if (animeError || episodesError) {
    return (
      <div className="streaming-body">
        <div>
          <h1>{animeError || "Error loading anime details"}</h1>
          <h2>{episodesError || "Error loading episodes"}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="streaming-body">
      <div className="streaming-section">
        <div className="video-player-container">
          {episodeLoading ? (
            <SkeletonPlayer />
          ) : !streamingData?.sources ? (
            <ErrorPlayer />
          ) : (
            <VideoPlayer
              streamingData={streamingData || []}
              currentEpisodeTitle={data[currentEpisode - 1]?.title || "???"}
              currentEpisodeImage={
                data[currentEpisode - 1]?.image || animeData.cover
              }
              episodeLoading={episodeLoading}
              streamingError={streamingError}
              captionsData={streamingData?.tracks}
            />
          )}
        </div>
        <div className="streaming-episodes">
          {isLoading ? (
            Skeleton.map((_, index) => <SkeletonEpisodes key={index} />)
          ) : (
            <EpisodeList
              data={data}
              image={animeData?.image}
              currentEpisode={currentEpisode}
              handleEpisode={handleEpisode}
              searchTerm={searchTerm}
              handleInputChange={handleInputChange}
              isLoading={isLoading}
              Skeleton={Skeleton}
            />
          )}
        </div>
      </div>
      <div className="streaming-anime-details">
        {isLoading ? (
          <SkeletonCard />
        ) : (
          <>
            <div className="left-streaming-row">
              <CurrentEpisode
                data={data[currentEpisode - 1] || []}
                title={animeData?.title?.english}
                handleEpisodeContexts={handleEpisodeContexts}
              />
              <AnimeDetails animeData={animeData || []} Months={Months} />
              <SeasonsList relations={animeData?.relations || []} />
            </div>
            <div className="right-streaming-row">
              <AnimeList title="Related" data={animeData?.relations || []} />
              <AnimeList
                style={{ marginTop: "40px" }}
                title="Recommendation"
                data={animeData?.recommendations || []}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Streaming;
