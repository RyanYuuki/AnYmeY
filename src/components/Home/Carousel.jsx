/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FetchTrendingAnime, GetMangaTrending } from "../../hooks/useApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendar,
  faClock,
  faHeart,
  faPlayCircle,
  faStar,
  faTelevision,
} from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "../Styling/Carousel.css";
import { Link } from "react-router-dom";
import { SkeletonCarousel } from "../General/Skeleton";

function Carousel({ isManga }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isManga) {
      const loadTrendingAnime = async () => {
        try {
          const result = await FetchTrendingAnime(2);
          if (result) {
            setData(result);
          }
        } catch (error) {
          console.log("Error while fetching data!", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadTrendingAnime();
    } else {
      const loadTrendingManga = async () => {
        try {
          const result = await GetMangaTrending(10);
          console.log(result);
          if (result) {
            setData(result);
          }
        } catch (error) {
          console.log("Error while fetching data!", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadTrendingManga();
    }
  }, [isManga]);

  if (isLoading)
    return (
      <div className="carouselContainer">
        <SkeletonCarousel />
      </div>
    );

  return (
    <div className="carouselContainer">
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        pagination={true}
        loop={true}
        className="carouselSlider-container"
      >
        {data.map((anime, index) => (
          <SwiperSlide key={index}>
            <div className="carouselImage-container">
              <img
                className="carouselImage"
                src={anime.cover || anime.image}
                alt={anime.title.english}
              />
            </div>
            <div className="gradient-overlay" />
            <div className="carouselInfo-container">
              <h1>
                {anime.title.english ||
                  anime.title.romaji ||
                  anime.title.userPreffered ||
                  anime.title.native ||
                  "??"}
              </h1>
              <div className="misc-info">
                <p>
                  <FontAwesomeIcon icon={faTelevision} /> {anime.type || "??"}
                </p>
                <p>
                  <FontAwesomeIcon icon={faClock} />{" "}
                  {isManga ? anime.status : anime.duration && anime.duration + "M" || "??"}
                </p>
                <p>
                  <FontAwesomeIcon icon={isManga ? faHeart : faCalendar} />{" "}
                  {isManga ? anime.popularity : anime.releaseDate && anime.releaseDate || "??"}
                </p>
                <p>
                  <FontAwesomeIcon icon={faStar} /> {anime.rating || "??"}
                </p>
              </div>
              <div className="description-container">
                <p>
                  {anime.description
                    .replace(/<[^>]*>?/gm, "")
                    .substring(0, 225) + "..."}
                </p>
              </div>
              <div className="buttons-group">
                <Link to={ isManga ? `/manga/read/${anime.id}` : `/watch/${anime.id}`}>
                  <button>
                    <FontAwesomeIcon icon={isManga ? faBook : faPlayCircle} />
                    {"  "}
                    {isManga ? "Read Now" : "Watch Now"}
                  </button>
                </Link>
                <Link to={isManga ? `/manga/details/${anime.id}` : `/anime/${anime.id}`}>
                  <button>Detail {">"}</button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
