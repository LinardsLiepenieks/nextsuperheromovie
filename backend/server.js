require("dotenv").config();

//requires
const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movies");

//app
const app = express();

//middleware
app.use(express.json());
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
