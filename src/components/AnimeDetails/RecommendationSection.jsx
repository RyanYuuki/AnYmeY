/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import ReusableCarousel from "../General/ReusableCarousel";

const RecommendationSection = ({ recommendations }) => (
  <div className="recommendation-section">
    <ReusableCarousel title="Recommendation" data={recommendations || []} />
  </div>
);

export default RecommendationSection;
