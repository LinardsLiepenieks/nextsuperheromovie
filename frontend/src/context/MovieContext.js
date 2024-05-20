import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from "react";
import { useLoading } from "./LoadingContext";
import { useMetadata } from "./MetadataContext";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
	const [movies, setMovies] = useState(null);
	const [currentMovie, setCurrentMovie] = useState(null);
	const { loading, setLoading } = useLoading();
	const { setDescription, setKeywords } = useMetadata();

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

	const fetchMovies = useCallback(async () => {
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
	}, [setMovies]);

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
		fetchMovies();
	}, []);

	useEffect(() => {
		if (movies) {
			setCurrentMovie(getCurrentMovie(movies));
			console.log("INITIAL MOVIES", movies);
		}
	}, [movies]);

	return (
		<MovieContext.Provider
			value={{
				movies,
				setMovies,
				//loading,
				currentMovie,
				updateMovie,
				setCurrentMovie,
				getCurrentMovie,
			}}>
			{children}
		</MovieContext.Provider>
	);
};
