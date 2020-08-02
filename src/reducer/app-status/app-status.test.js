import {ActionCreators, ActionTypes, reducer} from "./app-status";
import {ActiveMenu, genreType} from "../../components/const/const";

const activeFilm = {
  backgroundColor: `#977461`,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Shutter_Island.jpg`,
  description: `In 1954, a U.S. Marshal investigates the disappearance of a murderer, who escaped from a hospital for the criminally insane.`,
  director: `Martin Scorsese`,
  genre: `Thriller`,
  id: 3,
  isFavorite: false,
  name: `Shutter Island`,
  posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Shutter_Island.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/shutter-island.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 4.1,
  released: 2010,
  runTime: 138,
  scoresCount: 1002557,
  starring: [`Leonardo DiCaprio`, `Emily Mortimer`, `Mark Ruffalo`],
  videoLink: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
};

const data = [activeFilm];

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

