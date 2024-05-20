import { useState, useEffect, useRef } from "react";
import { formatDate } from "../utils/formatter";
import { useMovieContext } from "../context/MovieContext";
import { useThemeContext } from "../context/ThemeContext";
import MovieListItem from "../components/movieListItem";
import CountdownTimer from "../components/countdown";
import YoutubeVideo from "../components/youtubeVideo";

const MoviePage = () => {
	const [selectedPhase, setSelectedPhase] = useState();
	const [pageMovies, setPageMovies] = useState(null);
	const [phases, setPhases] = useState(null);
	const {
		movies,
		currentMovie,
		updateMovie,
		setCurrentMovie,
		getCurrentMovie,
	} = useMovieContext();
	const { hoveredFranchise, setHoveredFranchise } = useThemeContext();

	const landingRef = useRef(null);

	const changeMovie = (movie) => {
		updateMovie(movie);

		landingRef.current.scrollIntoView({
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const filterByFranchise = () => {
			console.log(hoveredFranchise);
			if (hoveredFranchise && movies) {
				const filteredMovies = movies.filter(
					(movie) => movie.brand === hoveredFranchise
				);
				setPageMovies(filteredMovies);
				// Create a new Set to store unique phase values
				const phaseSet = new Set();

				// Iterate over the filteredMovies array and add each unique phase value to the Set
				filteredMovies.forEach((movie) => {
					phaseSet.add(movie.phase);
				});

				// Convert the Set back to an array to get the unique phase values
				setPhases(Array.from(phaseSet));
				console.log(phaseSet);
			} else {
				setPageMovies(null);
			}
		};
		filterByFranchise();
	}, [hoveredFranchise, movies]);
	useEffect(() => {
		if (!hoveredFranchise && currentMovie) {
			setHoveredFranchise(currentMovie.brand);
		}
		if (currentMovie) {
			setSelectedPhase(currentMovie.phase);
		}
		console.log(currentMovie);
	}, [currentMovie, hoveredFranchise, setHoveredFranchise]);
	useEffect(() => {
		if (pageMovies) {
			setCurrentMovie(getCurrentMovie(pageMovies));
		}
	}, [pageMovies, getCurrentMovie, setCurrentMovie]);

	return (
		<div className="landing">
			<section ref={landingRef} id="landing">
				<div className="container">
					<div className="landing-movie">
						<h1 className="page-title">
							NEXT {hoveredFranchise ? hoveredFranchise.toUpperCase() : ""}{" "}
							MOVIE
						</h1>
						{currentMovie ? (
							<div>
								<div className="landing-movie-info">
									<h2 className="movie-title">{currentMovie.title}</h2>
									<div className="movie-date">
										{currentMovie.releaseDate === 0 ? (
											<span>TBA</span>
										) : (
											<span>{formatDate(currentMovie.releaseDate)}</span>
										)}
									</div>
								</div>
								<div className="movie-countdown-container">
									<CountdownTimer
										releaseDate={currentMovie.releaseDate}></CountdownTimer>
								</div>
							</div>
						) : (
							<span>No upcoming movies</span>
						)}
					</div>
					<div className="trailer-container">
						<div className="ad-trailer-vertical"></div>
						<div className="trailer">
							<div className="trailer-group">
								<h3 className="trailer-title">TRAILER</h3>
								{currentMovie && (
									<div className="embedded-trailer">
										<YoutubeVideo
											trailerLink={currentMovie.trailerLink}></YoutubeVideo>
									</div>
								)}
							</div>
							<div className="ad-horizontal"></div>
						</div>
						<div className="ad-trailer-vertical"></div>
					</div>
				</div>
			</section>
			<section id="movies" className="viewMovies">
				<div className="container">
					<div className="ad-vertical"></div>
					<div className="movie-list-group">
						<h2>Other movies</h2>
						<div className="movie-list-nav">
							<ul>
								{phases ? (
									phases.map((phase) => (
										<li key={phase} onClick={() => setSelectedPhase(phase)}>
											{phase}
										</li>
									))
								) : (
									<span></span>
								)}
							</ul>
						</div>
						<div className="movie-list">
							<ul>
								{pageMovies && pageMovies.length ? (
									pageMovies
										.filter(
											(currentMovie) =>
												selectedPhase === null ||
												currentMovie.phase === selectedPhase
										)

										.sort(
											(a, b) =>
												new Date(a.releaseDate) - new Date(b.releaseDate)
										)
										.map((currentMovie) => (
											<MovieListItem
												key={currentMovie._id}
												movie={currentMovie}
												onClick={() => changeMovie(currentMovie)}
											/>
										))
								) : (
									<span>No movies</span>
								)}
							</ul>
						</div>
					</div>
					<div className="ad-vertical"></div>
				</div>
			</section>
		</div>
	);
};

export default MoviePage;
