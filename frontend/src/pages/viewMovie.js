import { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { useThemeContext } from '../context/ThemeContext';
import FranchiseNavigation from '../components/navigation/FranchiseNavigation';
import NextMovieDisplay from '../components/movie/NextMovieDisplay';
import MovieTrailer from '../components/movie/MovieTrailer';
import PhaseSelector from '../components/movie/PhaseSelector';
import MovieList from '../components/movie/MovieList';

const MoviePage = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const { currentMovie, updateMovie, phases, pageMovies, getCurrentMovie } =
    useMovieContext();
  const { hoveredFranchise } = useThemeContext();

  useEffect(() => {
    if (currentMovie?.phase) {
      setSelectedPhase(currentMovie.phase);
    }
  }, [currentMovie?.phase]);

  const handleMovieClick = (movie) => {
    updateMovie(movie);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <main>
      <section className="bg-accent pt-16">
        <div className="max-w-6xl mx-auto py-12">
          <div className="font-roboto-condensed mb-12">
            <div>
              <FranchiseNavigation />
              <h1 className="text-title-lg font-medium text-secondary drop-shadow-md">
                NEXT {hoveredFranchise ? hoveredFranchise.toUpperCase() : ''}{' '}
                MOVIE
              </h1>
            </div>
            <NextMovieDisplay key={currentMovie?._id} movie={currentMovie} />
            <MovieTrailer movie={currentMovie} />
          </div>
        </div>
      </section>

      <section
        id="movies"
        className="bg-primary font-roboto-condensed pt-12 pb-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-secondary">
            <h2 className="text-title-lg font-medium tracking-wide pb-1">
              Other movies
            </h2>
            <PhaseSelector
              phases={phases}
              selectedPhase={selectedPhase}
              onPhaseSelect={setSelectedPhase}
            />

            <MovieList
              movies={pageMovies}
              selectedPhase={selectedPhase}
              currentMovieId={currentMovie?._id}
              onMovieClick={handleMovieClick}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MoviePage;
