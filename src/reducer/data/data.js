import {extend} from "../../components/utils/utils.js";
import {adaptFilmData, adaptFilmsData} from "./adapt-data";
import StoreLocal from "../../components/localStorage/localStorage";

const localStorage = new StoreLocal(`films`);

const initializeState = {
  films: localStorage.getAll() || [],
  promoFilm: {},
  reviews: [],
  favouriteFilmList: [],
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
  },
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        localStorage.setItem(adaptFilmsData(response.data));
        dispatch(ActionCreators.loadFilms(localStorage.getAll()));
      });
  },
  loadPromoFilms: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreators.loadPromoFilm(adaptFilmData(response.data)));
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
    }).then(() => {
      dispatch(Operation.loadReviews(id));
    })
      .catch((err) => {
        throw err;
      });
  },
  loadFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response)=>{
        dispatch(ActionCreators.loadFavouriteFilms(adaptFilmsData(response.data)));
      });
  },
  postFavoriteFilm: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
      .then(()=>{
        dispatch(Operation.loadFilms());
        dispatch(Operation.loadPromoFilms());
        dispatch(Operation.loadFavoriteFilms());
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

export {reducer, Operation, ActionTypes, ActionCreators};
