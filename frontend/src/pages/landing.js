import { useState, useEffect, useRef, useCallback } from "react";
import { formatDate } from "../utils/formatter";
import { useMetadata } from "../context/MetadataContext";
import MovieListItem from "../components/movieListItem";
import CountdownTimer from "../components/countdown";
import YoutubeVideo from "../components/youtubeVideo";

const Landing = () => {
	const [movies, setMovies] = useState([]);
	const [movie, setMovie] = useState(null);
	const [selectedPhase, setSelectedPhase] = useState(5);
	const { setDescription, setKeywords } = useMetadata();

	const landingRef = useRef(null);

	const updateMovie = useCallback(
		(movie) => {
			if (movie) {
				setMovie(movie);

				setDescription(movie.title + " out at " + movie.releaseDate);
				setKeywords(movie.title);
			}
		},
		[setDescription, setKeywords]
	);

	const changeMovie = (movie) => {
		updateMovie(movie);

		landingRef.current.scrollIntoView({
			behavior: "smooth",
		});
	};

	const getCurrentMovie = (data) => {
		const today = new Date();
		const upcomingMovies = data.filter(
			(movie) => new Date(movie.releaseDate) > today
		);

		upcomingMovies.sort(
			(a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
		);

		return upcomingMovies[0];
	};

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const apiUrl = process.env.REACT_APP_API_URL;
				const response = await fetch(`${apiUrl}api/movies`);
				const data = await response.json();

				console.log(data);

				if (data.length > 0) {
					setMovies(data);
					console.log(response);
					updateMovie(getCurrentMovie(data));
				}
			} catch (error) {
				console.error("Error fetching /api/movies ", error);
			}
		};
		fetchMovies();
	}, [updateMovie]);

	/*could separate into component*/

	return (
		<div className="landing">
			<section ref={landingRef} id="landing">
				<div className="container">
					<div className="landing-movie">
						<h1 className="page-title">NEXT MARVEL MOVIE</h1>
						{movie ? (
							<div>
								<div className="landing-movie-info">
									<h2 className="movie-title">{movie.title}</h2>
									<div className="movie-date">
										{movie.releaseDate === 0 ? (
											<span>TBA</span>
										) : (
											<span>{formatDate(movie.releaseDate)}</span>
										)}
									</div>
								</div>
								<div className="movie-countdown-container">
									<CountdownTimer
										releaseDate={movie.releaseDate}></CountdownTimer>
								</div>
							</div>
						) : (
							<span>No upcoming movies</span>
						)}
					</div>
					<div className="trailer-container">
						<div className="ad-trailer-vertical">AD</div>
						<div className="trailer">
							<div className="trailer-group">
								<h3 className="trailer-title">TRAILER</h3>
								{movie && (
									<div className="embedded-trailer">
										<YoutubeVideo
											trailerLink={movie.trailerLink}></YoutubeVideo>
									</div>
								)}
							</div>
							<div className="ad-horizontal"></div>
						</div>
						<div className="ad-trailer-vertical">AD</div>
					</div>
				</div>
			</section>
			<section id="movies">
				<div className="container">
					<div className="ad-vertical"></div>
					<div className="movie-list-group">
						<h2>Other movies</h2>
						<div className="movie-list-nav">
							<ul>
								{[1, 2, 3, 4, 5, 6].map((phase) => (
									<li key={phase} onClick={() => setSelectedPhase(phase)}>
										Phase {phase}
									</li>
								))}
							</ul>
						</div>
						<div className="movie-list">
							<ul>
								{movies
									.filter(
										(movie) =>
											selectedPhase === null || movie.phase === selectedPhase
									)

									.sort(
										(a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
									)
									.map((movie) => (
										<MovieListItem
											key={movie._id}
											movie={movie}
											onClick={() => changeMovie(movie)}
										/>
									))}
							</ul>
						</div>
					</div>
					<div className="ad-vertical"></div>
				</div>
			</section>
		</div>
	);
};

export default Landing;
