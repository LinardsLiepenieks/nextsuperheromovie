import { formatDate } from '../../utils/formatter';
import CountdownTimer from './Countdown';
import LoadingSpinner from '../loadingSpinner';
import { useEffect, useRef, useState } from 'react';

const NextMovieDisplay = ({ movie, isLoading }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isInitial, setIsInitial] = useState(true);

  // Minimum height to prevent layout shift during loading
  const MIN_HEIGHT = 300;

  // Measure height whenever content changes using ResizeObserver
  useEffect(() => {
    if (!contentRef.current) {
      setHeight(MIN_HEIGHT);
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Use the larger of measured height or minimum height
        setHeight(Math.max(entry.contentRect.height, MIN_HEIGHT));
      }
    });

    resizeObserver.observe(contentRef.current);

    // After first render, enable transitions
    if (isInitial) {
      setIsInitial(false);
    }

    return () => resizeObserver.disconnect();
  }, [movie, isLoading, isInitial]);

  return (
    <div
      className="will-change-contents relative overflow-hidden"
      style={{
        height: `${height}px`,
        minHeight: `${MIN_HEIGHT}px`,
        transition: isInitial ? 'none' : 'height 300ms ease',
      }}
    >
      {isLoading ? (
        <div
          ref={contentRef}
          className="flex items-center justify-center"
          style={{ minHeight: `${MIN_HEIGHT}px` }}
        >
          <LoadingSpinner size="lg" text="Loading movie..." />
        </div>
      ) : movie ? (
        <div ref={contentRef} className="transition-opacity duration-300">
          <div className="pt-12 pb-16 ml-8">
            <h2 className="text-hero-sm text-title-color uppercase font-medium tracking-wide leading-none -ml-2.5 drop-shadow-lg mb-6 transition-colors duration-150 ease">
              {movie.title}
            </h2>
            <div className="text-3xl drop-shadow-sm z-10 relative">
              {movie.releaseDate === 0 ? (
                <span className="text-title-color transition-colors duration-150 ease">
                  TBA
                </span>
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
        </div>
      ) : (
        <div
          ref={contentRef}
          className="pt-12 pb-16 ml-8"
          style={{ minHeight: `${MIN_HEIGHT}px` }}
        >
          <span className="text-title-color transition-colors duration-150 ease">
            No upcoming movies
          </span>
        </div>
      )}
    </div>
  );
};

export default NextMovieDisplay;
