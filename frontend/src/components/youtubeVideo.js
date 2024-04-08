import { useState, useEffect } from "react";
import YouTube from "react-youtube";

const YoutubeVideo = ({ trailerLink }) => {
	const [videoId, setVideoId] = useState(null);

	useEffect(() => {
		const extractVideoId = (url) => {
			if (url) {
				const match = url.match(/[?&]v=([^&]*)/);
				return match && match[1];
			}
		};
		setVideoId(extractVideoId(trailerLink));
	}, [trailerLink]);

	return <span>{videoId && <YouTube videoId={videoId} />}</span>;
};

export default YoutubeVideo;
