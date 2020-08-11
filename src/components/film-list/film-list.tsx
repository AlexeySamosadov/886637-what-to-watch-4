import * as React from "react";
import history from "../../history/history";
import {AppRoute, PlayerType} from "../const/const";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import MovieVideoPlayer from "../video-player/video-player";
import {Film} from "../type";

const VideoPlayer = withVideoPlayer(MovieVideoPlayer);

interface Props {
  films: Film[],
}

const FilmList: React.FC<Props> = ({films}: Props) => {
  return (
    <div className="catalog__movies-list">
      {films.map((film, i)=>{
        return (
          <article onClick={()=> {
            history.push(`${AppRoute.FILM_INFO}/${film.id}`);
          }} key={i} className="small-movie-card catalog__movies-card">
            <VideoPlayer
              srcPoster={film.previewImage}
              srcVideo={film.previewVideoLink}
              widthAtr={280}
              heightAtr={175}
              type={PlayerType.TRAILER}
            />
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="#!">{film.name}</a>
            </h3>
          </article>
        );
      })}
    </div>
  );
};

// FilmList.propTypes = {
//   films: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     backgroundImage: PropTypes.string.isRequired,
//     genre: PropTypes.string.isRequired,
//     released: PropTypes.number.isRequired,
//     posterImage: PropTypes.string.isRequired,
//     backgroundColor: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     isFavorite: PropTypes.bool.isRequired,
//   })).isRequired,
// };

export default FilmList;
