/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import SeasonCard from "./SeasonCard";

const SeasonsList = ({ relations }) => {
  console.log(relations);
  return (
    <div className="streaming-anime-seasons">
      <h2>Seasons</h2>
      <div className="season-card-container">
        {relations.length > 0 ? (
          relations.some(
            (relation) =>
              relation.relationType === "PREQUEL" ||
              relation.relationType === "SEQUEL"
          ) ? (
            relations.map(
              (anime, index) =>
                (anime.relationType === "PREQUEL" ||
                  anime.relationType === "SEQUEL") && (
                  <SeasonCard key={index} data={anime} />
                )
            )
          ) : (
            <p>No Sequels / Prequels Available...</p>
          )
        ) : (
          <p>No Sequels / Prequels Available...</p>
        )}
      </div>
    </div>
  );
};

export default SeasonsList;
