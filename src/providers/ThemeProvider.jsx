/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [toggleSearch, setToggleSearch] = useState(false);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleSearch, setToggleSearch }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const fetchTheme = () => useContext(ThemeContext);
 