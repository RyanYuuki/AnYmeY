/* eslint-disable react/prop-types */
import "./css/TrendingCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

export default function TrendingCarousel({ data }) {
  return (
      <Swiper
        className="carousel-container"
        spaceBetween={30}
        slidesPerView={5}
        style={{ cursor: "grab" }}
      >
        {data.map((anime, index) => (
          <SwiperSlide key={index} className="carousel-item">
            <Link to={`/anime/${anime.id}`} >
            <img
              src={anime.image}
              draggable="false"
            />
            </Link>
            <h4>
              {anime?.title?.english || anime?.title?.romaji || anime?.title?.userPreffered}
            </h4>
            {/* <div className="carousel-item-hover"></div> */}
          </SwiperSlide>
        ))}
      </Swiper>
  );
}
