/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FetchPopularAnime, FetchTrendingAnime } from "../../hooks/useApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faPlayCircle,
  faStar,
  faTelevision,
} from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "../Styling/Carousel.css";
import { Link } from "react-router-dom";

function Carousel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTrendingAnime = async () => {
      try {
        const result = await FetchPopularAnime();
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
  }, []);

  if (isLoading) return <div>Loading...</div>;

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
              <img className="carouselImage" src={anime.cover} alt={anime.title.english} />
            </div>
            <div className="gradient-overlay" />
            <div className="carouselInfo-container">
              <h1>{anime.title.english}</h1>
              <div className="misc-info">
                <p>
                  <FontAwesomeIcon icon={faTelevision} /> {anime.type}
                </p>
                <p>
                  <FontAwesomeIcon icon={faClock} /> {anime.duration}M
                </p>
                <p>
                  <FontAwesomeIcon icon={faCalendar} /> {anime.releaseDate}
                </p>
                <p>
                  <FontAwesomeIcon icon={faStar} /> {anime.rating}
                </p>
              </div>
              <div className="description-container">
                <p>
                  {anime.description.replace(/<[^>]*>?/gm, "").substring(0, 225) +
                    "..."}
                </p>
              </div>
              <div className="buttons-group">
                <Link to={`/watch/${anime.id}`} ><button ><FontAwesomeIcon icon={faPlayCircle}/> Watch Now</button></Link>
                <Link to={`/anime/${anime.id}`} ><button>Detail {'>'}</button></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
