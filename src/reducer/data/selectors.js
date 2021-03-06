import NameSpace from "../name-space";
import {createSelector} from "reselect";
import {getActiveGenre, getShowingFilmsNumber} from "../app-status/selectors";
import {filterFilms} from "../../components/utils/utils";

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

export const getFilmsToRender = createSelector(
    getFilms,
    getActiveGenre,
    getShowingFilmsNumber, (films, genre, filmsCount) => {
      const filteredFilms = filterFilms(films, genre);
      return filteredFilms.slice(0, filmsCount);
    });
