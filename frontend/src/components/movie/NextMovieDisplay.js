import { formatDate } from '../../utils/formatter';
import CountdownTimer from './Countdown';
import LandingDotsMid from '../backgrounds/landingDotsMid';

const NextMovieDisplay = ({ movie }) => {
  if (!movie) {
    return <span>No upcoming movies</span>;
  }

  return (
    <div className="will-change-contents relative">
      <div className="pt-12 pb-16 ml-8">
        <h2 className="text-hero-sm  text-title-color uppercase font-medium  tracking-wide leading-none -ml-2.5 drop-shadow-lg mb-6 transition-colors duration-150 ease">
          {movie.title}
        </h2>
        <div className="text-3xl drop-shadow-sm z-10 relative">
          {movie.releaseDate === 0 ? (
            <span>TBA</span>
          ) : (
            <span className="text-title-color text-5xl transition-colors duration-150 ease">
              {formatDate(movie.releaseDate)}
            </span>
          )}
        </div>
      </div>
      <div className="ml-2 relative">
        <CountdownTimer releaseDate={movie.releaseDate} />
      </div>
      <LandingDotsMid />
    </div>
  );
};

export default NextMovieDisplay;
