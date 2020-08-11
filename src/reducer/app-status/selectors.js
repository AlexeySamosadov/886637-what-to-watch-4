import NameSpace from "../name-space";

export const getActiveGenre = (state)=> {
  return state[NameSpace.APP_STATUS].activeGenre;
};

export const getActiveMenuFilmInfo = (state)=> {
  return state[NameSpace.APP_STATUS].activeMenuFilmInfo;
};

export const getShowingFilmsNumber = (state)=> {
  return state[NameSpace.APP_STATUS].showingFilmsNumber;
};
