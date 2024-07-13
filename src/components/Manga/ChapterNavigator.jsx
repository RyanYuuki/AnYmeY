/* eslint-disable no-unused-vars */
import React from "react";
import '../Styling/ChapterNavigator.css';
function ChapterNavigator({ currentChapter, chaptersData }) {
  return (
    <div className="chapters-navigator">
      <button>Chapter {currentChapter + 1 + '>'}</button>
    </div>
  );
}

export default ChapterNavigator;
