const Movie = require("../models/movieModel");
const mongoose = require("mongoose");

const getCurrentMovie = async (req, res) => {
	try {
		// Get today's date
		const today = new Date();

		// Find the movie whose release date is after today, sorted by release date in ascending order
		const movie = await Movie.findOne({ releaseDate: { $gt: today } }).sort({
			releaseDate: 1,
		});

		if (!movie) {
			res.status(404).json({ message: "No upcoming movies found" });
			return;
		}

		res.status(200).json(movie);
	} catch (error) {
		console.error("Error finding current movie:", error);
		res.status(500).json({ error: "An internal server error occurred" });
	}
};

const getMovies = async (req, res) => {
	const movies = await Movie.find({}).sort({ releaseDate: -1 });

	res.status(200).json(movies);
};

const createMovie = async (req, res) => {
	const { title, releaseDate, phase, trailerLink } = req.body;
	try {
		const movie = await Movie.create({
			title,
			releaseDate,
			phase,
			trailerLink,
		});
		res.status(200).json(movie);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getMovies,
	createMovie,
};
