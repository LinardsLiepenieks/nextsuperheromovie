import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);

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
