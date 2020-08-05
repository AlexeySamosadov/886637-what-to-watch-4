import React from "react";
import renderer from "react-test-renderer";
import FilmInfoDescriptionReviews from "./film-info-description-reviews";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {ActiveMenu, GenreType} from "../const/const";

const moskStore = configureStore([]);

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

const store = moskStore({
  APP_STATUS: {
    activeMenuFilmInfo: ActiveMenu.OVERVIEW,
    activeGenre: GenreType.ALL,
    showingFilmsNumber: 8,
  },
  DATA: {
    films,
    promoFilm: activeFilm,
    reviews: [{
      comment: `Unfortunately we don't have a reliable way to tell the true ratings of a movie.`,
      date: `2020-07-12T00:57:17.006Z`,
      id: 1,
      rating: 6.6,
      user: {id: 17, name: `Emely`}
    }, {
      comment: `I personally found this movie to be boring. Definitely one of the most boring movies I've ever seen.`,
      date: `2020-07-08T00:57:17.006Z`,
      id: 2,
      rating: 2.3,
      user: {id: 18, name: `Sophie`}
    }, {
      comment: `Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.`,
      date: `2020-07-28T00:57:17.006Z`,
      id: 3,
      rating: 7.7,
      user: {id: 14, name: `Corey`}
    }]
  },
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH
  }
});

it(`Correctly render component FilmInfoDescriptionReviews`, () => {
  const tree = renderer.create(
      <Provider store={store}>
        <FilmInfoDescriptionReviews/>
      </Provider>, {
        createNodeMock: () => ({})
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
