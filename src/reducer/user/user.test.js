import {ActionCreators, ActionTypes, reducer} from "./user";
import {AuthorizationStatus} from "../../components/const/const";

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
