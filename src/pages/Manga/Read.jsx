/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { GetMangaDetails, GetMangaPages } from "../../hooks/useApi";
import { fetchTheme } from "../../providers/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Read() {
  const { id, method, mangaId, mangaChapter } = useParams();
  const [data, setData] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const { toggleHeader, setToggleHeader } = fetchTheme();
  const [title, setTitle] = useState(null);
  const [chapter, setChapter] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (method === "MangaId") {
          const metaData = await GetMangaDetails(id);
          setMetaData(metaData);
          if (metaData) {
            const mangaData = await GetMangaPages(metaData.chapters[0].id);
            setData(mangaData);
            setTitle(
              metaData.title.english ||
              metaData.title.romaji ||
              metaData.title.userPreferred ||
              "??"
            );
            setChapter(parseInt(metaData.chapters[0].chapterNumber));
          }
        } else if (method === "ChapterId") {
          const mangaData = await GetMangaPages(id);
          const metaData = await GetMangaDetails(mangaId);
          setTitle(
            metaData.title.english ||
            metaData.title.romaji ||
            metaData.title.userPreferred ||
            "??"
          );
          setData(mangaData);
          setMetaData(metaData);
          setChapter(parseInt(mangaChapter));
        } else {
          const mangaData = await GetMangaPages(id);
          setTitle(method);
          setData(mangaData);
        }
      } catch (error) {
        setError("Failed to load manga data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    setToggleHeader(false);
    return () => setToggleHeader(true);
  }, [id, method, mangaId, mangaChapter, setToggleHeader]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [title, chapter]);

  const handleClick = () => {
    setChapter((count) => count + 1);
  };

  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const currentChapterData = useMemo(() => {
    return metaData?.chapters?.[chapter];
  }, [metaData, chapter]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="reading-body">
      <h1>{title}</h1>
      <h3>Chapter {chapter}</h3>
      <div className="pages-container">
        {data.map((chapterPage) => (
          <img
            key={chapterPage.page}
            src={chapterPage.img}
            alt={`Page ${chapterPage.page}`}
          />
        ))}
      </div>
      <div onClick={handleClick} className="chapters-navigator">
        {currentChapterData && (
          <Link to={`/manga/read/${currentChapterData.id}/${title}`}>
            <button>Chapter {chapter + 1} &gt;</button>
          </Link>
        )}
      </div>
      <button onClick={handleSideBar} className="sidebar-toggle">
        <FontAwesomeIcon icon={isSideBarOpen ? faXmark : faBars} />
      </button>
      <div
        style={{
          transform: isSideBarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out"
        }}
        className="sidebar"
      >
        <h2>Chapters</h2>
        {metaData?.chapters.map((chapterItem, index) => (
          <Link to={`/manga/read/${chapterItem.id}/ChapterId/${metaData.id}/${chapterItem.chapterNumber}`} >
          <button key={chapterItem.id}>{chapterItem.chapterNumber || index}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Read;
