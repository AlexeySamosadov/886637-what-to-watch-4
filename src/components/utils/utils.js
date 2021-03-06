import {Months, GenreType, RatingLevels} from "../const/const";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getRouteActiveFilm = (routeProps, films) => {
  const id = parseInt(routeProps.match.params.id, 10);
  return films.find((offer) => offer.id === id);
};

export const changeFirstLetterUppercase = (word) => word[0].toUpperCase() + word.slice(1);

export const formatMovieDuration = (movieDuration) => {
  return `${(movieDuration / 60).toFixed(0)}h ${movieDuration % 60}min`;
};

export const getRatingLevel = (rating) => {
  let ratingLevel;
  switch (true) {
    case rating < 3:
      ratingLevel = RatingLevels.BAD;
      break;
    case rating < 5:
      ratingLevel = RatingLevels.NORMAL;
      break;
    case rating < 8:
      ratingLevel = RatingLevels.GOOD;
      break;
    case rating < 10:
      ratingLevel = RatingLevels.VERY_GOOD;
      break;
    case rating = 10:
      ratingLevel = RatingLevels.AWESOME;
      break;
  }
  return ratingLevel;
};

export const filterFilms = (data, genres) => {
  let films = data;
  if (genres !== GenreType.ALL) {
    films = data.filter((it)=>it.genre === genres);
  }
  return films;
};

export const formatDateForReview = (date) => {
  const _date = new Date(date);
  const day = _date.getDate();
  const month = Months[_date.getMonth()];
  const year = _date.getFullYear();
  return `${month} ${day}, ${year}`;
};

