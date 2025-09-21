import YoutubeVideo from '../youtubeVideo';

const MovieTrailer = ({ movie }) => {
  return (
    <div className="flex justify-between py-14">
      <div className="ad-trailer-vertical"></div>
      <div>
        <div>
          {movie && (
            <>
              <h3 className="text-secondary text-4xl mb-px -ml-1">TRAILER</h3>
              <div className="aspect-16/9">
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
