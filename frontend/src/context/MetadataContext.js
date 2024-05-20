import React, { createContext, useContext, useState, useEffect } from "react";

const MetadataContext = createContext();

export const MetadataProvider = ({ children }) => {
	const [description, setDescription] = useState("");
	const [keywords, setKeywords] = useState("");
	return (
		<MetadataContext.Provider
			value={{ description, setDescription, keywords, setKeywords }}>
			{children}
		</MetadataContext.Provider>
	);
};

export const useMetadata = () => {
	const { description, setDescription, keywords, setKeywords } =
		useContext(MetadataContext);

	useEffect(() => {
		const metaTag = document.querySelector('meta[name="description"]');
		const staticDescription =
			"Countdown timer to the next superhero movie. When is the next superhero movie? ";
		if (metaTag) {
			metaTag.setAttribute("content", staticDescription + description);
		}
	}, [description]);

	useEffect(() => {
		const metaTag = document.querySelector('meta[name="keywords"]');
		const staticKeywords = "Movies, Superhero movie, marvel";
		if (metaTag) {
			metaTag.setAttribute("content", staticKeywords + keywords);
		}
	}, [keywords]);

	return { description, setDescription, keywords, setKeywords };
};
