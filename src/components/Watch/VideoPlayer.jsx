/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Thumbnail,
  Track,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { SkeletonPlayer } from "../General/Skeleton";
import ErrorPlayer from "../Shared/ErrorPlayer";

const VideoPlayer = ({
  streamingData,
  currentEpisodeTitle,
  currentEpisodeImage,
  streamingError,
  captionsData,
}) => {
  if (streamingError || streamingData.length < 1) return <ErrorPlayer />;
  const captions = captionsData.filter((caption) => caption.kind == "captions");
  const thumbnails = captionsData.filter(
    (caption) => caption.kind == "thumbnails"
  );
  return (
    <MediaPlayer
      className="player animated"
      aspectRatio="16/9"
      title={currentEpisodeTitle}
      src={streamingData?.sources[0]?.url || ""}
      playsInline
      crossOrigin
      streamType="on-demand"
      viewType="video"
      load="eager"
      posterLoad="eager"
    >
      <MediaProvider>
        <Poster className="vds-poster" src={currentEpisodeImage} />
        {captions.map((c) => (
          <Track
            src={c?.file}
            label={c?.label}
            kind={c?.kind}
            language="en-us"
            type={"vtt"}
            default={c?.default}
          />
        ))}
      </MediaProvider>
      <DefaultVideoLayout thumbnails={thumbnails[0]?.file} icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};

export default VideoPlayer;
