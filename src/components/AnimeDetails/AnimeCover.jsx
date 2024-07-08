/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const AnimeCover = ({ cover }) => (
  <div className="anime-cover-container">
    <img src={cover || ""} alt="" className="anime-details-cover" />
  </div>
);

export default AnimeCover;
