const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		releaseDate: {
			type: Date,
			required: true,
		},
		phase: {
			type: String,
			required: false,
		},
		trailerLink: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
