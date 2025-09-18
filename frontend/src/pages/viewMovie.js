import { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { useThemeContext } from '../context/ThemeContext';
import MovieListItem from '../components/movieListItem';
import FranchiseNavigation from '../components/navigation/FranchiseNavigation';
import NextMovieDisplay from '../components/movie/NextMovieDisplay';
import MovieTrailer from '../components/movie/MovieTrailer';

const MoviePage = () => {
  const [selectedPhase, setSelectedPhase] = useState();
  const { currentMovie, updateMovie, phases, pageMovies, getCurrentMovie } =
    useMovieContext();
  const { hoveredFranchise } = useThemeContext();

  return (
    <main className="">
      <section className="bg-accent pt-16">
        <div className="max-w-6xl mx-auto py-12">
          <div className="font-roboto-condensed mb-12">
            <div>
              <FranchiseNavigation></FranchiseNavigation>
              <h1 className="text-title-lg font-medium  text-secondary drop-shadow-md">
                NEXT {hoveredFranchise ? hoveredFranchise.toUpperCase() : ''}{' '}
                MOVIE
              </h1>
            </div>
            <NextMovieDisplay movie={currentMovie}></NextMovieDisplay>
            <MovieTrailer movie={currentMovie}></MovieTrailer>
          </div>
        </div>
      </section>
      <section id="movies" className="viewMovies">
        <div className="container">
          <div className="ad-vertical"></div>
          <div className="movie-list-group">
            <h2>Other movies</h2>
            <div className="movie-list-nav">
              <ul>
                {phases ? (
                  phases.map((phase) => (
                    <li key={phase} onClick={() => setSelectedPhase(phase)}>
                      {phase}
                    </li>
                  ))
                ) : (
                  <span></span>
                )}
              </ul>
            </div>
            <div className="movie-list">
              <ul>
                {pageMovies && pageMovies.length ? (
                  pageMovies
                    .filter(
                      (currentMovie) =>
                        selectedPhase === null ||
                        currentMovie.phase === selectedPhase
                    )

                    .sort(
                      (a, b) =>
                        new Date(a.releaseDate) + new Date(b.releaseDate)
                    )
                    .map((movie) => (
                      <MovieListItem
                        key={movie._id}
                        movie={movie}
                        isActive={movie._id === currentMovie._id}
                        onClick={() => {}}
                      />
                    ))
                ) : (
                  <span>No movies</span>
                )}
              </ul>
            </div>
          </div>
          <div className="ad-vertical"></div>
        </div>
      </section>
    </main>
  );
};

export default MoviePage;
