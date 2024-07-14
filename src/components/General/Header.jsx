/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import "../Styling/Header.css";
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
import { FetchRandomAnime, GetMangaSearch, SearchAnime } from "../../hooks/useApi";
import { Link, useNavigate } from "react-router-dom";
import SearchItem from "../General/SearchItem";
import { fetchTheme } from "../../providers/ThemeProvider";
import debounce from "lodash.debounce";

function Header() {
  const {
    toggleSearch,
    setToggleSearch,
    toggleHeader,
    setToggleHeader,
    contentType,
  } = fetchTheme();
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      setIsLoading(true);
      try {
        if (contentType === "Anime") {
          const searchData = await SearchAnime(query);
          setData(searchData);
        } else {
          const searchData = await GetMangaSearch(query, 10);
          setData(searchData);
        }
      } catch (error) {
        console.error("Search error:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handleInput = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      debouncedSearch(value);
    } else {
      setData([]);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setToggleSearch(false);
      navigate(`/search/`);
    }
  };

  return (
    <nav style={{ display: toggleHeader ? "flex" : "none" }} className="header">
      <h1 className="logo">
        <Link to={"/"}>
          An<span>Y</span>meY{" "}
        </Link>
      </h1>
      <div className="nav-links">
        <div className="nav-item">
          <a href={"/anime/home"}>
            <FontAwesomeIcon icon={faFilm} /> Anime
          </a>
        </div>
        <div className="nav-item">
          <a href={"/manga/home"}>
            <FontAwesomeIcon icon={faBook} /> Manga
          </a>
        </div>
      </div>
      <div className="inputBox">
        <input
          onClick={() => setToggleSearch(true)}
          value={inputValue}
          onChange={handleInput}
          className={toggleSearch ? "input-active" : "input"}
          type="text"
          placeholder={contentType == 'Anime' ? "Search Anime..." : "Search Manga..." }
          onKeyDown={handleEnter}
        />
        <div
          className={`search-items ${
            toggleSearch && data.length > 0 ? "search-items-active" : ""
          } `}
        >
          {isLoading && data.length == 0 ? (
            <div>Loading...</div>
          ) : (
            data.map((anime, index) => <SearchItem key={index} data={anime} />)
          )}
        </div>
        <button
          onClick={() => setToggleSearch(!toggleSearch)}
          className={toggleSearch ? "search-active" : "searchIcon"}
          aria-label="Toggle search"
        >
          <FontAwesomeIcon size="1x" icon={faMagnifyingGlass} />
        </button>
        <button
          onClick={() => {
            setInputValue("");
            setToggleSearch(false);
            setData([]);
          }}
          className={toggleSearch ? "closeIcon-active" : "closeIcon"}
          aria-label="Close search"
        >
          <FontAwesomeIcon size="1x" icon={faXmark} />
        </button>
      </div>
      <div className="action-buttons">
        <button
          onClick={() => setToggleSearch(!toggleSearch)}
          className="action-button searchToggle-mobile"
          aria-label="Search"
        >
          <FontAwesomeIcon size="1x" icon={faMagnifyingGlass} />
        </button>
        <button className="action-button">
          <Link to={"/anime/random"}>
            <FontAwesomeIcon icon={faShuffle} />
          </Link>
        </button>
        <button onClick={toggleTheme} className="action-button">
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
        <button className="login-button">
          <Link to={`/anime/${Math.floor(Math.random() * 100) + 1}`}>
            Login
          </Link>
        </button>
      </div>
      {window.innerWidth < 768 ? (
        <div
          className={`inputBox-mobile ${
            toggleSearch ? "inputBox-mobile-active" : ""
          }`}
        >
          <input
            className="input-mobile"
            onClick={() => setToggleSearch(true)}
            value={inputValue}
            onChange={handleInput}
            type="text"
            onKeyDown={handleEnter}
            placeholder="Search anime..."
          />

          <div
            style={{
              display: toggleSearch && data.length > 0 ? "flex" : "none",
            }}
            className="search-items-mobile"
          >
            {isLoading && data.length == 0 ? (
              <div>Loading...</div>
            ) : (
              data.map((anime, index) => (
                <SearchItem key={index} data={anime} />
              ))
            )}
          </div>
          <button
            onClick={() => {
              setInputValue("");
              setToggleSearch(false);
              setData([]);
            }}
            className="closeIcon-mobile"
            aria-label="Close search"
          >
            <FontAwesomeIcon size="1x" icon={faXmark} />
          </button>
          <button
            onClick={() => setToggleSearch(false)}
            className="searchIcon-mobile"
            aria-label="Search"
          >
            <FontAwesomeIcon size="1x" icon={faMagnifyingGlass} />
          </button>
        </div>
      ) : null}
    </nav>
  );
}

export default Header;
