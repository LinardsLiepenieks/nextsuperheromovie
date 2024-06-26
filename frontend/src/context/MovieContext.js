import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from "react";
import { useLoading } from "./LoadingContext";
import { useMetadata } from "./MetadataContext";
import { useThemeContext } from "./ThemeContext";
import { useLocation } from "react-router-dom";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
	const [movies, setMovies] = useState(null); // all movies so don't have to re-fetch
	const [currentMovie, setCurrentMovie] = useState(null); //current diplayed movie
	const [pageMovies, setPageMovies] = useState(null); //movies for brand filtering
	const [phases, setPhases] = useState(null); //phases or years
	const { setLoading } = useLoading();
	const { setDescription, setKeywords } = useMetadata();
	const { hoveredFranchise, setHoveredFranchise } = useThemeContext();
	const apiUrl = process.env.REACT_APP_API_URL;

	const location = useLocation();

	//filters and sets current movie
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
	//fetches movies from api
	const fetchMovies = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(`${apiUrl}api/movies`);

			const data = await response.json();

			if (data.length > 0) {
				setMovies(data);
			} else {
				setMovies([]);
			}
		} catch (error) {
			console.error("Error fetching /api/movies ", error);
			setMovies([]);
			// Display an error message or handle the error in a user-friendly way
		} finally {
			setLoading(false);
		}
	}, [apiUrl, setLoading]);

	//fetches all movies from db
	useEffect(() => {
		fetchMovies();
	}, [fetchMovies]);

	const updateMovie = useCallback(
		(movie) => {
			if (movie) {
				setCurrentMovie(movie);
				setDescription(movie.title + " out at " + movie.releaseDate);
				setKeywords(movie.title);
			}
		},
		[setDescription, setKeywords]
	);

	useEffect(() => {
		const filterByFranchise = () => {
			setHoveredFranchise(location.pathname.slice(1));

			if (hoveredFranchise && movies && movies.length > 0) {
				const filteredMovies = movies.filter(
					(movie) => movie.brand === hoveredFranchise
				);
				setPageMovies(filteredMovies);
				// Create a new Set to store unique phase values
				const phaseSet = new Set();

				// Iterate over the filteredMovies array and add each unique phase value to the Set
				filteredMovies.forEach((movie) => {
					phaseSet.add(movie.phase);
				});

				// Convert the Set back to an array to get the unique phase values
				setPhases(Array.from(phaseSet));
				setCurrentMovie(getCurrentMovie(filteredMovies));
			}
		};
		filterByFranchise();
	}, [
		hoveredFranchise,
		setHoveredFranchise,
		movies,
		location.pathname,
		getCurrentMovie,
	]);

	useEffect(() => {
		if (currentMovie) {
			setHoveredFranchise(currentMovie.brand);
		}
	}, [currentMovie, setHoveredFranchise]);

	return (
		<MovieContext.Provider
			value={{
				movies,
				setMovies,
				//loading,
				currentMovie,
				updateMovie,
				phases,
				pageMovies,
				getCurrentMovie,
				setCurrentMovie,
			}}>
			{children}
		</MovieContext.Provider>
	);
};
