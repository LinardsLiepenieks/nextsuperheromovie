import MovieListItem from './MovieListItem';
import { useState, useEffect, useRef, useMemo } from 'react';

const MovieList = ({ movies, selectedPhase, currentMovieId, onMovieClick }) => {
  const [height, setHeight] = useState('auto');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const listRef = useRef(null);
  const prevPhaseRef = useRef(selectedPhase);

  const filteredMovies = useMemo(() => {
    if (!movies || !movies.length) {
      return [];
    }

    return movies
      .filter(
        (movie) => selectedPhase === null || movie.phase === selectedPhase
      )
      .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }, [movies, selectedPhase]);

  // Handle phase change transitions
  useEffect(() => {
    // Check if phase actually changed (not just initial load)
    if (
      prevPhaseRef.current !== selectedPhase &&
      prevPhaseRef.current !== null
    ) {
      setIsTransitioning(true);

      // Fade out current movies
      setTimeout(() => {
        setDisplayedMovies(filteredMovies);
        setIsTransitioning(false);
      }, 100); // Half of the transition duration
    } else {
      // Initial load or no phase change
      setDisplayedMovies(filteredMovies);
    }

    prevPhaseRef.current = selectedPhase;
  }, [filteredMovies, selectedPhase]);

  // Update height when displayed movies change
  useEffect(() => {
    if (listRef.current) {
      const actualHeight = listRef.current.scrollHeight;
      setHeight(actualHeight);
    }
  }, [displayedMovies.length, selectedPhase]);

  if (displayedMovies.length === 0 && !isTransitioning) {
    return <span>No movies</span>;
  }

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out will-change-contents"
      style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
    >
      <ul
        ref={listRef}
        className={`text-3xl font-normal flex-col gap-6 flex py-12 transition-opacity duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {displayedMovies.map((movie) => (
          <MovieListItem
            key={movie._id}
            movie={movie}
            isActive={movie._id === currentMovieId}
            onClick={() => {
              onMovieClick(movie);
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
