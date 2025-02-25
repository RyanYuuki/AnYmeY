/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleHeader, setToggleHeader] = useState(true);
    const [contentType, setContentType] = useState('Anime');
    return (
        <ThemeContext.Provider value={{toggleSearch, setToggleSearch, toggleHeader, setToggleHeader, contentType, setContentType }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const fetchTheme = () => useContext(ThemeContext);
 