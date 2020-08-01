import React from "react";
import {connect} from "react-redux";
import history from "../../history/history";
import {AppRoute, playerType} from "../const/const";
import {ActionCreators} from "../../reducer/data/data";
import PropTypes from "prop-types";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import MovieVideoPlayer from "../video-player/video-player";

const VideoPlayer = withVideoPlayer(MovieVideoPlayer);

const FilmList = ({films}) => {
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
              type={playerType.TRAILER}
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

FilmList.propTypes = {
  getActiveFilm: PropTypes.func.isRequired,
  films: PropTypes.arrayOf(PropTypes.shape({
    previewImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export {FilmList};

const mapStateToDispatch = (dispatch) => ({
  getActiveFilm: (film) => {
    dispatch(ActionCreators.getActiveFilm(film));
  }
});

export default connect(null, mapStateToDispatch)(FilmList);
