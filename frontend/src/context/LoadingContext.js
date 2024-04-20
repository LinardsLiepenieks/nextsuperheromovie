import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	// Updated setLoading function to log state changes
	const setLoadingWithLog = (newLoadingState) => {
		console.log("Loading state changed:", newLoadingState);
		setLoading(newLoadingState);
	};

	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};
