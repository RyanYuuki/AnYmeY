/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FetchTrendingAnime, GetMangaPopular } from "../../hooks/useApi";
import "../Styling/TrendingCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { SkeletonCarouselItem } from "../General/Skeleton";

export default function TrendingCarousel({ isManga }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isManga) {
          const result = await GetMangaPopular(10);
          setData(result);
        } else {
          const result = await FetchTrendingAnime(2, 10);
          setData(result);
        }
      } catch (error) {
        setError("Error while fetching trending anime.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadingSkeletons = [1, 2, 3];

  if (isLoading) {
    return (
      <div className="body">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: "50px",
          }}
        >
          {loadingSkeletons.map((index) => (
            <SkeletonCarouselItem key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="body">
      <h2 className="carousel-heading">Trending {isManga ? "Manga" : "Anime"}</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="body animated">
      <h2 className="carousel-heading">Trending {isManga ? "Manga" : "Anime"}</h2>
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
        {data.map((anime, index) => {
          const title =
            anime?.title?.english ||
            anime?.title?.romaji ||
            anime?.title?.userPreferred ||
            "??";
          return (
            <SwiperSlide key={index} className="carousel-item">
              <Link to={isManga ? `/manga/details/${anime.id}` : `/anime/${anime.id}`}>
                <img src={anime.image} draggable="false" alt={title} />
              </Link>
              <h4>
                {title.length < 20 ? title : title.substring(0, 20) + "..."}
              </h4>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
