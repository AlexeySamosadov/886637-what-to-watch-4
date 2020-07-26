import {extend} from "../../components/utils/utils.js";
import {ActiveMenu, genreType} from "../../components/const/const.js";

const initializeState = {
  activeMenuFilmInfo: ActiveMenu.OVERVIEW,
  activeGenre: genreType.ALL,
  showingFilmsNumber: 8,
};

const ActionTypes = {
  GET_ACTIVE_MENU_FILM_INFO: `ACTIVE_MENU_FILM_INFO`,
  SET_ACTIVE_GENRE: `SET_ACTIVE_GENRE`,
  SHOW_MORE: `SHOW_MORE`,
};

export const ActionCreators = {
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
};

const reducer = (state = initializeState, action) => {
  switch (action.type) {
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
  }
  return state;
};

export {reducer};
