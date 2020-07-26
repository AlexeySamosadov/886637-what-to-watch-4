import React from "react";
import {connect} from "react-redux";
import PageContent from "../page-content/page-content.jsx";
import PropTypes from "prop-types";
import {ActionCreators} from "../../reducer/data/data";
import history from "../../history/history.js";
import {FilmRoute} from "../const/const";
import {getPromoFilm} from "../../reducer/data/selectors";

const Main = ({promoFilm, getActiveFilm}) => {
  const {name, genre, released, posterImage, backgroundImage} = promoFilm;
  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div onClick={()=> {
              history.push(FilmRoute.MY_LIST);
            }} className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img onClick={()=> {
                getActiveFilm(promoFilm);
                history.push(FilmRoute.FILM_INFO);
              }} src={posterImage} alt={`${name} poster`} width="218"
              height="327"/>
            </div>

            <div className="movie-card__desc">
              <h2 onClick={()=> {
                getActiveFilm(promoFilm);
                history.push(FilmRoute.FILM_INFO);
              }} className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button onClick={()=> {
                  history.push(FilmRoute.PLAYER);
                }}
                className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use href="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button onClick={(e)=> {
                  e.preventDefault();
                }} className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use href="#add"/>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PageContent/>
    </React.Fragment>
  );
};

Main.propTypes = {
  promoFilm: PropTypes.shape({
    name: PropTypes.string,
    genre: PropTypes.string,
    released: PropTypes.number,
    posterImage: PropTypes.string,
    backgroundImage: PropTypes.string,
  }),
  getActiveFilm: PropTypes.func.isRequired,
};

export {Main};

const mapStateToProps = (state) => ({
  promoFilm: getPromoFilm(state),
});

const mapStateToDispatch = (dispatch) => ({
  getActiveFilm: (film) => {
    dispatch(ActionCreators.getActiveFilm(film));
  }
});
export default connect(mapStateToProps, mapStateToDispatch)(Main);
