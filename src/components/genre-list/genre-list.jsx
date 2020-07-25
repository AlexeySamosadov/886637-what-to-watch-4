import React from "react";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer/data/data";
import {genreType, changeFirstLetterUppercase} from "../utils/utils.js";

const GenreList = ({films, activeGenre, setGenre}) => {
  const setGenres = new Set();
  setGenres.add(genreType.ALL);
  films.forEach((it)=> setGenres.add(it.genre));
  const genreList = Array.from(setGenres);

  return (
    <ul className="catalog__genres-list">
      {genreList.map((it, i) => (
        <li key={i} onClick={(evt)=>{
          evt.preventDefault();
          setGenre(it);
        }} className={`catalog__genres-item ${activeGenre === it && `catalog__genres-item--active`}`}>
          <a href="#" className="catalog__genres-link">{changeFirstLetterUppercase(it)}</a>
        </li>
      ))}
    </ul>
  );
};

export {GenreList};

const mapStateToProps = (state) => ({
  films: state.films,
  activeGenre: state.activeGenre,
});

const mapStateToDispatch = (dispatch) => ({
  setGenre: (filterType) => {
    dispatch(ActionCreators.setActiveGenre(filterType));
  }
});

export default connect(mapStateToProps, mapStateToDispatch)(GenreList);
