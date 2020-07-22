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

export const changeFirstLetterUppercase = (word) => word[0].toUpperCase() + word.slice(1);

export const formatMovieDuration = (movieDuration) => {
  return `${(movieDuration / 60).toFixed(0)}h ${movieDuration % 60}min`;
};
