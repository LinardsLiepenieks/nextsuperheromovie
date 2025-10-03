import { useState, useEffect } from 'react';

const CountdownTimer = ({ releaseDate }) => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!releaseDate) return;

    const calculateCountdown = () => {
      const difference = new Date(releaseDate) - new Date();
      const totalSeconds = Math.max(0, Math.floor(difference / 1000));
      const months = Math.floor(totalSeconds / (3600 * 24 * 30.44));
      const days = Math.floor(
        (totalSeconds % (3600 * 24 * 30.44)) / (3600 * 24)
      );
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return { months, days, hours, minutes, seconds };
    };

    setCountdown(calculateCountdown());

    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, [releaseDate]);

  if (!countdown) {
    return null;
  }

  const { months, days, hours, minutes, seconds } = countdown;
  const isReleased =
    months === 0 && days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    <span className="text-secondary text-3xl lg:text-6xl font-normal tracking-wide drop-shadow-md">
      {isReleased ? (
        'Movie released!'
      ) : (
        <>
          {`${months} months `}
          {`${days} days `}
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </>
      )}
    </span>
  );
};

export default CountdownTimer;
