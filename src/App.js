import React, { useEffect, useState } from 'react';
import { KEY } from './util/api';
import axios from 'axios';

import MovieList from './components/MovieList';

import './index.css';

function App() {
  const [page, setPage] = useState(2);
  const [allMovies, setAllMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {
    let movieDiscoverList = [];
    for (let i = 1; i < page; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}`
        )
        .then(res => {
          for (let x = 0; x < res.data.results.length; x++) {
            movieDiscoverList.push(res.data.results[x]);
            setAllMovies([...movieDiscoverList]);
          }
        });
    }
  }, [page]);

  const getDetailsFromIds = () => {
    selectedMovies.forEach(id => {
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US&append_to_response=credits`).then(res => {
        console.log(res.data.title);
      });
    });
  };

  const handleLoadMore = () => {
    setPage(page + 2);
  };

  const handleClear = () => {
    setSelectedMovies([]);
  };

  return (
    <div>
      <button onClick={getDetailsFromIds}>SHOW SELECTED</button>
      <button onClick={handleClear}>CLEAR SELECTED</button>
      <MovieList allMovies={allMovies} selectedMovies={selectedMovies} setSelectedMovies={setSelectedMovies} />
      <button onClick={handleLoadMore}>LOAD MORE</button>
    </div>
  );
}

export default App;