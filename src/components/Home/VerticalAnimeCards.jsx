import "../Styling/VerticalAnimeCards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function VerticalAnimeCards({ data }) {
  return data.map((anime, index) =>
    index > 4 ? null : (
      <div key={anime.mal_id} className="anime-item">
        <Link to={`/anime/${anime.id}`}>
        <img
          className="anime-image"
          src={anime.image}
          alt={anime.title.english}
        />
        </Link>
        <div className="anime-info">
          <p>{ anime.title.english.length > 60 ? anime.title.english.substring(0, 60) + '...' : anime.title.english}</p>
          <div className="row">
            <div
              style={{
                backgroundColor: anime.color
                  ? anime.color
                  : "rgb(255,255,255,0.6)",
              }}
              className="anime-info-item"
            >
              <FontAwesomeIcon icon={faClosedCaptioning} />
              24
            </div>
            <p className="anime-info-type">{anime.type}</p>
          </div>
        </div>
        <div className="anime-item-hover">
          <h4 className="aime-title">{anime.title.english}</h4>
          <div className="anime-tags">
            <p className="anime-rating">
              <FontAwesomeIcon color="yellow" icon={faStar} />{" "}
              {anime.rating / 10}
            </p>
            <p className="tag">HD</p>
            <p className="tag">{anime.totalEpisodes}</p>
            <p className="tag">{anime.type}</p>
          </div>
          <div className="anime-description">
            {anime.description.replace(/<[^>]*>?/gm, "").substring(0, 100) +
              "..."}
          </div>
          <div className="anime-other-info">
            <p>
              <span>Japanese: </span> {anime.title.native}
            </p>
            <p>
              <span>Release Date: </span> {anime.releaseDate}
            </p>
            <p>
              <span>Status:  </span> {anime.status}
            </p>
            <p>
              <span>Genres:  </span> {anime.genres[0]} {anime.genres[1]} {anime.genres[2] || ''}
            </p>
          </div>
        </div>
      </div>
    )
  );
}
