import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useLoading } from './LoadingContext';
import { useMetadata } from './MetadataContext';
import { useThemeContext } from './ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [pageMovies, setPageMovies] = useState(null);
  const [phases, setPhases] = useState(null);
  const { setLoading } = useLoading();
  const { setDescription, setKeywords } = useMetadata();
  const { setCurrentFranchise } = useThemeContext();
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const navigate = useNavigate();

  // Get franchise from URL path
  const currentFranchise = location.pathname.slice(1);

  // Filters and sets current movie
  const getCurrentMovie = useCallback((data) => {
    const today = new Date();
    const upcomingMovies = data.filter(
      (movie) => new Date(movie.releaseDate) > today
    );

    upcomingMovies.sort(
      (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
    );

    return upcomingMovies[0];
  }, []);

  // Fetches movies from api
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}api/movies`);
      const data = await response.json();

      if (data.length > 0) {
        setMovies(data);
      } else {
        setMovies(['ELSE']);
      }
    } catch (error) {
      console.error('Error fetching /api/movies ', error);
      setMovies(['ERROR']);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, setLoading]);

  // Fetch all movies from db
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Update movie metadata
  const updateMovie = useCallback(
    (movie) => {
      if (movie) {
        setCurrentMovie(movie);
        setDescription(movie.title + ' out at ' + movie.releaseDate);
        setKeywords(movie.title);
      }
    },
    [setDescription, setKeywords]
  );

  // Set theme based on URL path
  useEffect(() => {
    if (
      currentFranchise &&
      ['marvel', 'dc', 'sony'].includes(currentFranchise)
    ) {
      setCurrentFranchise(currentFranchise);
    }
  }, [currentFranchise, setCurrentFranchise]);

  // Initial movie load - redirect to appropriate franchise URL
  useEffect(() => {
    if (
      movies &&
      movies.length > 0 &&
      (!currentFranchise || currentFranchise === '')
    ) {
      // Get the next upcoming movie
      const nextMovie = getCurrentMovie(movies);
      if (nextMovie && nextMovie.brand) {
        // Redirect to the franchise page
        navigate(`/${nextMovie.brand}`, { replace: true });
      }
    }
  }, [movies, currentFranchise, getCurrentMovie, navigate]);

  // Filter movies by franchise when URL changes
  useEffect(() => {
    if (currentFranchise && movies && movies.length > 0) {
      const filteredMovies = movies.filter(
        (movie) => movie.brand === currentFranchise
      );

      setPageMovies(filteredMovies);

      // Create unique phases
      const phaseSet = new Set();
      filteredMovies.forEach((movie) => {
        phaseSet.add(movie.phase);
      });
      setPhases(Array.from(phaseSet));

      // Set current movie for this franchise
      const nextMovie = getCurrentMovie(filteredMovies);
      if (nextMovie) {
        updateMovie(nextMovie);
      }
    }
  }, [currentFranchise, movies, getCurrentMovie, updateMovie]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        currentMovie,
        updateMovie,
        phases,
        pageMovies,
        getCurrentMovie,
        setCurrentMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
