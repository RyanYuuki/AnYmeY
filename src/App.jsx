/* eslint-disable no-unused-vars */
import { fetchTheme } from './providers/ThemeProvider';
import { useThemeColors } from './constants/Colors';
import Header from './components/Header';
import Carousel from './components/Carousel';
import TrendingCarousel from './components/TrendingCarousel';
import AnimeTable from './components/AnimeTable';
import './index.css';
function App() {
  const { theme, setTheme } = fetchTheme();
    const themeColors = useThemeColors();

    return (
      <>      
      <Header/>
      <Carousel/>
      <TrendingCarousel/>
      <AnimeTable/>
      </>
    );
}

export default App
