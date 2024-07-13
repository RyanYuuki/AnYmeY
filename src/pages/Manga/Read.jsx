/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetMangaDetails, GetMangaPages } from "../../hooks/useApi";
import { fetchTheme } from "../../providers/ThemeProvider";
import ChapterNavigator from "../../components/Manga/ChapterNavigator";
function Read() {
  const { id, method } = useParams();
  const [data, setData] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const { toggleHeader, setToggleHeader } = fetchTheme();
  const [title, setTitle] = useState(null);
  const [Chapter, setChapter] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (method === "MangaId") {
          const MetaData = await GetMangaDetails(id);
          setMetaData(MetaData);
          if (MetaData) {
            const Mangadata = await GetMangaPages(MetaData.chapters[0].id);
            setData(Mangadata);
            setTitle(
              MetaData.title.english ||
                MetaData.title.romaji ||
                MetaData.title.userPreffered ||
                "??"
            );
            setChapter(parseInt(MetaData.chapters[0].chapterNumber));
          }
        } else {
          const Mangadata = await GetMangaPages(id);
          setTitle(method);
          setData(Mangadata);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    setToggleHeader(false);
    return () => setToggleHeader(true);
  }, [id, method, setToggleHeader]);

  useEffect(() => {
    console.log(Chapter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [title, Chapter]);

  const handleClick = () => {
    setChapter((count) => count + 1);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="reading-body">
      <h1>{title}</h1>
      <h3>Chapter{" " + Chapter}</h3>
      <div className="pages-container">
        {data &&
          data.map((chapter) => (
            <img
              key={chapter.page}
              src={chapter.img}
              alt={`Page ${chapter.page}`}
            />
          ))}
      </div>
      <div onClick={handleClick} className="chapters-navigator">
        <Link
          to={`/manga/read/${metaData.chapters[Chapter + 1].id}/${title}`}
        >
          <button>Chapter {Chapter + 1 + ' >'}</button>
        </Link>
      </div>
    </div>
  );
}

export default Read;
