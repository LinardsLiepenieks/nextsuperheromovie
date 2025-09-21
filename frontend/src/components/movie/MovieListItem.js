import { formatDateShort } from '../../utils/formatter';

const MovieListItem = ({ movie, onClick, isActive }) => {
  return (
    <li
      key={movie._id}
      className={`hover:text-secondary transition-all duration-300 cursor-pointer group ${
        isActive ? 'text-secondary' : 'text-secondary/60'
      }`}
      onClick={onClick}
    >
      <span
        className={` ${
          isActive ? '' : ''
        } relative group after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-secondary after:w-0 after:transition-all after:duration-300 group-hover:after:w-full`}
      >
        <span>{movie.title} </span>
        <span>{formatDateShort(movie.releaseDate)}</span>
      </span>
    </li>
  );
};

export default MovieListItem;
