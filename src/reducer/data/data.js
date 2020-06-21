import {extend} from "../../components/utils/utils.js";

const initializeState = {
  films: [],
  promoFilm: {},
  reviews: [],
  favouriteFilmList: []
};

const ActionTypes = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
};

const ActionCreators = {
  loadFilms: (films) => {
    return {
      type: ActionTypes.LOAD_FILMS,
      payload: films,
    };
  },
  loadPromoFilm: (film) => {
    return {
      type: ActionTypes.LOAD_PROMO_FILM,
      payload: film,
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
  }
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
      });
    case ActionTypes.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionTypes.LOAD_FAVORITE_FILMS:
      return extend(state, {
        favouriteFilmList: action.payload,
      });
  }
  return state;
};

export {reducer, Operation};
