/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import VerticalCharacterCards from "./VerticalCharacterCards";
import { useLocation } from "react-router-dom";

const CharactersSection = ({ characters }) => {
  const location = useLocation();
  const [isManga, setIsManga] = useState(null);
  useEffect(() => {
    if(location.pathname.includes('manga')) {
      setIsManga(true);
    }
    else {
      setIsManga(false);
    }
  }, [location.pathname])

  const [voiceActorsLang, setVoiceActorsLang] = useState("Japanese");

  const handleLanguageChange = (event) => {
    setVoiceActorsLang(event.target.value);
  };

  return (
    <div className="characters-section">
      <div className="characters-header">
        <h2>Characters</h2>
        {isManga ? null : (
          <select
            className="characters-select-box"
            value={voiceActorsLang}
            onChange={handleLanguageChange}
          >
            <option value="Japanese">Japanese</option>
            <option value="English">English</option>
          </select>
        )}
      </div>
      <div className="characters-container animated">
        <VerticalCharacterCards
          language={voiceActorsLang}
          data={characters || []}
          isManga={isManga}
        />
      </div>
    </div>
  );
};

export default CharactersSection;
