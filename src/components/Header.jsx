/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faFilm,
  faMagnifyingGlass,
  faMoon,
  faShuffle,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleDarkMode, setToggleDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <nav className="header">
      <h1 className="logo">AnymeY</h1>
      <div className="nav-links">
        <div className="nav-item">
          <FontAwesomeIcon icon={faFilm} />
          Anime
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faBook} />
          Manga
        </div>
      </div>
      <div className="inputBox">
        <input
          onClick={() => setToggleSearch(true)}
          value={inputValue}
          onChange={handleInput}
          className={`${toggleSearch ? "input-active" : ""}`}
          type="text"
          placeholder="Search anime..."
          aria-label="Search anime"
        />
        <button className={` ${toggleSearch ? "search-active" : "searchIcon"}`}>
          <FontAwesomeIcon size="1x" icon={faMagnifyingGlass} />
        </button>
        <button
          onClick={() => {
            setInputValue("");
            setToggleSearch(false);
          }}
          className={` ${toggleSearch ? "searchIcon" : "closeIcon"}`}
        >
          <FontAwesomeIcon size="1x" icon={faXmark} />
        </button>
      </div>
      <div className="action-buttons">
        <button className="action-button" aria-label="Random Anime">
          <FontAwesomeIcon icon={faShuffle} />
        </button>
        <button className="action-button" aria-label="Toggle Dark Mode">
          <FontAwesomeIcon icon={faSun} />
        </button>
        <button className="login-button">Login</button>
      </div>
    </nav>
  );
}

export default Header;
