/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SkeletonCard, SkeletonSlide } from "../General/Skeleton";
const EpisodeList = ({
  data,
  currentEpisode,
  handleEpisode,
  searchTerm,
  handleInputChange,
  isLoading,
}) => {
  const filteredEpisodes = data?.filter((episode) => {
    return episode.title
      ? episode.title.toLowerCase().includes(searchTerm) ||
        episode.number.toString().includes(searchTerm)
      : episode.number.toString().includes(searchTerm);
  });

  return (
    <>
      <div className="streaming-episodes-header">
        <div className="episodes-select-box">
          <select style={{ width: "100%", height: "100%" }}>
            <option value={`${data[0].number} - ${data.length}`}>
              Episodes{` ${data[0].number} - ${data.length}`}
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
      </div>

      {filteredEpisodes?.map((episode) =>
        isLoading ? (
          <SkeletonCard key={episode.id} />
        ) : (
          <div
            key={episode.id}
            className={`episode ${
              currentEpisode === episode.number ? "episode-active" : ""
            }`}
            onClick={() => handleEpisode(episode)}
          >
            <img src={episode.image} alt={episode.fallback} />
            <span className="episode-tag">Ep {episode.number}</span>
            <div className="textContainer">
              <span>Episode {episode.number}</span>{" "}
              <p>{(episode.title && episode?.title) || episode?.id || ""}</p>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default EpisodeList;
