import { useEffect, useState } from "react";
import { FetchTrendingAnime } from "../hooks/useApi";
import "./css/TrendingCarousel.css";

export default function TrendingCarousel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDraggable, setIsDraggable] = useState(false);

  const handleMouseDown = (e) => {
    const carousel = e.currentTarget;
    setIsDraggable(true);
    setStartX(e.pageX - carousel.offsetLeft);
    setScrollLeft(carousel.scrollLeft);
    carousel.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDraggable) return;
    const carousel = e.currentTarget;
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1; // Adjust the multiplier for faster or slower scrolling
    carousel.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDraggable(false);
  };

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
      <div
        className="carousel-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: "grab" }}
      >
        {data.map((anime, index) => (
          <div key={index} className="carousel-item">
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
          </div>
        ))}
      </div>
    </div>
  );
}
