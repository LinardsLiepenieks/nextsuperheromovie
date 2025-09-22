import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useMetadata } from './MetadataContext';
import { useThemeContext } from './ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

const VALID_FRANCHISES = ['marvel', 'dc', 'sony'];

const MovieContext = createContext(null);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(null);
  const [error, setError] = useState(null);

  const { setDescription, setKeywords } = useMetadata();
  const { setCurrentFranchise } = useThemeContext();
  const location = useLocation();
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const currentFranchise = useMemo(() => {
    const pathFranchise = location.pathname.slice(1);
    return VALID_FRANCHISES.includes(pathFranchise) ? pathFranchise : null;
  }, [location.pathname]);

  const pageMovies = useMemo(() => {
    if (!currentFranchise || !movies.length) return [];
    return movies.filter((movie) => movie.brand === currentFranchise);
  }, [currentFranchise, movies]);

  const phases = useMemo(() => {
    if (!pageMovies.length) return [];
    const phaseSet = new Set(pageMovies.map((movie) => movie.phase));
    return Array.from(phaseSet).sort((a, b) => {
      // Handle numeric phases (1, 2, 3) and string phases - sort in DECREASING order
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return bNum - aNum; // Reversed for decreasing order
      }
      return b.localeCompare(a); // Reversed for decreasing order
    });
  }, [pageMovies]);

  const moviesByPhase = useMemo(() => {
    if (!pageMovies.length) return {};
    return pageMovies.reduce((acc, movie) => {
      if (!acc[movie.phase]) {
        acc[movie.phase] = [];
      }
      acc[movie.phase].push(movie);
      return acc;
    }, {});
  }, [pageMovies]);

  // Get the newest upcoming movie from the franchise
  const getNewestUpcomingMovie = useCallback((movieList) => {
    if (!movieList?.length) return null;

    const today = new Date();
    const upcomingMovies = movieList
      .filter((movie) => new Date(movie.releaseDate) > today)
      .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

    return upcomingMovies[0] || null;
  }, []);

  // Get the most recent movie from the franchise (released or upcoming)
  const getMostRecentMovie = useCallback((movieList) => {
    if (!movieList?.length) return null;

    // Sort by release date, newest first
    const sortedMovies = [...movieList].sort(
      (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
    );

    return sortedMovies[0];
  }, []);

  const fetchMovies = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch(`${apiUrl}api/movies`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError(err.message);
      setMovies([]);
    }
  }, [apiUrl]);

  const updateMovie = useCallback(
    (movie) => {
      if (!movie) return;

      setCurrentMovie(movie);
      setCurrentPhase(movie.phase);
      setDescription(`${movie.title} out at ${movie.releaseDate}`);
      setKeywords(movie.title);
    },
    [setDescription, setKeywords]
  );

  // Function to manually set a specific movie
  const setSelectedMovie = useCallback(
    (movie) => {
      if (movie && movie.brand === currentFranchise) {
        updateMovie(movie);
      }
    },
    [currentFranchise, updateMovie]
  );

  // Function to switch to a different phase
  const switchToPhase = useCallback(
    (phase) => {
      if (!moviesByPhase[phase] || !moviesByPhase[phase].length) return;

      // Get the most recent movie from this phase
      const phaseMovie = getMostRecentMovie(moviesByPhase[phase]);
      if (phaseMovie) {
        updateMovie(phaseMovie);
      }
    },
    [moviesByPhase, getMostRecentMovie, updateMovie]
  );

  // Fetch movies on mount
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Set theme based on current franchise
  useEffect(() => {
    if (currentFranchise) {
      setCurrentFranchise(currentFranchise);
    }
  }, [currentFranchise, setCurrentFranchise]);

  // Handle initial redirect when no franchise is selected
  useEffect(() => {
    if (movies.length > 0 && !currentFranchise) {
      // Get the newest upcoming movie across all franchises
      const nextMovie = getNewestUpcomingMovie(movies);
      if (nextMovie?.brand && VALID_FRANCHISES.includes(nextMovie.brand)) {
        navigate(`/${nextMovie.brand}`, { replace: true });
      } else {
        // If no upcoming movies, get the most recent movie
        const recentMovie = getMostRecentMovie(movies);
        if (
          recentMovie?.brand &&
          VALID_FRANCHISES.includes(recentMovie.brand)
        ) {
          navigate(`/${recentMovie.brand}`, { replace: true });
        }
      }
    }
  }, [
    movies,
    currentFranchise,
    getNewestUpcomingMovie,
    getMostRecentMovie,
    navigate,
  ]);

  // Update current movie when franchise changes (this is the key fix)
  useEffect(() => {
    if (currentFranchise && pageMovies.length > 0) {
      // First try to get the newest upcoming movie from this franchise
      let targetMovie = getNewestUpcomingMovie(pageMovies);

      // If no upcoming movies, get the most recent movie from this franchise
      if (!targetMovie) {
        targetMovie = getMostRecentMovie(pageMovies);
      }

      if (targetMovie) {
        updateMovie(targetMovie);
      }
    }
  }, [
    currentFranchise,
    pageMovies,
    getNewestUpcomingMovie,
    getMostRecentMovie,
    updateMovie,
  ]);

  const contextValue = useMemo(
    () => ({
      movies,
      currentMovie,
      currentPhase,
      pageMovies,
      phases,
      moviesByPhase,
      error,
      updateMovie,
      setSelectedMovie,
      switchToPhase,
      getNewestUpcomingMovie,
      getMostRecentMovie,
      currentFranchise,
    }),
    [
      movies,
      currentMovie,
      currentPhase,
      pageMovies,
      phases,
      moviesByPhase,
      error,
      updateMovie,
      setSelectedMovie,
      switchToPhase,
      getNewestUpcomingMovie,
      getMostRecentMovie,
      currentFranchise,
    ]
  );

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
