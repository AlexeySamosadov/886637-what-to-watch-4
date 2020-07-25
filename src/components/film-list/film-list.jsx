import React from "react";
import {connect} from "react-redux";
import history from "../../history/history";
import {FilmRoute} from "../utils/utils.js";
import {ActionCreators} from "../../reducer/data/data";
import PropTypes from "prop-types";

const FilmList = ({films, getActiveFilm}) => {
  return (
    <div className="catalog__movies-list">
      {films.map((film, i)=>{
        return (
          <article onClick={()=> {
            getActiveFilm(film);
            history.push(FilmRoute.FILM_INFO);
          }} key={i} className="small-movie-card catalog__movies-card">
            <div className="small-movie-card__image">
              <img src={film.previewImage}
                alt={film.name} width="280" height="175"/>
            </div>
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
