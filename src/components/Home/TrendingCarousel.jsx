import { useEffect, useState } from "react";
import { FetchTrendingAnime } from "../../hooks/useApi";
import "../Styling/TrendingCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { SkeletonCard, SkeletonCarouselItem, SkeletonSlide } from "../General/Skeleton";

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

  const arr = [
    1,
    2,
    3,
  ];

  if (isLoading)
    return (
      <div className="body">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '50px'}} >
          {arr.map((index) => (
              <SkeletonCarouselItem key={index} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="body">
      <h2 className="carousel-heading">Trending Anime</h2>
      <Swiper
        className="carousel-container"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          350: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        style={{ cursor: "grab" }}
      >
        {data.map((anime, index) => (
          <SwiperSlide key={index} className="carousel-item">
            <Link to={`/anime/${anime.id}`}>
              <img
                src={anime.image}
                draggable="false"
                alt={anime.title.english}
              />
            </Link>
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
