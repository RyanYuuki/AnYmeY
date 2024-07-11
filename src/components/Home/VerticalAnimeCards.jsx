import "../Styling/VerticalAnimeCards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function VerticalAnimeCards({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverPosition, setHoverPosition] = useState("below");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setHoveredIndex(null);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = (index, event) => {
    const hoverItem = event.currentTarget.querySelector(".anime-item-hover");
    const hoverItemHeight = hoverItem.offsetHeight;
    const hoverItemTop = event.currentTarget.getBoundingClientRect().top;
    const spaceAbove = hoverItemTop;
    const spaceBelow =
      window.innerHeight - (hoverItemTop + event.currentTarget.offsetHeight);

    if (spaceBelow < hoverItemHeight && spaceAbove > hoverItemHeight) {
      setHoverPosition("above");
    } else {
      setHoverPosition("below");
    }

    setHoveredIndex(index);
  };

  return data.map((anime, index) =>
    index > 4 ? null : (
      <div
        key={anime.mal_id}
        className={`anime-item ${hoveredIndex === index ? "hover" : ""}`}
        onMouseEnter={(event) => handleMouseEnter(index, event)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Link to={`/anime/${anime.id}`}>
          <img
            className="anime-image"
            src={anime.image}
            alt={anime.title.english || anime.title.romaji || anime.title.userPreferred || anime.title.native || '??'}
          />
        </Link>
        <div className="anime-info">
          <p>
            {(
              anime.title.english ||
              anime.title.romaji ||
              anime.title.userPreferred ||
              anime.title.native ||
              '??'
            ).length > 60
              ? (
                anime.title.english ||
                anime.title.romaji ||
                anime.title.userPreferred ||
                anime.title.native ||
                '??'
              ).substring(0, 60) + "..."
              : anime.title.english ||
                anime.title.romaji ||
                anime.title.userPreferred ||
                anime.title.native ||
                '??'}
          </p>
          <div className="row">
            <div className="anime-info-item item1">
              <FontAwesomeIcon icon={faClosedCaptioning} />
              {anime.totalEpisodes || '??'}
            </div>
            <div className="anime-info-item item2">
              <FontAwesomeIcon icon={faStar} />
              {anime.rating || '??'}
            </div>
            <p className="anime-info-type">{" " + anime.type}</p>
          </div>
        </div>
        <div className={`anime-item-hover ${hoverPosition}`}>
          <h4 className="anime-title">
            {anime.title.english || anime.title.romaji || anime.title.userPreferred || anime.title.native || '??'}
          </h4>
          <div className="anime-tags">
            <p className="anime-rating">
              <FontAwesomeIcon color="yellow" icon={faStar} />{" "}
              {(anime.rating ? anime.rating / 10 : '??')}
            </p>
            <p className="tag">HD</p>
            <p className="tag">{anime.totalEpisodes || '??'}</p>
            <p className="tag">{anime.type || '??'}</p>
          </div>
          <div className="anime-description">
            {(anime.description ? anime.description.replace(/<[^>]*>?/gm, "").substring(0, 100) + "..." : '??')}
          </div>
          <div className="anime-other-info">
            <p>
              <span>Japanese: </span> {anime.title.native || '??'}
            </p>
            <p>
              <span>Release Date: </span> {anime.releaseDate || '??'}
            </p>
            <p>
              <span>Status: </span> {anime.status || '??'}
            </p>
            <p>
              <span>Genres: </span> {anime.genres[0] || ''} {anime.genres[1] || ''}{" "}
              {anime.genres[2] || ""}
            </p>
          </div>
        </div>
      </div>
    )
  );
}
