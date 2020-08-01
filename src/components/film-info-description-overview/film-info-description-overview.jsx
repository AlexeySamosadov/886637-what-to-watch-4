import React, {Fragment} from "react";
import {getRatingLevel} from "../utils/utils";
import PropTypes from "prop-types";

const FilmInfoDescriptionOverview = ({activeFilm}) => {
  const {rating, description, director, starring, scoresCount} = activeFilm;
  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingLevel(rating)}</span>
          <span className="movie-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className="movie-card__text">
        {description}

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)}.</strong></p>
      </div>
    </Fragment>
  );
};

FilmInfoDescriptionOverview.propTypes = {
  activeFilm: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
    scoresCount: PropTypes.number.isRequired,
  })
};

export default FilmInfoDescriptionOverview;
