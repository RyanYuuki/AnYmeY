import Carousel from "../components/Home/Carousel";
import AnimeTable from "../components/Home/AnimeTable";
import TrendingCarousel from "../components/Home/TrendingCarousel";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    document.title = "AnymeY - Anime";
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      document.title = "AnymeY";
    };
  });
  return (
    <>
      <Carousel />
      <TrendingCarousel />
      <AnimeTable />
    </>
  );
}
