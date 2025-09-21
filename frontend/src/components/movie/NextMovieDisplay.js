import { formatDate } from '../../utils/formatter';
import CountdownTimer from './Countdown';

const NextMovieDisplay = ({ movie }) => {
  if (!movie) {
    return <span>No upcoming movies</span>;
  }

  return (
    <div>
      <div className="pt-12 pb-16 ml-8">
        <h2 className="text-hero text-primary uppercase font-medium  tracking-wide leading-none -ml-2.5 drop-shadow-lg">
          {movie.title}
        </h2>
        <div className="text-3xl drops-shadow-sm">
          {movie.releaseDate === 0 ? (
            <span>TBA</span>
          ) : (
            <span>{formatDate(movie.releaseDate)}</span>
          )}
        </div>
      </div>
      <div className="ml-0">
        <CountdownTimer releaseDate={movie.releaseDate} />
      </div>
    </div>
  );
};

export default NextMovieDisplay;
