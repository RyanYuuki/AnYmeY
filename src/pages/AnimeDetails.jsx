import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/AnimeDetails.css";
import { FetchAnimeByID } from "../hooks/useApi";
export default function AnimeDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await FetchAnimeByID(id);
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="body">
      <div className="anime-cover-container">
        <img className="anime-cover" src={data.cover} alt={data.title} />
      </div>
      <div className="anime-info">
        
      </div>
    </div>
  );
}
