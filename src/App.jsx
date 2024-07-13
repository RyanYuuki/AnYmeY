/* eslint-disable no-unused-vars */
import { fetchTheme } from "./providers/ThemeProvider";
import { useThemeColors } from "./constants/Colors";
import Header from "./components/General/Header";
import AnimeHome from './pages/Anime/Home';
import AnimeDetails from './pages/Anime/AnimeDetails';
import { HashRouter, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Streaming from "./pages/Anime/Streaming";
import Search from './pages/Search';
import MangaHome from "./pages/Manga/Home";
import ErrorBoundary from './ErrorBoundary';
import MangaDetails from "./pages/Manga/MangaDetails";
import Read from "./pages/Manga/Read";
import Home from "./pages/Home";
function App() {
  const { theme, setTheme } = fetchTheme();
  const themeColors = useThemeColors();

  return (
    <HashRouter>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/home" element={<AnimeHome />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="/watch/:id" element={<Streaming />} />
          <Route path="/manga/home" element={<MangaHome />} />
          <Route path="/manga/details/:id" element={<MangaDetails/>} />
          <Route path="/manga/read/:id/:method?/:chapter?" element={<Read />} />
          <Route path="/search/:query?" element={<Search />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
