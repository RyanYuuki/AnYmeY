import "./css/Home.css";
import animeImage from "../assets/homepage_cover.jpg";
import mangaImage from "../assets/second_cover_image.webp";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-body">
      <div className="left-side">
        <img className="anime-bg animated" src={animeImage} alt="Anime background" />
        <img className="manga-bg animated" src={mangaImage} alt="Manga background" />
      </div>
      <div className="right-side animated">
        <h1>
          Welcome to An<span>Y</span>mey
        </h1>
        <span>
          Your one-stop solution for finding anime, manga.
        </span>
        <div className="button-group">
          <Link to={"/anime/home"}>
            <button className="Anime">Anime</button>
          </Link>
          <Link to={"/manga/home"}>
            <button className="Manga">Manga</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
