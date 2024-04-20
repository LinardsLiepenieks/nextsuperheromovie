import React, { createContext, useState, useContext, useEffect } from "react";
import { useLoading } from "./LoadingContext";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const { loading, setLoading } = useLoading();

	const updateMovies = (newMovies) => {
		setMovies(newMovies);
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
					setLoading(false);
				}
			} catch (error) {
				console.error("Error fetching /api/movies ", error);
			}
		};
		fetchMovies();
	}, []);

	return (
		<MovieContext.Provider value={{ movies, loading, updateMovies }}>
			{children}
		</MovieContext.Provider>
	);
};
