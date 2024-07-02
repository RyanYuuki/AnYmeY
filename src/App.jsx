/* eslint-disable no-unused-vars */
import { fetchTheme } from './providers/ThemeProvider';
import { useThemeColors } from './constants/Colors';
import Header from './components/Header';
import './App.css'

function App() {
  const { theme, setTheme } = fetchTheme();
    const themeColors = useThemeColors();

    return (
      <Header/>
    );
}

export default App
