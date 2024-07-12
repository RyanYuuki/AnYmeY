import "./css/Home.css";
import animeImage from "../assets/anime.jpg";
import mangaImage from "../assets/manga.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-body">
      <div className="home-container">
        <h1>
          Welcome to An<span>Y</span>mey
        </h1>
        <p>Your one-stop solution for finding anime, manga, and movies</p>
        <div className="button-group">
          <button className="Anime"><Link to={'/anime/home'} >Anime</Link></button>
          <button className="Manga"><Link to={'/manga/home'} >Manga</Link></button>
        </div>
        <img
          className="bg-image anime-bg"
          src={animeImage}
          alt="Anime background"
        />
        <img
          className="bg-image manga-bg"
          src={mangaImage}
          alt="Manga background"
        />
      </div>
    </div>
  );
}

export default Home;
