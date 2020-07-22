import React from "react";
import MovieCardDescriptionNav from "../film-info-description-nav/film-info-nav.jsx";
import FilmInfoDescriptionOverview from "../film-info-description-overview/film-info-description-overview.jsx";
import {connect} from "react-redux";
import {ActiveMenu} from "../utils/utils";
import FilmInfoDescriptionReviews from "../film-info-description-reviews/film-info-description-reviews.jsx";
import FilmInfoDescriptionDetails from "../film-info-description-details/film-info-description-details.jsx";

const renderAdditionalInfo = (activeMenu) => {
  switch (activeMenu) {

    case ActiveMenu.REVIEWS:
      return <FilmInfoDescriptionReviews/>;
    case ActiveMenu.DETAILS:
      return <FilmInfoDescriptionDetails/>;
    default:
      return <FilmInfoDescriptionOverview/>;
  }
};


const FilmInfoDescription = ({activeMenuFilmInfo}) => {
  return (
    <div className="movie-card__desc">
      <MovieCardDescriptionNav/>
      {renderAdditionalInfo(activeMenuFilmInfo)}
    </div>
  );
};

export {FilmInfoDescription};

const mapStateToProps = (state) => ({
  activeMenuFilmInfo: state.activeMenuFilmInfo,
});

export default connect(mapStateToProps, null)(FilmInfoDescription);
