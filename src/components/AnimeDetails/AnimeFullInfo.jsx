/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const AnimeFullInfo = ({ data, Months, isManga }) => {
  let totalPages = 0;
  data.chapters.map((chapter) => (totalPages += chapter.pages));
  const averagePages = totalPages / data.chapters.length;
  return (
    <>
      <div className="anime-details-info">
        <div className="anime-details-row">
          <img src={data.image || ""} alt="" />
          <button>
            <Link
              style={{ textDecoration: "none" }}
              to={isManga ? `/manga/read/${data.id}` : `/watch/${data.id}`}
            >
              {isManga ? "Read Now" : "WATCH NOW"}
            </Link>
          </button>
          <button>TRAILER</button>
          <div style={{ display: "flex", flexDirection: "row", gap: "10%" }}>
            <button style={{ width: "45%" }}>A</button>
            <button style={{ width: "45%" }}>MAL</button>
          </div>
        </div>
        <div className="anime-details-row">
          <h2>
            {data.title.english || "??"}{" "}
            <p
              style={{
                color: data.color || "inherit",
                fontStyle: "italic",
                fontSize: "12px",
              }}
            >
              {"["}
              {data.title.romaji || "??"}
              {"]"}
            </p>
          </h2>
          <div className="anime-details-description">
            {(data.description && data.description.replace(/<[^>]*>?/gm, "")) ||
              "??"}
          </div>
          <div className="anime-details-fullInfo">
            <div className="full-info-row">
              <p>
                Romaji: <span>{data.title?.native || "??"}</span>
              </p>
              <p>
                Season:{" "}
                <span>
                  {(data.season && data.season + data.startDate?.year) || "??"}
                </span>
              </p>
              <p>
                Aired:{" "}
                <span>
                  {data.startDate?.year || "??"}{" "}
                  {Months[data.startDate?.month - 1] || "??"}{" "}
                  {data.startDate?.day || "??"} -{" "}
                  {(data.endDate?.year || "??") +
                    " " +
                    (Months[data.endDate?.month - 1] || "??") +
                    " " +
                    (data.endDate?.day || "??")}
                </span>
              </p>
              <p>
                {isManga ? "Avg Pages:" : "Premiered:"}{" "}
                <span>
                  {isManga
                    ? Math.floor(averagePages)
                    : data.startDate?.year +
                        " " +
                        Months[data.startDate?.month - 1] +
                        " " +
                        +data.startDate?.day || "??"}
                </span>
              </p>
            </div>
            <div className="full-info-row">
              <p>
                {isManga ? "Chapters:" : "Episodes:"}{" "}
                <span>
                  {isManga
                    ? data.chapters.length - 1
                    : data.totalEpisodes || "??"}
                </span>{" "}
              </p>
              <p>
                {isManga ? "Popularity" : "Duration:"}{" "}
                <span>
                  {isManga
                    ? data.popularity
                    : data.duration
                    ? `${data.duration} Min`
                    : "??"}
                </span>{" "}
              </p>
              <p>
                Status: <span>{data.status || "??"}</span>{" "}
              </p>
              <p>
                MAL Score: <span>{data.rating || "??"}</span>
              </p>
            </div>
            <div className="full-info-row">
              <p>
                {isManga ? "Art Studio:" : "Studio:"}{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {data.studios?.[0] || "??"}
                </span>
              </p>
              <div className="full-info-genre">
                {data.genres?.map((genre, index) => (
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
        {(data.description && data.description.replace(/<[^>]*>?/gm, "")) ||
          "??"}
      </div>
    </>
  );
};

export default AnimeFullInfo;
