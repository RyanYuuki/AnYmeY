/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import VerticalCharacterCards from "./VerticalCharacterCards";

const CharactersSection = ({ characters }) => {
  const [voiceActorsLang, setVoiceActorsLang] = useState("Japanese");

  const handleLanguageChange = (event) => {
    setVoiceActorsLang(event.target.value);
  };

  return (
    <div className="characters-section">
      <div className="characters-header">
        <h2>Characters</h2>
        <select
          className="characters-select-box"
          value={voiceActorsLang}
          onChange={handleLanguageChange}
        >
          <option value="Japanese">Japanese</option>
          <option value="English">English</option>
        </select>
      </div>
      <div className="characters-container animated">
        <VerticalCharacterCards
          language={voiceActorsLang}
          data={characters || []}
        />
      </div>
    </div>
  );
};

export default CharactersSection;
