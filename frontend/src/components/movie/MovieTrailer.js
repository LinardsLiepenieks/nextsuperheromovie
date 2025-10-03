import YoutubeVideo from '../youtubeVideo';

const MovieTrailer = ({ movie }) => {
  return (
    <div className="flex justify-between py-10 xl:py-14">
      <div className="ad-trailer-vertical"></div>
      <div className="flex-1 px-1 xl:px-4">
        <div>
          {movie && (
            <>
              <h3 className="text-secondary text-3xl lg:text-4xl mb-px -ml-1 drop-shadow-xs px-2 xl:px-0">
                TRAILER
              </h3>
              <div className="w-full drop-shadow-2xl w-full aspect-video ">
                <YoutubeVideo trailerLink={movie.trailerLink} />
              </div>
            </>
          )}
        </div>
        <div className="ad-horizontal"></div>
      </div>
      <div className="ad-trailer-vertical"></div>
    </div>
  );
};

export default MovieTrailer;
