import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useMetadata } from './MetadataContext';
import { useThemeContext } from './ThemeContext';
import { useLocation } from 'react-router-dom';

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
  const [activeFranchise, setActiveFranchise] = useState(null); // For filtering movies

  // Track if we've initialized the current movie for this franchise
  const initializedFranchiseRef = useRef(null);

  const { setDescription, setKeywords } = useMetadata();
  const { setCurrentFranchise } = useThemeContext();
  const location = useLocation();

  const apiUrl = process.env.REACT_APP_API_URL;

  const currentFranchise = useMemo(() => {
    const pathFranchise = location.pathname.slice(1);
    return VALID_FRANCHISES.includes(pathFranchise) ? pathFranchise : null;
  }, [location.pathname]);

  const isLandingPage = useMemo(() => {
    return location.pathname === '/';
  }, [location.pathname]);

  const pageMovies = useMemo(() => {
    if (!movies.length) return [];

    // Filter by active franchise (works on both landing and franchise pages)
    if (activeFranchise) {
      return movies.filter((movie) => movie.brand === activeFranchise);
    }

    return [];
  }, [activeFranchise, movies]);

  // Display franchise: only set on franchise pages, null on landing (for text/labels)
  const displayFranchise = useMemo(() => {
    return isLandingPage ? null : currentFranchise;
  }, [isLandingPage, currentFranchise]);

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

  const fetchMovies = useCallback(
    async (signal) => {
      try {
        setError(null);

        const response = await fetch(`${apiUrl}api/movies`, {
          signal: signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching movies:', err);
          setError(err.message);
          setMovies([]);
        }
      }
    },
    [apiUrl]
  );

  // Stable updateMovie function - only updates activeFranchise if it changed
  const updateMovie = useCallback(
    (movie) => {
      if (!movie) return;

      setCurrentMovie(movie);
      setCurrentPhase(movie.phase);
      setDescription(`${movie.title} out at ${movie.releaseDate}`);
      setKeywords(movie.title);

      // Only set active franchise if it's different to prevent unnecessary re-renders
      if (movie.brand) {
        setActiveFranchise((prev) =>
          prev === movie.brand ? prev : movie.brand
        );
      }
    },
    [setDescription, setKeywords]
  );

  // Function to manually set a specific movie
  const setSelectedMovie = useCallback(
    (movie) => {
      if (movie) {
        updateMovie(movie);
      }
    },
    [updateMovie]
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

  // Fetch movies on mount with cleanup
  useEffect(() => {
    const controller = new AbortController();
    fetchMovies(controller.signal);

    return () => controller.abort();
  }, [fetchMovies]);

  // Handle landing page: set movie and active franchise but NOT theme
  useEffect(() => {
    if (movies.length > 0 && isLandingPage) {
      // Clear theme on landing page
      setCurrentFranchise(null);

      // Get the newest upcoming movie across all franchises
      let nextMovie = getNewestUpcomingMovie(movies);

      // If no upcoming movies, get the most recent movie
      if (!nextMovie) {
        nextMovie = getMostRecentMovie(movies);
      }

      if (nextMovie) {
        // Set the current movie (which will also set activeFranchise for filtering)
        updateMovie(nextMovie);
      }
    }
  }, [
    movies,
    isLandingPage,
    getNewestUpcomingMovie,
    getMostRecentMovie,
    updateMovie,
    setCurrentFranchise,
  ]);

  // Update current movie when franchise page changes
  useEffect(() => {
    // Only update if we're on a franchise page and franchise changed
    if (!isLandingPage && currentFranchise && movies.length > 0) {
      // Only initialize if we haven't for this franchise yet
      if (initializedFranchiseRef.current !== currentFranchise) {
        initializedFranchiseRef.current = currentFranchise;

        // Set active franchise
        setActiveFranchise(currentFranchise);

        // Get movies for this franchise
        const franchiseMovies = movies.filter(
          (movie) => movie.brand === currentFranchise
        );

        // First try to get the newest upcoming movie from this franchise
        let targetMovie = getNewestUpcomingMovie(franchiseMovies);

        // If no upcoming movies, get the most recent movie from this franchise
        if (!targetMovie) {
          targetMovie = getMostRecentMovie(franchiseMovies);
        }

        if (targetMovie) {
          updateMovie(targetMovie);
        }
      }
    }
  }, [
    currentFranchise,
    movies,
    isLandingPage,
    getNewestUpcomingMovie,
    getMostRecentMovie,
    updateMovie,
  ]);

  // Set display franchise for theme (only on franchise pages)
  useEffect(() => {
    if (!isLandingPage) {
      if (displayFranchise) {
        setCurrentFranchise(displayFranchise);
      }
    }
  }, [displayFranchise, setCurrentFranchise, isLandingPage]);

  // Reset initialized ref when leaving franchise page
  useEffect(() => {
    if (isLandingPage) {
      initializedFranchiseRef.current = null;
    }
  }, [isLandingPage]);

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
      displayFranchise,
      activeFranchise,
      isLandingPage,
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
      displayFranchise,
      activeFranchise,
      isLandingPage,
    ]
  );

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
