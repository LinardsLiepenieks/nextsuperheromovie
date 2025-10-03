import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import LoadingSpinner from './loadingSpinner';

const YoutubeVideo = ({ trailerLink }) => {
  const [videoId, setVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    const extractVideoId = (url) => {
      if (url) {
        const match = url.match(/[?&]v=([^&]*)/);
        return match && match[1];
      }
    };
    const extractedId = extractVideoId(trailerLink);
    setVideoId(extractedId);

    // Reset loading state and opacity when video changes
    if (extractedId) {
      setIsLoading(true);
      setVideoOpacity(0);
    }
  }, [trailerLink]);

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = () => {
    setIsLoading(false);
    // Small delay before fading in
    setTimeout(() => {
      setVideoOpacity(1);
    }, 100);
  };

  const onError = () => {
    setIsLoading(false);
    setVideoOpacity(1);
  };

  return (
    <div className="w-full aspect-video relative bg-black">
      {isLoading && videoId && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <LoadingSpinner size="lg" text="Loading trailer..." />
        </div>
      )}
      {videoId && (
        <div
          className="w-full h-full transition-opacity duration-500"
          style={{ opacity: videoOpacity }}
        >
          <YouTube
            videoId={videoId}
            opts={opts}
            className="w-full h-full"
            onReady={onReady}
            onError={onError}
          />
        </div>
      )}
    </div>
  );
};

export default YoutubeVideo;
