import { formatDateShort } from "../utils/formatter";
const MovieListItem = ({ movie, onClick }) => {
	const releaseDateClass =
		new Date(movie.releaseDate) < new Date() ? "released" : "";

	return (
		<li
			key={movie._id}
			className={`movie-item ${releaseDateClass}`}
			onClick={onClick}>
			<span className="movie">
				{movie.title}{" "}
				<span className="movie-date">{formatDateShort(movie.releaseDate)}</span>
			</span>
		</li>
	);
};

export default MovieListItem;
