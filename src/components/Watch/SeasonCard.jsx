/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import '../Styling/SeasonCard.css';

function SeasonCard({ data }) {
  return (
    <div className="season-card">
      <Link to={`/anime/${data.id}`}>
        <img 
          className="season-card-image" 
          src={data.image} 
          alt={`${data.title.english} cover`}
        />
      </Link>
      <div className="season-card-overlay"></div>
      <div className="season-card-content">
        <h2 className="season-card-relation">{data.relationType}</h2>
        <h3 className="season-card-title">{data.title.english}</h3>
      </div>
    </div>
  );
}

export default SeasonCard;
