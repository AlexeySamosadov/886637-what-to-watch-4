import React from "react";
import renderer from "react-test-renderer";
import FilmInfoDescriptionNav from "./film-info-description-nav";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {ActiveMenu, genreType} from "../const/const";

const mockStore = configureStore([]);

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

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

const films = [activeFilm];

const store = mockStore({
  APP_STATUS: {
    activeMenuFilmInfo: ActiveMenu.OVERVIEW,
    activeGenre: genreType.ALL,
    showingFilmsNumber: 8,
  },
  DATA: {
    films,
    promoFilm: activeFilm,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH
  }
});

it(`Correctly render component FilmInfoDescriptionNav`, () => {
  const tree = renderer.create(
      <Provider store={store}>
        <FilmInfoDescriptionNav
          activeFilm={activeFilm}
        />
      </Provider>, {
        createNodeMock: () => ({})
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
