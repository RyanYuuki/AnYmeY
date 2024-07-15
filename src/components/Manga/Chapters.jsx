/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";
import "../../pages/css/Manga.css";

function Chapters({ data }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredChapters = data.chapters
    ? data.chapters.filter(
        (chapter) =>
          chapter.pages > 0 && 
          chapter.chapterNumber &&
          chapter.chapterNumber.toString().includes(searchTerm)
      )
    : [];

  return (
    <div className="chapters-body">
      <div className="chapters-header">
        <h2>Chapters</h2>
        <input
          type="text"
          placeholder="Search chapters..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="chapters">
        {filteredChapters.length > 0 ? (
          filteredChapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              to={`/manga/read/${chapter.id}/ChapterId/${data.id}/${index+1}`}
            >
              <p className="chapter">{chapter.chapterNumber}</p>
            </Link>
          ))
        ) : (
          <p>No chapters available.</p>
        )}
      </div>
    </div>
  );
}

export default Chapters;
