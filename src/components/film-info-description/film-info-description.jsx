import React from "react";
import MovieCardDescriptionNav from "../film-info-description-nav/film-info-nav.jsx";
import FilmInfoDescriptionOverview from "../film-info-description-overview/film-info-description-overview.jsx";

const FilmInfoDescription = () => {
  return (
    <div className="movie-card__desc">
      <MovieCardDescriptionNav/>

      <FilmInfoDescriptionOverview/>
    </div>
  );
};

export default FilmInfoDescription;
