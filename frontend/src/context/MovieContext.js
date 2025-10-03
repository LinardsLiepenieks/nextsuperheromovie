import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useThemeContext } from './ThemeContext';
import { useLoadingContext } from './LoadingContext';
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
  const [activeFranchise, setActiveFranchise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const initializedFranchiseRef = useRef(null);

  const { setCurrentFranchise } = useThemeContext();
  const { finishInitialLoad } = useLoadingContext();
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

    if (activeFranchise) {
      return movies.filter((movie) => movie.brand === activeFranchise);
    }

    return [];
  }, [activeFranchise, movies]);

  const displayFranchise = useMemo(() => {
    return isLandingPage ? null : currentFranchise;
  }, [isLandingPage, currentFranchise]);

  const phases = useMemo(() => {
    if (!pageMovies.length) return [];
    const phaseSet = new Set(pageMovies.map((movie) => movie.phase));
    return Array.from(phaseSet).sort((a, b) => {
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return bNum - aNum;
      }
      return b.localeCompare(a);
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

  const getNewestUpcomingMovie = useCallback((movieList) => {
    if (!movieList?.length) return null;

    const today = new Date();
    const upcomingMovies = movieList
      .filter((movie) => new Date(movie.releaseDate) > today)
      .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

    return upcomingMovies[0] || null;
  }, []);

  const getMostRecentMovie = useCallback((movieList) => {
    if (!movieList?.length) return null;

    const sortedMovies = [...movieList].sort(
      (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
    );

    return sortedMovies[0];
  }, []);

  const fetchMovies = useCallback(
    async (signal) => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl]
  );

  const updateMovie = useCallback(
    (movie) => {
      if (!movie) return;

      setCurrentMovie(movie);
      setCurrentPhase(movie.phase);

      if (movie.brand) {
        setActiveFranchise(movie.brand);
      }

      finishInitialLoad();
    },
    [finishInitialLoad]
  );

  const setSelectedMovie = useCallback(
    (movie) => {
      if (movie) {
        updateMovie(movie);
      }
    },
    [updateMovie]
  );

  const switchToPhase = useCallback(
    (phase) => {
      if (!moviesByPhase[phase] || !moviesByPhase[phase].length) return;

      const phaseMovie = getMostRecentMovie(moviesByPhase[phase]);
      if (phaseMovie) {
        updateMovie(phaseMovie);
      }
    },
    [moviesByPhase, getMostRecentMovie, updateMovie]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchMovies(controller.signal);

    return () => controller.abort();
  }, [fetchMovies]);

  useEffect(() => {
    if (movies.length > 0 && isLandingPage) {
      let nextMovie = getNewestUpcomingMovie(movies);

      if (!nextMovie) {
        nextMovie = getMostRecentMovie(movies);
      }

      if (nextMovie) {
        updateMovie(nextMovie);
      }
    }
  }, [
    movies,
    isLandingPage,
    getNewestUpcomingMovie,
    getMostRecentMovie,
    updateMovie,
  ]);

  useEffect(() => {
    if (!isLandingPage && currentFranchise && movies.length > 0) {
      initializedFranchiseRef.current = currentFranchise;
      setActiveFranchise(currentFranchise);

      const franchiseMovies = movies.filter(
        (movie) => movie.brand === currentFranchise
      );

      let targetMovie = getNewestUpcomingMovie(franchiseMovies);

      if (!targetMovie) {
        targetMovie = getMostRecentMovie(franchiseMovies);
      }

      if (targetMovie) {
        updateMovie(targetMovie);
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

  useEffect(() => {
    if (displayFranchise) {
      setCurrentFranchise(displayFranchise);
    } else if (isLandingPage) {
      setCurrentFranchise('marvel');
    }
  }, [displayFranchise, setCurrentFranchise, isLandingPage]);

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
      isLoading,
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
      isLoading,
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
