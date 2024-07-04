import { useEffect, useState } from "react";
import { FetchTrendingAnime } from "../hooks/useApi";
import "./css/TrendingCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function TrendingCarousel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchTrendingAnime();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="body">
      <h2 className="carousel-heading">Trending Anime</h2>
      <Swiper
        className="carousel-container"
        spaceBetween={50}
        slidesPerView={4}
        style={{ cursor: "grab" }}
      >
        {data.map((anime, index) => (
          <SwiperSlide key={index} className="carousel-item">
            <img
              src={anime.image}
              draggable="false"
              alt={anime.title.english}
            />
            <h4>
              {anime.title.english.length < 20
                ? anime.title.english
                : anime.title.english.substring(0, 20) + "..."}
            </h4>
            {/* <div className="carousel-item-hover"></div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
