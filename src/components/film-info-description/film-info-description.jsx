import React from "react";
import MovieCardDescriptionNav from "../film-info-description-nav/film-info-nav.jsx";
import FilmInfoDescriptionOverview from "../film-info-description-overview/film-info-description-overview.jsx";
import {connect} from "react-redux";
import {ActiveMenu} from "../utils/utils";
import FilmInfoDescriptionReviews from "../film-info-description-reviews/film-info-description-reviews.jsx";
import FilmInfoDescriptionDetails from "../film-info-description-details/film-info-description-details.jsx";

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
      {renderAdditionalInfo(activeFilm ,activeMenuFilmInfo)}
    </div>
  );
};

export {FilmInfoDescription};

const mapStateToProps = (state) => ({
  activeMenuFilmInfo: state.activeMenuFilmInfo,
  activeFilm: state.activeFilm,
});

export default connect(mapStateToProps, null)(FilmInfoDescription);
