/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { SkeletonPlayer } from "../General/Skeleton";
import error from "../../assets/error.gif";

const VideoPlayer = ({
  streamingData,
  currentEpisodeTitle,
  currentEpisodeImage,
  episodeLoading,
  streamingError,
}) => {
  if (streamingError) return <h1>{streamingError}</h1>;
  return episodeLoading ? (
    <SkeletonPlayer />
  ) : (
    <MediaPlayer
      className="player animated"
      aspectRatio="16/9"
      title={currentEpisodeTitle}
      src={streamingData[4]?.url || ""}
      playsInline
      crossOrigin
      streamType="on-demand"
      viewType="video"
      load="eager"
      posterLoad="eager"
    >
      <MediaProvider>
        <Poster className="vds-poster" src={currentEpisodeImage} />
      </MediaProvider>
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};

export default VideoPlayer;
