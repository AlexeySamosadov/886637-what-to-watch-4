import {ActionCreators, ActionTypes, reducer} from "./user";
import {AuthorizationStatus} from "../../components/const/const";

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
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });
  });

  it(`Reducer with additional parameters should return new state`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionTypes.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });
  });
});

describe(`Actions creators work correctly`, () => {
  it(`Action creators for require authorization return correct action`, () => {
    expect(ActionCreators.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionTypes.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });
});
