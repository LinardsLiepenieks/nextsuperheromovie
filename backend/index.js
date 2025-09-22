require('dotenv').config();

//requires
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movies');

//app
const app = express();

//middleware
app.use(express.json());
if (process.env.FRONTEND) {
  app.use(
    cors({
      origin: [process.env.FRONTEND],
      methods: ['GET'],
      credentials: true,
    })
  );
} else {
  app.use(cors());
}

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/movies', movieRoutes);

//db
// Remove .mongodb.net from the template since DB_CLUSTER already includes it
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected');
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Root Route
app.get('/', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send('Connection to the database is successful.');
  } else {
    res.status(500).send('Failed to connect to the database.');
  }
});

module.exports = app;
