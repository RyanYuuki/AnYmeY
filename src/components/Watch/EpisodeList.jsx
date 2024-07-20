/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faImage,
  faTableCells,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { SkeletonEpisodes } from "../General/Skeleton";

const EpisodeList = ({
  data,
  image,
  currentEpisode,
  handleEpisode,
  searchTerm,
  handleInputChange,
  isLoading,
  Skeleton,
}) => {
  const [listType, setListType] = useState(0);
  const ListTypes = ["Cover", "List", "Grid"];

  const handleListTypeChange = () => {
    const newType = (listType + 1) % ListTypes.length;
    setListType(newType);
  };
  const listIcons = [faImage, faBars, faTableCells];

  const filteredEpisodes = data?.filter((episode) => {
    return episode.title
      ? episode.title.toLowerCase().includes(searchTerm) ||
          episode.number.toString().includes(searchTerm)
      : episode.number.toString().includes(searchTerm);
  });

  if (data.length < 1)
    return (
      <h3
        style={{ padding: "20px 0", justifyContent: "center" }}
        className="episode"
      >
        No Episodes Available
      </h3>
    );

  return (
    <>
      <div className="streaming-episodes-header">
        <div className="episodes-select-box">
          <select style={{ width: "100%", height: "100%" }}>
            <option value={`${data[0]?.number || 1} - ${data?.length}`}>
              Episodes{` ${data[0]?.number || 1} - ${data?.length}`}
            </option>
          </select>
        </div>
        <div className="streaming-input-box">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Filter Episodes..."
            className="input"
          />
          <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        </div>
        <button onClick={handleListTypeChange} className="context-toggler">
          <FontAwesomeIcon icon={listIcons[listType]} />
        </button>
      </div>
      <div className={`episodes-${ListTypes[listType]}`}>
        {isLoading
          ? Skeleton.map((_, index) => <SkeletonEpisodes key={index} />)
          : filteredEpisodes.length > 0 && ListTypes[listType] === "Cover"
          ? filteredEpisodes.map((episode) => (
              <div
                key={episode.id}
                className={`episode ${
                  currentEpisode === episode.number ? "episode-active" : ""
                }`}
                onClick={() => handleEpisode(episode)}
              >
                <img src={episode.image || image} alt={episode.fallback} />
                <span className="episode-tag">Ep {episode?.number}</span>
                <div className="textContainer">
                  <span>Episode {episode?.number}</span>{" "}
                  <p>
                    {(episode?.title && episode?.title) || episode?.id || ""}
                  </p>
                </div>
              </div>
            ))
          : null}
        {isLoading
          ? Skeleton.map((_, index) => <SkeletonEpisodes key={index} />)
          : filteredEpisodes.length > 0 && ListTypes[listType] === "List"
          ? filteredEpisodes.map((episode) => (
              <div
                key={episode.id}
                className={`episode-list ${
                  currentEpisode === episode.number ? "episode-active" : ""
                } animated`}
                onClick={() => handleEpisode(episode)}
              >
                <span>
                  {currentEpisode === episode.number ? (
                    <FontAwesomeIcon icon={faPlay} />
                  ) : (
                    episode?.number + "."
                  )}{" "}
                </span>
                <p>{(episode?.title && episode?.title) || episode?.id || ""}</p>
              </div>
            ))
          : null}
        {isLoading
          ? Skeleton.map((_, index) => <SkeletonEpisodes key={index} />)
          : filteredEpisodes.length > 0 && ListTypes[listType] === "Grid"
          ? filteredEpisodes.map((episode) => (
              <div
                key={episode.id}
                className={`episode-grid ${
                  currentEpisode === episode.number ? "episode-active" : ""
                } animated`}
                onClick={() => handleEpisode(episode)}
              >
                <span>{currentEpisode === episode.number ? <FontAwesomeIcon icon={faPlay} />  : episode?.number}</span>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default EpisodeList;
