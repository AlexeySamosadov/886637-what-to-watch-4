import * as React from "react";
import FilmInfoDescriptionNav from "../film-info-description-nav/film-info-description-nav";
import FilmInfoDescriptionOverview from "../film-info-description-overview/film-info-description-overview";
import {connect} from "react-redux";
import {ActiveMenu} from "../const/const";
import FilmInfoDescriptionReviews from "../film-info-description-reviews/film-info-description-reviews";
import FilmInfoDescriptionDetails from "../film-info-description-details/film-info-description-details";
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
  activeFilm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  activeMenuFilmInfo: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  activeMenuFilmInfo: getActiveMenuFilmInfo(state),
});

export {FilmInfoDescription};
export default connect(mapStateToProps, null)(FilmInfoDescription);
