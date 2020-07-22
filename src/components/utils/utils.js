export const extend = (a, b) => {
  return Object.assign({}, a, b);
};


export const FilmRoute = {
  MAIN: `/`,
  FILM_INFO: `/film-info`,
};

export const ActiveMenu = {
  OVERVIEW: `OVERVIEW`,
  DETAILS: `DETAILS`,
  REVIEWS: `REVIEWS`,
};

export const RatingLevels = {
  AWESOME: `Awesome`,
  VERY_GOOD: `Very good`,
  GOOD: `Good`,
  NORMAL: `Normal`,
  BAD: `Bad`,
};

export const changeFirstLetterUppercase = (word) => word[0].toUpperCase() + word.slice(1);

export const formatMovieDuration = (movieDuration) => {
  return `${(movieDuration / 60).toFixed(0)}h ${movieDuration % 60}min`;
};

export const getRatingLevel = (rating) => {
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

