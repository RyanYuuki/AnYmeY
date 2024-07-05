import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/AnimeDetailsNew.css";
import { FetchAnimeByID } from "../hooks/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
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

  const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <div className="anime-details-body">
      <div className="anime-cover-container">
        <img src={data.cover} alt="" className="anime-details-cover" />
      </div>
      <div className="anime-details-info">
        <div className="anime-details-row row1">
          <img src={data.image} />
        </div>
        <div className="anime-details-row row2">
          <h1>{data.title.english}</h1>
          <div className="anime-details-tags">
            <p style={{ backgroundColor: 'beige' }} >PG-13</p>
            <p>HD</p>
            <p>1110</p>
            <p>23M</p>
            <p>TV</p>
          </div>
          <div className="anime-details-buttons">
            <button>
              <FontAwesomeIcon icon={faPlay} />
              Watch Now
            </button>
            <button>
              <FontAwesomeIcon icon={faPlus} />
              Add To List
            </button>
          </div>
          <div className="anime-details-description">
            {data.description.replace(/<[^>]*>?/gm, "")}
          </div>
        </div>
        <div className="anime-details-row row3">
        <p>
              Japanese: <span>{data.title.native}</span>
            </p>
            <p>
              Season: <span>{data.season}</span>
            </p>
            <p>
              Aired:{" "}
              <span>
                {data.startDate.year +
                  " " +
                  Months[data.startDate.month - 1] +
                  " " +
                  data.startDate.day || "??"}{" "}
                -{" "}
                {data.endDate.year +
                  " " +
                  Months[data.endDate.month] +
                  " " +
                  data.endDate.day || "??"}
              </span>
            </p>
            <p>
              Premiered:{" "}
              <span>
                {data.startDate.year +
                  " " +
                  Months[data.startDate.month - 1] +
                  " " +
                  data.startDate.day || "??"}
              </span>
            </p>
            <p>
              Episodes: <span>{data.totalEpisodes || "??"}</span>{" "}
            </p>
            <p>
              Duration: <span>{data.duration + 'Min' || "??"}</span>{" "}
            </p>
            <p>
              Status: <span>{data.status || "??"}</span>{" "}
            </p>
            <p>MAL Score: {data.rating || "??"} </p>
            <p>
              Genres:{" "}
              {data.genres.map((genre, index) => (
                <span key={index}> {genre} </span>
              ))}
            </p>
            <p>
              Studios: <span>{data.studios[0]}</span>
            </p>
        </div>
      </div>
    </div>
  );
}
