import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/AnimeDetails.css";
import { FetchAnimeByID } from "../hooks/useApi";
import VerticalCharacterCards from '../components/VerticalCharacterCards';
import ReusableCarousel from '../components/ReusableCarousel';

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
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const Months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="anime-details-body">
      <div className="anime-cover-container">
        <img src={data.cover || ""} alt="" className="anime-details-cover" />
      </div>
      <div className="anime-details-info">
        <div className="anime-details-row">
          <img src={data.image || ""} alt="" />
          
          <button><Link style={{ textDecoration: 'none', color: 'white' }} to={`/watch/${data.id}`} >WATCH NOW</Link></button>
          <button>TRAILER</button>
          <div style={{ display: "flex", flexDirection: "row", gap: "10%" }}>
            <button style={{ width: "45%" }}>A</button>
            <button style={{ width: "45%" }}>MAL</button>
          </div>
        </div>
        <div className="anime-details-row">
          <h2>{data.title.english || "??"}</h2>
          <p style={{ color: data.color || "inherit", fontStyle: "italic" }}>
            {data.title.romaji || "??"}
          </p>
          <div className="anime-details-description">
            {(data.description && data.description.replace(/<[^>]*>?/gm, "")) || "??"}
          </div>
          <div className="anime-details-fullInfo">
            <div className="full-info-row">
              <p>
                Japanese: <span>{data.title?.native || "??"}</span>
              </p>
              <p>
                Season: <span>{data.season || "??"} {data.startDate?.year || "??"}</span>
              </p>
              <p>
                Aired:{" "}
                <span>
                  {data.startDate?.year || "??"}{" "}
                  {Months[data.startDate?.month - 1] || "??"}{" "}
                  {data.startDate?.day || "??"}{" "}
                  -{" "}
                  {(data.endDate?.year || "??") + " " +
                   (Months[data.endDate?.month - 1] || "??") + " " + 
                   (data.endDate?.day || "??")}
                </span>
              </p>
              <p>
                Premiered:{" "}
                <span>
                  {data.startDate?.year || "??"}{" "}
                  {Months[data.startDate?.month - 1] || "??"}{" "}
                  {data.startDate?.day || "??"}
                </span>
              </p>
            </div>
            <div className="full-info-row">
              <p>
                Episodes: <span>{data.totalEpisodes || "??"}</span>{" "}
              </p>
              <p>
                Duration: <span>{data.duration ? `${data.duration} Min` : "??"}</span>{" "}
              </p>
              <p>
                Status: <span>{data.status || "??"}</span>{" "}
              </p>
              <p>
                MAL Score: <span>{data.rating || "??"}</span>
              </p>
            </div>
            <div className="full-info-row">
              <p>
                Studio: <span style={{ textTransform: 'capitalize' }} >{data.studios?.[0] || "??"}</span>
              </p>
              <div className="full-info-genre">
                {data.genres?.map((genre, index) => (
                  <span className="genre" key={index}> {genre || "??"} </span>
                )) || "??"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="characters-section">
        <h2>Characters</h2>
        <div className="characters-container">
          <VerticalCharacterCards data={data.characters || []} />
        </div>
      </div>
      <h2 className="anime-details-related">Related</h2>
      <ReusableCarousel data={data.relations || []} />
      <h2 className="anime-details-recommendation">Recommendation</h2>
      <ReusableCarousel data={data.recommendations || []} />
    </div>
  );
}
