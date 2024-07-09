/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import AnimeList from "./AnimeList";

const AnimeDetails = ({ animeData, Months }) => {
  return (
    <>
      <div className="streaming-details-container">
        <div className="streaming-details-row first-row">
          <img src={animeData.image || ""} alt="" />
          <button style={{ width: "100%" }}>INFO</button>
          <button style={{ width: "100%" }}>TRAILER</button>
          <div style={{ display: "flex", flexDirection: "row", gap: "10%" }}>
            <button style={{ width: "45%" }}>A</button>
            <button style={{ width: "45%" }}>MAL</button>
          </div>
        </div>
        <div className="streaming-details-row second-row">
          <h2>
            {animeData.title.english || "??"}{" "}
            <p
              style={{
                color: animeData.color || "inherit",
                fontStyle: "italic",
              }}
            >
              {"["}
              {animeData.title.romaji || "??"}
              {"]"}
            </p>
          </h2>
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
                  {animeData.season || "??"} {animeData.startDate?.year || "??"}
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
      <div className="anime-details-description-mobile">
        {animeData.description}
      </div>
    </>
  );
};

export default AnimeDetails;
