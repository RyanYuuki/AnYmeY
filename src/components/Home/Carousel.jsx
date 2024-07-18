/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FetchTrendingAnime, GetMangaTrending, MapAnimeByTitle } from "../../hooks/useApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendar,
  faCircleInfo,
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
    const loadTrendingAnime = async () => {
      setIsLoading(true);
      try {
        if (!isManga) {
          const result = await FetchTrendingAnime(1, 5);
          if (result) {
            setData(result);
          }
        } else {
          const result = await GetMangaTrending(10);
          if (result) {
            setData(result);
          }
        }
      } catch (error) {
        console.log("Error while fetching data!", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTrendingAnime();
  }, [isManga]);

  if (isLoading)
    return (
      <div className="carouselContainer">
        <SkeletonCarousel />
      </div>
    );

  return (
    <div className="carouselContainer animated">
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
                alt={anime.title.english || anime.title.romaji || anime.title.native || "??"}
              />
            </div>
            <div className="gradient-overlay" />
            <div className="carouselInfo-container">
              <h1>
                {anime.title.english ||
                  anime.title.romaji ||
                  anime.title.userPreferred ||
                  anime.title.native ||
                  "??"}
              </h1>
              <div className="misc-info">
                <p>
                  <FontAwesomeIcon icon={faTelevision} /> {anime.type || "??"}
                </p>
                <p>
                  <FontAwesomeIcon icon={faClock} />{" "}
                  {isManga
                    ? anime.status
                    : (anime.duration && anime.duration + "M") || "??"}
                </p>
                <p>
                  <FontAwesomeIcon icon={isManga ? faHeart : faCalendar} />{" "}
                  {isManga
                    ? anime.popularity
                    : (anime.releaseDate && anime.releaseDate) || "??"}
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
                <Link
                  to={
                    isManga
                      ? `/manga/read/${anime.id}/MangaId`
                      : `/watch/${anime.id}/`
                  }
                >
                  <button className="button1" >
                    <FontAwesomeIcon icon={isManga ? faBook : faPlayCircle} />
                    {"  "}
                    {isManga ? "Read Now" : "Watch Now"}
                  </button>
                </Link>
                <Link
                  to={
                    isManga
                      ? `/manga/details/${anime.id}`
                      : `/anime/${anime.id}`
                  }
                >
                  <button className="button2" ><FontAwesomeIcon icon={faCircleInfo} />{' '} Detail</button>
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
