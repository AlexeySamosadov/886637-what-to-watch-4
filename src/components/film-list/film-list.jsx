import React from "react";
import {connect} from "react-redux";
import history from "../../history/history";
import {FilmRoute, filterFilms} from "../utils/utils.js";
 import {ActionCreators} from "../../reducer/data/data";

const FilmList = ({films, getActiveFilm, activeGenre}) => {
  const filteredFilms = filterFilms(films, activeGenre);


  return (
    <div className="catalog__movies-list">
      {filteredFilms.map((film, i)=>{
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

export {FilmList};

const mapStateToProps = (state) => ({
  films: state.films,
  activeGenre: state.activeGenre,
});

const mapStateToDispatch = (dispatch) => ({
  getActiveFilm: (film) => {
    dispatch(ActionCreators.getActiveFilm(film))
  }
});

export default connect(mapStateToProps, mapStateToDispatch)(FilmList);
