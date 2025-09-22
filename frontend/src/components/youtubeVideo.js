import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

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

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="w-full aspect-video">
      {videoId && (
        <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
      )}
    </div>
  );
};

export default YoutubeVideo;
