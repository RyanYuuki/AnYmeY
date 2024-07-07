/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
import { FetchRandomAnime } from "../hooks/useApi";
import { Link, Navigate } from "react-router-dom";

function Header() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDarkMode, setDarkMode] = useState(false);
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  useEffect( () => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
  };
  const randomNum = Math.floor(Math.random() * 10000) + 1;
 
  return (
    <>
      <nav className="header">
        <h1 className="logo">An<span>Y</span>meY</h1>
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
            className={`${toggleSearch ? "input-active" : "input"}`}
            type="text"
            placeholder="Search anime..."
          />
          <button
            onClick={() => setToggleSearch(!toggleSearch)}
            className={` ${toggleSearch ? "search-active" : "searchIcon"}`}
          >
            <FontAwesomeIcon size="1x" icon={faMagnifyingGlass} />
          </button>
          <button
            onClick={() => {
              setInputValue("");
              setToggleSearch(false);
            }}
            className={` ${toggleSearch ? "closeIcon-active" : "closeIcon"}`}
          >
            <FontAwesomeIcon size="1x" icon={faXmark} />
          </button>
        </div>
        <div className="action-buttons">
          <button
            onClick={() => setToggleSearch(!toggleSearch)}
            className="action-button searchToggle-mobile"
          >
            <FontAwesomeIcon size="1x" icon={faMagnifyingGlass} />
          </button>
          <button className="action-button">
            <Link to={'/anime/random'} >
            <FontAwesomeIcon icon={faShuffle} />
            </Link>
          </button>
          <button onClick={toggleTheme} className="action-button">
            <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
          </button>
          <button className="login-button"><Link to={`/anime/${randomNum}`} >Login</Link></button>
        </div>
      </nav>
      <div
        className={`inputBox-mobile ${
          toggleSearch ? "inputBox-mobile-active" : ""
        }`}
      >
        <input
          className="input-mobile"
          value={inputValue}
          onChange={handleInput}
          type="text"
          placeholder="Search anime..."
        />
        <button
          onClick={() => {
            setInputValue("");
            setToggleSearch(false);
          }}
          className="closeIcon-mobile"
        >
          <FontAwesomeIcon size="1x" icon={faXmark} />
        </button>
        <button
          onClick={() => {
            setInputValue("");
            setToggleSearch(false);
          }}
          className="searchIcon-mobile"
        >
          <FontAwesomeIcon size="1x" icon={faMagnifyingGlass} />
        </button>
      </div>
    </>
  );
}

export default Header;
