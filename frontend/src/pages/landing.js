import { useEffect, useCallback } from "react";
import backgroundRedDots from "../assets/videos/backgroundRedDots.mp4";
import { useMovieContext } from "../context/MovieContext";
import { useThemeContext } from "../context/ThemeContext";
import CountdownTimer from "../components/countdown";
import { Link } from "react-router-dom";

const Landing = () => {
	const { movies, currentMovie, getCurrentMovie, setCurrentMovie, pageMovies } =
		useMovieContext();

	const { setHoveredFranchise, hueRotateDeg, grayScale } = useThemeContext();

	const handleMouseEnter = useCallback(
		(franchise) => {
			setHoveredFranchise(franchise);
		},
		[setHoveredFranchise]
	);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const goToBrand = () => {
		setCurrentMovie(getCurrentMovie(pageMovies));
	};

	useEffect(() => {
		if (movies && movies.length > 0) {
			const movie = getCurrentMovie(movies);
			setHoveredFranchise(movie.brand);
			setCurrentMovie(movie);
		}
	}, [movies, setCurrentMovie, setHoveredFranchise, getCurrentMovie]);

	return (
		<div>
			<div className="landing-wrapper">
				<div className="video-container">
					<video
						autoPlay
						loop
						muted
						className="video"
						style={{
							filter: `hue-rotate(${hueRotateDeg}deg) saturate(150%) grayscale(${grayScale})`,
						}}>
						<source src={backgroundRedDots} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>

				<section id="landing-page">
					<div className="landing-container container">
						{currentMovie ? (
							<div className="content">
								<h1>
									<div>
										<span>NEXT SUPERHERO MOVIE: &nbsp;</span>
										<span className="landing-movie-title">
											{currentMovie.title}
										</span>
										<div className="title-under">
											<div className="title-under-timer-brand">
												<h2>
													<CountdownTimer
														releaseDate={
															currentMovie.releaseDate
														}></CountdownTimer>
												</h2>
												<span className="brand">({currentMovie.brand})</span>
											</div>
											<div>
												<h3>
													<Link
														to={`/${currentMovie.brand}`}
														className="go-to-link"
														onMouseEnter={() =>
															handleMouseEnter(currentMovie.brand)
														}>
														Go to movie{" "}
														<span className="material-symbols-outlined">
															keyboard_double_arrow_right
														</span>
													</Link>
												</h3>
											</div>
										</div>
									</div>
								</h1>
							</div>
						) : (
							<h2>No upcoming movies</h2>
						)}
					</div>
				</section>
				<section id="movies" className="landing-franchises">
					<div className="container">
						<h2>Cinematic Universes:</h2>
						<div className="franchise-container">
							<Link
								to="/marvel"
								className="franchise"
								id="marvel-button"
								onMouseEnter={() => handleMouseEnter("marvel")}
								onClick={() => goToBrand()}>
								<span>MARVEL</span>
							</Link>
							<Link
								to="/dc"
								className="franchise"
								id="dc-button"
								onMouseEnter={() => handleMouseEnter("dc")}
								onClick={() => goToBrand()}>
								<span>DC</span>
							</Link>
							<Link
								to="/sony"
								className="franchise"
								id="sony-button"
								onMouseEnter={() => handleMouseEnter("sony")}
								onClick={() => goToBrand()}>
								<span>SONY</span>
							</Link>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Landing;
