import {ActionCreators, ActionTypes, reducer} from "./app-status";
import {ActiveMenu, genreType} from "../../components/const/const";

describe(`Reducer and initial state creators work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer({
      activeMenuFilmInfo: ActiveMenu.OVERVIEW,
      activeGenre: genreType.ALL,
      showingFilmsNumber: 8,
    }, {})).toEqual({
      activeMenuFilmInfo: ActiveMenu.OVERVIEW,
      activeGenre: genreType.ALL,
      showingFilmsNumber: 8,
    });
  });

  it(`Reducer with additional parameter should return new state`, () => {
    expect(reducer({
      activeMenuFilmInfo: ActiveMenu.OVERVIEW,
      activeGenre: genreType.ALL,
      showingFilmsNumber: 8,
    }, {
      type: ActionTypes.GET_ACTIVE_MENU_FILM_INFO,
      payload: ActiveMenu.REVIEWS,
    })).toEqual({
      activeMenuFilmInfo: ActiveMenu.REVIEWS,
      activeGenre: genreType.ALL,
      showingFilmsNumber: 8,
    });
  });

  it(`Reducer with additional parameter should return new state`, () => {
    expect(reducer({
      activeMenuFilmInfo: ActiveMenu.OVERVIEW,
      activeGenre: genreType.ALL,
      showingFilmsNumber: 8,
    }, {
      type: ActionTypes.SET_ACTIVE_GENRE,
      payload: `Action`
    })).toEqual({
      activeMenuFilmInfo: ActiveMenu.OVERVIEW,
      activeGenre: `Action`,
      showingFilmsNumber: 8,
    });
  });

  it(`Reducer with additional parameter should return new state`, () => {
    expect(reducer({
      activeMenuFilmInfo: ActiveMenu.OVERVIEW,
      activeGenre: genreType.ALL,
      showingFilmsNumber: 8,
    }, {
      type: ActionTypes.SHOW_MORE,
      payload: 8,
    })).toEqual({
      activeMenuFilmInfo: ActiveMenu.OVERVIEW,
      activeGenre: genreType.ALL,
      showingFilmsNumber: 16,
    });
  });
});

describe(`Actions creators work correctly`, () => {
  it(`Action creators for change genre return correct action`, () => {
    expect(ActionCreators.setActiveGenre(`filterType`)).toEqual({
      type: ActionTypes.SET_ACTIVE_GENRE,
      payload: `filterType`,
    });
  });

  it(`Action creators for change active menu return correct action`, () => {
    expect(ActionCreators.getActiveMenuFilmInfo(ActiveMenu.DETAILS)).toEqual({
      type: ActionTypes.GET_ACTIVE_MENU_FILM_INFO,
      payload: ActiveMenu.DETAILS,
    });
  });

  it(`Action creators for increment showed return correct action`, () => {
    expect(ActionCreators.showMore()).toEqual({
      type: ActionTypes.SHOW_MORE,
      payload: 8,
    });
  });
});

