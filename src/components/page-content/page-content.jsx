import React from "react";
import Footer from "../footer/footer.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import FilmList from "../film-list/film-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer/data/data";
import {getFilmsToRender} from "../../reducer/data/selectors.js";
import {getShowingFilmsNumber} from "../../reducer/app-status/selectors.js";

const PageContent = ({filmsToRender, showingFilmsNumber}) => {
  let isRenderButton = true;
  if (filmsToRender.length < showingFilmsNumber) {
    isRenderButton = false;
  }

  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenreList/>
        <FilmList films={filmsToRender}/>
        {isRenderButton && <ShowMoreButton/>}
      </section>
      <Footer/>
    </div>
  );
};

PageContent.propTypes = {
  filmsToRender: PropTypes.array.isRequired,
  getActiveFilm: PropTypes.func.isRequired,

  showingFilmsNumber: PropTypes.number.isRequired,
};

export {PageContent};

const mapStateToProps = (state) => ({
  showingFilmsNumber: getShowingFilmsNumber(state),
  filmsToRender: getFilmsToRender(state),
});

const mapStateToDispatch = (dispatch) => ({
  getActiveFilm(film) {
    dispatch(ActionCreators.getActiveFilm(film));
  }
});

export default connect(mapStateToProps, mapStateToDispatch)(PageContent);
