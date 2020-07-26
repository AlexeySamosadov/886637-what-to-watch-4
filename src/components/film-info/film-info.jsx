import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import history from "../../history/history.js";
import {filterFilms} from "../utils/utils.js";
import FilmInfoDescription from "../film-info-description/film-info-description.jsx";
import FilmList from "../film-list/film-list.jsx";
import {FilmRoute} from "../const/const.js";

const FilmInfo = ({activeFilm, films}) => {
  if (JSON.stringify(activeFilm) === `{}`) {
    history.push(FilmRoute.MAIN);
  }
  const {name, backgroundImage, genre, released, posterImage, backgroundColor} = activeFilm;
  const styleCard = {
    backgroundColor,
  };
  const filteredFilms = filterFilms(films, genre);

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full" style={styleCard}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="#" onClick={(e)=>{
                e.preventDefault();
                history.push(FilmRoute.MAIN);
              }} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="#" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt="The Grand Budapest Hotel poster" width="218"
                height="327"/>
            </div>
            <FilmInfoDescription/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={filteredFilms}/>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

FilmInfo.propTypes = {
  activeFilm: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
};

export {FilmInfo};

const mapStateToProps = (state) => ({
  activeFilm: state.activeFilm,
  films: state.films,
});

export default connect(mapStateToProps, null)(FilmInfo);
