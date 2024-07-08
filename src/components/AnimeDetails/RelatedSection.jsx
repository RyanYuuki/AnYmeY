/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import ReusableCarousel from "../General/ReusableCarousel";

const RelatedSection = ({ relations }) => (
  <div className="related-section">
    <ReusableCarousel title="Related" data={relations || []} />
  </div>
);

export default RelatedSection;
