/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import VerticalCharacterCards from "./VerticalCharacterCards";

const CharactersSection = ({ characters }) => (
  <div className="characters-section">
    <h2>Characters</h2>
    <div className="characters-container">
      <VerticalCharacterCards data={characters || []} />
    </div>
  </div>
);

export default CharactersSection;