/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetMangaPages } from "../../hooks/useApi";
import { fetchTheme } from "../../providers/ThemeProvider";
function Read() {
  const { id, title, chapter } = useParams();
  const [data, setData] = useState(null);
  const { toggleHeader, setToggleHeader } = fetchTheme();
  useEffect(() => {
    const fetchData = async () => {
      const Mangadata = await GetMangaPages(id);
      setData(Mangadata);
    };
    fetchData();
    setToggleHeader(false);
    return () => setToggleHeader(true);
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="reading-body">
      <h1>{title}</h1>
      <h3>Chapter{' ' + chapter}</h3>
      <div className="pages-container">
        {data.map((chapter) => (
          <img key={chapter.page} src={chapter.img} alt={chapter.page} />
        ))}
      </div>
      
    </div>
  );
}

export default Read;
