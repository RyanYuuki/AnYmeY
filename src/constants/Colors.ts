import { fetchTheme } from "../providers/ThemeProvider";

export const themes = {
  light: {
    primary: '#d34d90',
    text: 'black',
    background: '#eee',
    tabIconDefault: 'black',
    tabBackground: '#eee',
    tabIconSelected: '#d34d90',
    btnBackground: '#fff',
    inputBackground: 'rgba(0, 0, 0, 0.5)',
    transparentBtn: 'rgba(255,255,255,0.5)'
  },
  dark: {
    primary: '#d34d90',
    text: 'white',
    background: 'black',
    tabBackground: '#333',
    tabIconDefault: '#ccc',
    tabIconSelected: '#d34d90',
    btnBackground: '#1A1A1A',
    inputBackground: 'rgba(255, 255, 255, 0.5)',
    transparentBtn: 'rgba(0,0,0,0.5)'
  },
};

export default themes;

export function useThemeColors() {
  const { theme } = fetchTheme();
  return theme === 'dark' ? themes.dark : themes.light;
}
