import {extend} from "../../components/utils/utils.js";
import {adaptFilmData, adaptFilmsData} from "./adapt-data";
import {ActiveMenu, genreType} from "../../components/const/const.js";

const initializeState = {
  films: [],
  promoFilm: {},
  reviews: [],
  favouriteFilmList: [],
  activeFilm: {},
  activeMenuFilmInfo: ActiveMenu.OVERVIEW,
  activeGenre: genreType.ALL,
  showingFilmsNumber: 8,
  isRenderButton: true,
  filmToWatch: null,
};

const ActionTypes = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
  GET_ACTIVE_FILM: `GET_ACTIVE_FILM`,
  GET_ACTIVE_MENU_FILM_INFO: `ACTIVE_MENU_FILM_INFO`,
  SET_ACTIVE_GENRE: `SET_ACTIVE_GENRE`,
  SHOW_MORE: `SHOW_MORE`,
  SET_FILM_TO_WATCH: `SET_FILM_TO_WATCH`,

};

export const ActionCreators = {
  loadFilms: (films) => {
    return {
      type: ActionTypes.LOAD_FILMS,
      payload: adaptFilmsData(films),
    };
  },
  loadPromoFilm: (film) => {
    return {
      type: ActionTypes.LOAD_PROMO_FILM,
      payload: adaptFilmData(film),
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionTypes.LOAD_REVIEWS,
      payload: reviews,
    };
  },
  loadFavouriteFilms: (films) => {
    return {
      type: ActionTypes.LOAD_FAVORITE_FILMS,
      payload: films,
    };
  },
  getActiveFilm: (film) => {
    return {
      type: ActionTypes.GET_ACTIVE_FILM,
      payload: film,
    };
  },
  getActiveMenuFilmInfo: (activeMenu) => {
    return {
      type: ActionTypes.GET_ACTIVE_MENU_FILM_INFO,
      payload: activeMenu,
    };
  },
  setActiveGenre: (filterType) => {
    return {
      type: ActionTypes.SET_ACTIVE_GENRE,
      payload: filterType,
    };
  },
  showMore: () => ({
    type: ActionTypes.SHOW_MORE,
    payload: 8,
  }),
  setFilmToWatch: (film) => ({
    type: ActionTypes.SET_FILM_TO_WATCH,
    payload: film
  }),
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreators.loadFilms(response.data));
      });
  },
  loadPromoFilms: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreators.loadPromoFilm(response.data));
      });
  },
  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreators.loadReviews(response.data));
      });
  }
};


const reducer = (state = initializeState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
      });
    case ActionTypes.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload,
        activeFilm: action.payload,
      });
    case ActionTypes.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionTypes.LOAD_FAVORITE_FILMS:
      return extend(state, {
        favouriteFilmList: action.payload,
      });
    case ActionTypes.GET_ACTIVE_FILM:
      return extend(state, {
        activeFilm: action.payload,
      });
    case ActionTypes.GET_ACTIVE_MENU_FILM_INFO:
      return extend(state, {
        activeMenuFilmInfo: action.payload,
      });
    case ActionTypes.SET_ACTIVE_GENRE:
      return extend(state, {
        activeGenre: action.payload,
      });
    case ActionTypes.SHOW_MORE:
      return extend(state, {
        showingFilmsNumber: state.showingFilmsNumber + action.payload,
      });
    case ActionTypes.SET_FILM_TO_WATCH:
      return extend(state, {
        filmToWatch: action.payload
      });
  }
  return state;
};

export {reducer, Operation};
