import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetMangaDetails, GetMangaPages } from "../../hooks/useApi";
import { fetchTheme } from "../../providers/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOut, faXmark } from "@fortawesome/free-solid-svg-icons";

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
  const [chaptersData, setChaptersData] = useState(null);
  const navigate = useNavigate();

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
            setChaptersData(metaData.chapters.filter(e => e.pages > 0));
          }
        } else if (method === "ChapterId") {
          const MangaData = await GetMangaPages(id);
          const MetaData = await GetMangaDetails(mangaId);
          if (MetaData && MangaData) {
            setTitle(
              MetaData.title.english ||
              MetaData.title.romaji ||
              MetaData.title.userPreferred ||
              "??"
            );
            setData(MangaData);
            setMetaData(MetaData);
            setChapter(parseInt(mangaChapter));
            setChaptersData(MetaData.chapters.filter(e => e.pages > 0));
          }
        } else {
          const mangaData = await GetMangaPages(id);
          setTitle(method);
          setData(mangaData);
          setChapter(parseInt(mangaChapter));
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

  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const SkeletonLoader = () => (
    <div className="skeleton-container">
      {Array.from({ length: chaptersData?.[chapter - 1]?.pages || 0 }, (_, index) => (
        <div key={index} className="skeleton-page"></div>
      ))}
    </div>
  );

  if (isLoading && !metaData) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="reading-body">
      <h1>{title}</h1>
      <h3>Chapter {chaptersData[chapter - 1].chapterNumber}</h3>
      <div className="chapters-navigator">
        <div className="prevbutton">
          <Link
            to={`/manga/read/${metaData.chapters[chapter - 2]?.id}/ChapterId/${
              metaData.id
            }/${chapter - 1}`}
          >
            <button
              onClick={() => setChapter(chapter - 1)}
              disabled={chapter < 2}
              style={{
                filter: chapter < 2 ? "brightness(0.4)" : "brightness(1)",
              }}
            >
              Prev Chapter
            </button>
          </Link>
        </div>

        <div className="nextbutton">
          <Link
            to={`/manga/read/${metaData.chapters[chapter]?.id}/ChapterId/${
              metaData.id
            }/${chapter + 1}`}
          >
            <button
              onClick={() => setChapter(chapter + 1)}
              disabled={chapter >= metaData.chapters.length}
              style={{
                filter:
                  chapter >= metaData.chapters.length
                    ? "brightness(0.4)"
                    : "brightness(1)",
              }}
            >
              Next Chapter
            </button>
          </Link>
        </div>
      </div>
      <div className="pages-container">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          data?.map((chapterPage, index) => (
            <img
              className={`${index == 0 ? 'top-rounded' : (index == data.length - 1 ? 'bottom-rounded' : '')}`}
              key={chapterPage.page}
              src={chapterPage.img}
              alt={`Page ${chapterPage.page}`}
            />
          ))
        )}
      </div>
      <div className="chapters-navigator">
        <div className="prevbutton">
          <Link
            to={`/manga/read/${metaData.chapters[chapter - 2]?.id}/ChapterId/${
              metaData.id
            }/${chapter - 1}`}
          >
            <button
              onClick={() => setChapter(chapter - 1)}
              disabled={chapter < 2}
              style={{
                filter: chapter < 2 ? "brightness(0.4)" : "brightness(1)",
              }}
            >
              Prev Chapter
            </button>
          </Link>
        </div>

        <div className="nextbutton">
          <Link
            to={`/manga/read/${metaData.chapters[chapter]?.id}/ChapterId/${
              metaData.id
            }/${chapter + 1}`}
          >
            <button
              onClick={() => setChapter(chapter + 1)}
              disabled={chapter >= metaData.chapters.length}
              style={{
                filter:
                  chapter >= metaData.chapters.length
                    ? "brightness(0.4)"
                    : "brightness(1)",
              }}
            >
              Next Chapter
            </button>
          </Link>
        </div>
      </div>
      <button onClick={handleSideBar} className="sidebar-toggle">
        <FontAwesomeIcon icon={isSideBarOpen ? faXmark : faBars} />
      </button>
      <div
        style={{
          transform: isSideBarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
        className="sidebar"
      >
        <FontAwesomeIcon onClick={() => navigate(`/manga/details/${metaData.id}`)} className="exit" icon={faSignOut} />
        <h2>Chapters</h2>
        {chaptersData?.map((chapterItem, index) => (
          <Link
            key={chapterItem.id}
            to={`/manga/read/${chapterItem.id}/ChapterId/${metaData.id}/${chapterItem.chapterNumber}`}
          >
            <button>{chapterItem.chapterNumber || index + 1}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Read;
