/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import reactSelect from 'react-select';
import './css/Search.css';
function Search() {
  
  const [searchValue, setSearchValue] = useState(null);
  const [year, setYear] = useState(null);
  const [season, setSeason] = useState(null);
  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);
  const [genre, setGenres] = useState(null);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1990; year--) {
      years.push({ value: year, label: year.toString() });
    }
    return years;
  };

  const yearOptions = generateYearOptions();

  const seasonOptions = [
    { value: "winter", label: "Winter" },
    { value: "spring", label: "Spring" },
    { value: "summer", label: "Summer" },
    { value: "fall", label: "Fall" },
  ];

  const typeOptions = [
    { value: "tv", label: "TV" },
    { value: "ova", label: "OVA" },
    { value: "movie", label: "Movie" },
    { value: "special", label: "Special" },
  ];

  const statusOptions = [
    { value: "airing", label: "Airing" },
    { value: "completed", label: "Completed" },
    { value: "upcoming", label: "Upcoming" },
  ];

  const genreOptions = [
    { value: "action", label: "Action" },
    { value: "adventure", label: "Adventure" },
    { value: "comedy", label: "Comedy" },
    { value: "drama", label: "Drama" },
    { value: "fantasy", label: "Fantasy" },
    { value: "horror", label: "Horror" },
    // Add more genres as needed
  ];

  return (
    <div className='search-body'>
        <div className="search-option"></div>
        <div className="search-option"></div>
        <div className="search-option"></div>
        <div className="search-option"></div>
        <div className="search-option"></div>
    </div>
  )
}

export default Search