import { useState, useEffect } from "react";

const CountdownTimer = ({ releaseDate }) => {
	const [countdown, setCountdown] = useState(null);

	useEffect(() => {
		if (releaseDate) {
			const calculateCountdown = (releaseDate) => {
				const difference = new Date(releaseDate) - new Date();
				const totalSeconds = Math.max(0, Math.floor(difference / 1000));
				const months = Math.floor(totalSeconds / (3600 * 24 * 30));
				const days = Math.floor(
					(totalSeconds % (3600 * 24 * 30)) / (3600 * 24)
				);
				const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
				const minutes = Math.floor((totalSeconds % 3600) / 60);
				const seconds = totalSeconds % 60;
				return { months, days, hours, minutes, seconds };
			};

			setCountdown(calculateCountdown(releaseDate));

			const timer = setInterval(() => {
				setCountdown(calculateCountdown(releaseDate));
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [releaseDate]);

	if (!countdown) {
		return;
	}
	return (
		countdown && (
			<span className="movie-countdown">
				{countdown.months === 0 &&
				countdown.days === 0 &&
				countdown.hours === 0 &&
				countdown.minutes === 0 &&
				countdown.seconds === 0 ? (
					"Movie released!"
				) : (
					<>
						{`${countdown.months} months `}
						{`${countdown.days} days `}
						{String(countdown.hours).padStart(2, "0")}:
						{String(countdown.minutes).padStart(2, "0")}:
						{String(countdown.seconds).padStart(2, "0")}
					</>
				)}
			</span>
		)
	);
};

export default CountdownTimer;
