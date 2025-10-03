import { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import FranchiseNavigation from '../components/navigation/FranchiseNavigation';
import NextMovieDisplay from '../components/movie/NextMovieDisplay';
import MovieTrailer from '../components/movie/MovieTrailer';
import PhaseSelector from '../components/movie/PhaseSelector';
import MovieList from '../components/movie/MovieList';
import LandingDotsTop from '../components/backgrounds/landingDotsTop';
import LandingDotsMid from '../components/backgrounds/landingDotsMid';

const MoviePage = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const {
    currentMovie,
    updateMovie,
    phases,
    pageMovies,
    currentFranchise,
    isLandingPage,
    isLoading,
  } = useMovieContext();

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
    <main className="overflow-hidden">
      <section className="bg-accent pt-16 transition-colors duration-150 ease relative px-8 xl:px-0">
        <div className="relative max-w-6xl mx-auto py-12">
          <LandingDotsTop />
          <LandingDotsMid />

          <div className="font-roboto-condensed lg:mb-12">
            <div>
              <FranchiseNavigation />

              <div className="relative">
                <h1 className="relative text-2xl lg:text-title-lg font-medium text-secondary drop-shadow-md transition-colors duration-150 ease mt-8 lg:mt-4 z-10">
                  NEXT{' '}
                  {currentFranchise && !isLandingPage
                    ? currentFranchise.toUpperCase()
                    : 'SUPERHERO'}{' '}
                  MOVIE:
                </h1>
              </div>
            </div>

            <NextMovieDisplay movie={currentMovie} isLoading={isLoading} />

            <div className="w-screen xl:w-full aspect-video -mx-8 xl:mx-0 pt-4 lg:pt-0">
              <MovieTrailer movie={currentMovie} />
            </div>
          </div>
        </div>
      </section>

      <section
        id="movies"
        className="bg-primary font-roboto-condensed pt-12 pb-12 xl:px-0 px-8 z-20 relative"
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
