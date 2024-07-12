import Carousel from "../../components/Home/Carousel";
import AnimeTable from "../../components/Home/AnimeTable";
import TrendingCarousel from "../../components/Home/TrendingCarousel";
import { useEffect } from "react";
import { fetchTheme } from "../../providers/ThemeProvider";

export default function MangaHome() {
  const { setContentType } = fetchTheme();
  useEffect(() => {
    document.title = "AnymeY - Manga";
    window.scrollTo({ top: 0, behavior: "smooth" });
    setContentType("Manga");
    return () => {
      document.title = "AnymeY";
      setContentType("Anime");
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
