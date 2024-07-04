/* eslint-disable no-unused-vars */
import { fetchTheme } from "./providers/ThemeProvider";
import { useThemeColors } from "./constants/Colors";
import Header from "./components/Header";
import Home from './pages/Home';
import AnimeDetails from './pages/AnimeDetails';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const { theme, setTheme } = fetchTheme();
  const themeColors = useThemeColors();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/anime/:id',
      element: <AnimeDetails/>
    },
  ])

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
