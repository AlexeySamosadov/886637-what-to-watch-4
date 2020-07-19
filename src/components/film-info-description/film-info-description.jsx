import React from "react";
import MovieCardDescriptionNav from "../film-info-description-nav/film-info-nav.jsx";
import FilmInfoDescriptionOverview from "../film-info-description-overview/film-info-description-overview.jsx";
import {connect} from "react-redux";

const FilmInfoDescription = ({activeMenuFilmInfo}) => {
  console.log(activeMenuFilmInfo);
  return (
    <div className="movie-card__desc">
      <MovieCardDescriptionNav/>

      <FilmInfoDescriptionOverview/>
    </div>
  );
};

export {FilmInfoDescription};

const mapStateToProps = (state) => ({
  activeMenuFilmInfo: state.activeMenuFilmInfo,
});

export default connect(mapStateToProps, null)(FilmInfoDescription);
