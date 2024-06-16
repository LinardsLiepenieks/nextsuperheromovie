import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [hueRotateDeg, setHueRotateDeg] = useState(180);
	const [grayScale, setGrayscale] = useState(0);
	const [hoveredFranchise, setHoveredFranchise] = useState(null);

	const updateTheme = (franchise) => {
		if (!franchise) return;
		switch (franchise) {
			case "marvel":
				setHueRotateDeg(0);
				setGrayscale(0);
				break;
			case "dc":
				setHueRotateDeg(220);
				setGrayscale(0);
				break;
			case "sony":
				setHueRotateDeg(135);
				setGrayscale(1);
				break;
			default:
				// Handle unexpected franchise value
				break;
		}
	};

	const updateCSSVariables = (franchise) => {
		switch (franchise) {
			case "marvel":
				document.documentElement.style.setProperty("--accent", "#ed1d24");
				document.documentElement.style.setProperty("--title-color", "#000000");
				document.documentElement.style.setProperty("--effect-color", "#ed1d24");
				break;
			case "dc":
				document.documentElement.style.setProperty("--accent", "#263f75");
				document.documentElement.style.setProperty("--secondary", "#f6f7ff");
				document.documentElement.style.setProperty("--title-color", "#ffd100");
				document.documentElement.style.setProperty("--effect-color", "#ffd100");
				break;
			case "sony":
				document.documentElement.style.setProperty("--accent", "#343a47");
				document.documentElement.style.setProperty("--title-color", "#823bc2");
				document.documentElement.style.setProperty("--effect-color", "#823bc2");
				break;
			default:
				break;
		}
	};
	useEffect(() => {
		updateTheme(hoveredFranchise);
		updateCSSVariables(hoveredFranchise);
	}, [hoveredFranchise]);

	return (
		<ThemeContext.Provider
			value={{
				setHoveredFranchise,
				hoveredFranchise,
				hueRotateDeg,
				grayScale,
			}}>
			{children}
		</ThemeContext.Provider>
	);
};
