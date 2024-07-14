import Carousel from "../../components/Home/Carousel";
import AnimeTable from "../../components/Home/AnimeTable";
import TrendingCarousel from "../../components/Home/TrendingCarousel";
import { useEffect } from "react";
export default function MangaHome() {
  useEffect(() => {
    document.title = "AnymeY - Manga";
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      document.title = "AnymeY";
    };
  });

  return (
    <>
      <div className="manga-body">
        <Carousel isManga={true} />
        <TrendingCarousel isManga={true} />
        <AnimeTable isManga={true} />
      </div>
    </>
  );
}
