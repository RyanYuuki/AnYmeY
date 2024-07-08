/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const AnimeList = ({ title, data, style }) => {
  return (
    <div style={style} className="streaming-related-section">
      <h2>{title}</h2>
      {data?.length > 0 ? (
        data.map((anime) => (
          <Link key={anime.mal_id} to={`/anime/${anime.id}`}>
            <div className="related-anime">
              <img src={anime.image} alt={anime.title.english || "??"} />
              <div className="related-anime-details">
                <h4>{anime.title.english || "??"}</h4>
                <p>
                  <span>{anime.type}</span>
                  <span>
                    <FontAwesomeIcon icon={faStar} />
                    {anime.rating}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No {title} Available...</p>
      )}
    </div>
  );
};

export default AnimeList;
