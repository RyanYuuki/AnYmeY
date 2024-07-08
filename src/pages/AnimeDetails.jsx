import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchAnimeByID, FetchRandomAnime } from "../hooks/useApi";
import AnimeCover from "../components/AnimeDetails/AnimeCover";
import AnimeFullInfo from "../components/AnimeDetails/AnimeFullInfo";
import CharactersSection from "../components/AnimeDetails/CharactersSection";
import RelatedSection from "../components/AnimeDetails/RelatedSection";
import RecommendationSection from "../components/AnimeDetails/RecommendationSection";
import "./css/AnimeDetails.css";
import { SkeletonCard } from "../components/General/Skeleton";
const AnimeDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id === "random") {
          const data = await FetchRandomAnime();
          setData(data);
        } else {
          const data = await FetchAnimeByID(id);
          setData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ width: '100% ', height: '100%', marginTop: '100px' }} >
        <SkeletonCard />
      </div>
    );
  }

  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="anime-details-body">
      <AnimeCover cover={data.cover} />
      <AnimeFullInfo data={data} Months={Months} />
      <CharactersSection characters={data.characters} />
      <RelatedSection relations={data.relations} />
      <RecommendationSection recommendations={data.recommendations} />
    </div>
  );
};

export default AnimeDetails;
