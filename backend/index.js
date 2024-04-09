require("dotenv").config();

//requires
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const movieRoutes = require("./routes/movies");

//app
const app = express();

//middleware
app.use(express.json());
if (process.env.FRONTEND) {
	app.use(
		cors({
			origin: [process.env.FRONTEND],
			methods: ["GET"],
			credentials: true,
		})
	);
}
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

//routes
app.use("/api/movies", movieRoutes);

//db
mongoose
	.connect(process.env.DB_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("connected");
		});
	})
	.catch((err) => {
		console.log(process.env.DB_URI);
		console.log(err);
	});

// Root Route
app.get("/", (req, res) => {
	if (mongoose.connection.readyState === 1) {
		res.send("Connection to the database is successful.");
	} else {
		res.status(500).send("Failed to connect to the database.");
	}
});

module.exports = app;
