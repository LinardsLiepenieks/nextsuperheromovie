import { useEffect } from "react";
import backgroundRedDots from "../assets/videos/backgroundRedDots.mp4";
import { useMovieContext } from "../context/MovieContext";
import { useThemeContext } from "../context/ThemeContext";
import CountdownTimer from "../components/countdown";
import { Link } from "react-router-dom";

const Landing = () => {
	const { movies, currentMovie, getCurrentMovie, setCurrentMovie, pageMovies } =
		useMovieContext();

	const { setHoveredFranchise, hueRotateDeg, grayScale } = useThemeContext();

	const handleMouseEnter = (franchise) => {
		setHoveredFranchise(franchise);
	};

	const goToBrand = () => {
		setCurrentMovie(getCurrentMovie(pageMovies));
	};

	useEffect(() => {
		if (movies) {
			setCurrentMovie(getCurrentMovie(movies));
		}
	}, []);

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
								<h1 className="page-title">
									<span>NEXT SUPERHERO MOVIE: &nbsp;</span>
									<span>{currentMovie.title}</span>
								</h1>
								<h2>
									<CountdownTimer
										releaseDate={currentMovie.releaseDate}></CountdownTimer>
								</h2>
								<h3>
									<Link
										to="/movie"
										className="go-to-link"
										onMouseEnter={() => handleMouseEnter(currentMovie.brand)}>
										Go to movie{" "}
										<span className="material-symbols-outlined">
											keyboard_double_arrow_right
										</span>
									</Link>
								</h3>
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
								to="/movie"
								className="franchise"
								id="marvel-button"
								onMouseEnter={() => handleMouseEnter("marvel")}
								onClick={() => goToBrand()}>
								<span>MARVEL</span>
							</Link>
							<Link
								to="/movie"
								className="franchise"
								id="dc-button"
								onMouseEnter={() => handleMouseEnter("dc")}
								onClick={() => goToBrand()}>
								<span>DC</span>
							</Link>
							<Link
								to="/movie"
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
