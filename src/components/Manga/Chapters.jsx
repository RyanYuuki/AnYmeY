/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";
import "../../pages/css/Manga.css";

function Chapters({ data, title }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredChapters = data.filter((chapter) =>
    chapter.chapterNumber.toString().includes(searchTerm)
  );

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
        {filteredChapters.map((chapter, index) => (
          <Link
            key={index}
            to={`/manga/read/${chapter.id}/${title}/${chapter.chapterNumber}/`}
          >
            <p className="chapter">{chapter.chapterNumber}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Chapters;
