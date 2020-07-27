import {extend} from "../../components/utils/utils.js";
import {adaptFilmData, adaptFilmsData} from "./adapt-data";

const initializeState = {
  films: [],
  promoFilm: {},
  reviews: [],
  favouriteFilmList: [],
  activeFilm: {},
};

const ActionTypes = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
  GET_ACTIVE_FILM: `GET_ACTIVE_FILM`,
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
  },
  postReview: (id, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {
      rating: review.rating,
      comment: review.comment
    })
      .catch((err) => {
        throw err;
      });
  },
  loadFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response)=>{
        dispatch(ActionCreators.loadFavouriteFilms(response.data));
      });
  },
  postFavoriteFilm: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
      .then(()=>{
      });
  },
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
  }
  return state;
};

export {reducer, Operation};
