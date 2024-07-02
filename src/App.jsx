/* eslint-disable no-unused-vars */
import { fetchTheme } from './providers/ThemeProvider';
import { useThemeColors } from './constants/Colors';
import Header from './components/Header';
import './App.css';
import Carousel from './components/Carousel';
import TrendingCarousel from './components/TrendingCarousel';

function App() {
  const { theme, setTheme } = fetchTheme();
    const themeColors = useThemeColors();

    return (
      <>      
      <Header/>
      <Carousel/>
      <TrendingCarousel/>
      </>
    );
}

export default App
