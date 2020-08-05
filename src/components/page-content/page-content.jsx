import React from "react";
import Footer from "../footer/footer";
import GenreList from "../genre-list/genre-list";
import FilmList from "../film-list/film-list";
import ShowMoreButton from "../show-more-button/show-more-button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer/data/data";
import {getFilmsToRender} from "../../reducer/data/selectors";
import {getShowingFilmsNumber} from "../../reducer/app-status/selectors";

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

const mapStateToProps = (state) => ({
  showingFilmsNumber: getShowingFilmsNumber(state),
  filmsToRender: getFilmsToRender(state),
});

const mapStateToDispatch = (dispatch) => ({
  getActiveFilm(film) {
    dispatch(ActionCreators.getActiveFilm(film));
  }
});

export {PageContent};
export default connect(mapStateToProps, mapStateToDispatch)(PageContent);
