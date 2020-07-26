import React from "react";
import Footer from "../footer/footer.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import FilmList from "../film-list/film-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer/data/data";
import {filterFilms} from "../utils/utils";
import {getFilms} from "../../reducer/data/selectors";
import {getActiveGenre, getShowingFilmsNumber} from "../../reducer/app-status/selectors";

const PageContent = ({films, activeGenre, showingFilmsNumber}) => {
  const filteredFilms = filterFilms(films, activeGenre);
  const cuttedFilmsData = filteredFilms.slice(0, showingFilmsNumber);

  let isRenderButton = true;
  if (filteredFilms.length < showingFilmsNumber) {
    isRenderButton = false;
  }

  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenreList/>
        <FilmList films={cuttedFilmsData}/>
        {isRenderButton && <ShowMoreButton/>}
      </section>
      <Footer/>
    </div>
  );
};

PageContent.propTypes = {
  films: PropTypes.array.isRequired,
  getActiveFilm: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
  showingFilmsNumber: PropTypes.number.isRequired,
};

export {PageContent};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  activeGenre: getActiveGenre(state),
  showingFilmsNumber: getShowingFilmsNumber(state),
});

const mapStateToDispatch = (dispatch) => ({
  getActiveFilm(film) {
    dispatch(ActionCreators.getActiveFilm(film));
  }
});

export default connect(mapStateToProps, mapStateToDispatch)(PageContent);
