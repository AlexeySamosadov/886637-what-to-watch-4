import React from "react";
import MovieCardDescriptionNav from "../film-info-description-nav/film-info-nav.jsx";
import FilmInfoDescriptionOverview from "../film-info-description-overview/film-info-description-overview.jsx";
import {connect} from "react-redux";
import {ActiveMenu} from "../const/const.js";
import FilmInfoDescriptionReviews from "../film-info-description-reviews/film-info-description-reviews.jsx";
import FilmInfoDescriptionDetails from "../film-info-description-details/film-info-description-details.jsx";
import PropTypes from "prop-types";
import {getActiveMenuFilmInfo} from "../../reducer/app-status/selectors";
import {getActiveFilm} from "../../reducer/data/selectors";

const renderAdditionalInfo = (activeFilm, activeMenu) => {
  switch (activeMenu) {
    case ActiveMenu.REVIEWS:
      return <FilmInfoDescriptionReviews
        activeFilm={activeFilm}
      />;
    case ActiveMenu.DETAILS:
      return <FilmInfoDescriptionDetails
        activeFilm={activeFilm}
      />;
    default:
      return <FilmInfoDescriptionOverview
        activeFilm={activeFilm}
      />;
  }
};


const FilmInfoDescription = ({activeFilm, activeMenuFilmInfo}) => {
  return (
    <div className="movie-card__desc">
      <MovieCardDescriptionNav/>
      {renderAdditionalInfo(activeFilm, activeMenuFilmInfo)}
    </div>
  );
};

FilmInfoDescription.propTypes = {
  activeFilm: PropTypes.object.isRequired,
  activeMenuFilmInfo: PropTypes.string.isRequired,
};

export {FilmInfoDescription};

const mapStateToProps = (state) => ({
  activeMenuFilmInfo: getActiveMenuFilmInfo(state),
  activeFilm: getActiveFilm(state),
});

export default connect(mapStateToProps, null)(FilmInfoDescription);
