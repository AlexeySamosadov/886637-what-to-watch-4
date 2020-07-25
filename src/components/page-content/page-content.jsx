import React from "react";
import Footer from "../footer/footer.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import FilmList from "../film-list/film-list.jsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreators} from "../../reducer/data/data";
import history from "../../history/history.js";
import {FilmRoute} from "../utils/utils.js";
import {filterFilms} from "../utils/utils";


const PageContent = ({films, getActiveFilm, activeGenre}) => {
  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenreList/>
        <FilmList/>
        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

PageContent.propTypes = {
  films: PropTypes.array.isRequired,
  getActiveFilm: PropTypes.func.isRequired,
};

export {PageContent};

const mapStateToProps = (state) => ({
  films: state.films,
  activeGenre: state.activeGenre,
});

const mapStateToDispatch = (dispatch) => ({
  getActiveFilm(film) {
    dispatch(ActionCreators.getActiveFilm(film));
  }
});

export default connect(mapStateToProps, mapStateToDispatch)(PageContent);
