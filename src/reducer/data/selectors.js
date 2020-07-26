import NameSpace from "../name-space.js";

export const getFilms = (state)=> {
  return state[NameSpace.DATA].films;
};

export const getPromoFilm = (state)=> {
  return state[NameSpace.DATA].promoFilm;
};

export const getReviews = (state)=> {
  return state[NameSpace.DATA].reviews;
};

export const getFavouriteFilmList = (state)=> {
  return state[NameSpace.DATA].favouriteFilmList;
};

export const getActiveFilm = (state)=> {
  return state[NameSpace.DATA].activeFilm;
};
