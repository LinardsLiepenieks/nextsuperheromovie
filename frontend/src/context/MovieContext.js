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

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
	const [movies, setMovies] = useState(null); // all movies so don't have to re-fetch
	const [currentMovie, setCurrentMovie] = useState(null); //current diplayed movie
	const [pageMovies, setPageMovies] = useState(null); //movies for brand filtering
	const [phases, setPhases] = useState(null); //phases or years
	const { setLoading } = useLoading();
	const { setDescription, setKeywords } = useMetadata();
	const { hoveredFranchise } = useThemeContext();

	const getCurrentMovie = (data) => {
		const today = new Date();
		const upcomingMovies = data.filter(
			(movie) => new Date(movie.releaseDate) > today
		);

		upcomingMovies.sort(
			(a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
		);

		return upcomingMovies[0];
	};
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setLoading(true);

				const apiUrl = process.env.REACT_APP_API_URL;
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
			} finally {
				setLoading(false);
			}
		};
		fetchMovies();
	}, [setLoading]);

	const updateMovie = useCallback(
		(movie) => {
			if (movie) {
				console.log("SETTING CURRENT MOVIE");
				setCurrentMovie(movie);
				setDescription(movie.title + " out at " + movie.releaseDate);
				setKeywords(movie.title);
			}
		},
		[setDescription, setKeywords]
	);
	useEffect(() => {
		if (movies) {
			setCurrentMovie(getCurrentMovie(movies));
			console.log("INITIAL MOVIES", movies);
		}
	}, [movies]);
	useEffect(() => {
		const filterByFranchise = () => {
			if (hoveredFranchise && movies) {
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
			} else {
				setPageMovies(null);
			}
		};

		filterByFranchise();
	}, [hoveredFranchise, movies]);

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
