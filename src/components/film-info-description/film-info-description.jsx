import React from "react";
import FilmInfoDescriptionNav from "../film-info-description-nav/film-info-description-nav.jsx";
import FilmInfoDescriptionOverview from "../film-info-description-overview/film-info-description-overview.jsx";
import {connect} from "react-redux";
import {ActiveMenu} from "../const/const.js";
import FilmInfoDescriptionReviews from "../film-info-description-reviews/film-info-description-reviews.jsx";
import FilmInfoDescriptionDetails from "../film-info-description-details/film-info-description-details.jsx";
import PropTypes from "prop-types";
import {getActiveMenuFilmInfo} from "../../reducer/app-status/selectors";

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
      <FilmInfoDescriptionNav activeFilm={activeFilm}/>
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
});

export default connect(mapStateToProps, null)(FilmInfoDescription);
