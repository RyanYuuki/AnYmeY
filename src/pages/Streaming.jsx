/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FetchEpisodesData, FetchStreamingData } from "../hooks/useApi";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "./css/Streaming.css";

function Streaming() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [streamingData, setStreamingData] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [currentEpisodeID, setCurrentEpisodeID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [episodeLoading, setEpisodeLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const EpisodesData = await FetchEpisodesData(id);
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

  if (isLoading || episodeLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="streaming-body">
      <div className="streaming-section">
        <div className="video-player-container">
          {streamingData ? (
            <MediaPlayer
              title={data[currentEpisode - 1]?.title}
              src={streamingData[4]?.url}
            >
              <MediaProvider />
              <DefaultVideoLayout
                thumbnails={data[currentEpisode]?.image}
                icons={defaultLayoutIcons}
              />
            </MediaPlayer>
          ) : (
            "Loading..."
          )}
        </div>
        <div className="streaming-episodes">
          <h2>Episodes</h2>
          {data.map((episode) => (
            <div
              key={episode.id}
              className={`episode ${
                currentEpisode == episode.number ? "episode-active" : ""
              } `}
              onClick={() => handleEpisode(episode)}
            >
              <img src={episode.image} alt={episode.title} />
              <span className="episode-tag">Ep {episode.number}</span>
              <div className="textContainer">
                <span>Episode {episode.number}</span> {episode.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Streaming;
