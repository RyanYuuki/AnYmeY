/* eslint-disable no-unused-vars */
import { fetchTheme } from "./providers/ThemeProvider";
import { useThemeColors } from "./constants/Colors";
import Header from "./components/General/Header";
import AnimeHome from './pages/Anime/Home';
import AnimeDetails from './pages/Anime/AnimeDetails';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Streaming from "./pages/Anime/Streaming";
import MangaHome from "./pages/Manga/Home";
import ErrorBoundary from './ErrorBoundary';
import MangaDetails from "./pages/Manga/MangaDetails";
import Read from "./pages/Manga/Read";
import Home from "./pages/Home";
import MovieHome from "./pages/Movie/Home";
import { Footer } from "./components/General/Footer";

function App() {
  const { theme, setTheme } = fetchTheme();
  const themeColors = useThemeColors();

  return (
    <Router>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/home" element={<AnimeHome />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="/watch/:id/:mappedId?" element={<Streaming />} />
          <Route path="/manga/home" element={<MangaHome />} />
          <Route path="/manga/details/:id" element={<MangaDetails />} />
          <Route path="/manga/read/:id/:method?/:mangaId?/:mangaChapter?" element={<Read />} />
          <Route path="/movie/home" element={<MovieHome />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ErrorBoundary>
      <Footer/>
    </Router>
  );
}

export default App;
