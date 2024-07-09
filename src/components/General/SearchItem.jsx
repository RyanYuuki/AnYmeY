/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "../Styling/SearchItem.css";
import { Link } from "react-router-dom";
import { fetchTheme } from "../../providers/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faStar } from "@fortawesome/free-solid-svg-icons";
function SearchItem({ data }) {
  const { toggleSearch, setToggleSearch } = fetchTheme();
  return (
    <Link onClick={() => setToggleSearch(!toggleSearch)} style={{ width: "100%" }} to={`/anime/${data.id}`}>
      <div className="search-item-container">
        <img src={data?.image || ""} alt={data?.title?.image || "??"} />
        <div className="search-item-info">
          <p>
            {data?.title?.english ||
              data?.title?.romaji ||
              data?.title?.userPreffered ||
              "??"}
          </p>
          <div className="search-item-row">
            <p>{data?.releaseDate || "??"}</p>
            <p>{data?.type || "??"}</p>
            <p> <FontAwesomeIcon icon={faShield} /> {data?.totalEpisodes || "??"}</p>
            <p> <FontAwesomeIcon icon={faStar} /> {data?.rating || "??"}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchItem;
