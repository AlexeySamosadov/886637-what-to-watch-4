import React, {Fragment} from "react";
import {RatingLevels} from "../utils/utils.js";

const getRatingLevel = (rating) => {
  let ratingLevel;
  switch (true) {
    case rating > 2:
      ratingLevel = RatingLevels.BAD;
      break;
    case rating > 4:
      ratingLevel = RatingLevels.NORMAL;
      break;
    case rating > 6:
      ratingLevel = RatingLevels.GOOD;
      break;
    case rating > 8:
      ratingLevel = RatingLevels.VERY_GOOD;
      break;
    case rating > 9:
      ratingLevel = RatingLevels.AWESOME;
      break;
  }
  return ratingLevel;
};

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

        <p className="movie-card__starring"><strong>Starring: {starring}</strong></p>
      </div>
    </Fragment>
  );
};

export default FilmInfoDescriptionOverview;
