/* eslint-disable react/prop-types */
import "./css/TrendingCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

export default function TrendingCarousel({ data = [] }) {
  // Check if data is not an array or is empty
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="carousel-error">
        <p>No trending anime available at the moment.</p>
      </div>
    );
  }

  return (
    <Swiper
      className="carousel-container reusable"
      spaceBetween={30}
      slidesPerView={5}
      style={{ cursor: "grab" }}
    >
      {data.map((anime, index) => (
        <SwiperSlide key={index} className="carousel-item">
          <Link to={`/anime/${anime.id}`}>
            <img
              src={anime.image || "/path/to/default-image.jpg"} // Default image
              alt={anime.title?.english || anime.title?.romaji || anime.title?.userPreferred || "Anime"}
              draggable="false"
              onError={(e) => e.target.src = "/path/to/default-image.jpg"} // Fallback for broken images
            />
          </Link>
          <h4>
            {anime?.title?.english || anime?.title?.romaji || anime?.title?.userPreferred || "Unknown Title"}
          </h4>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
