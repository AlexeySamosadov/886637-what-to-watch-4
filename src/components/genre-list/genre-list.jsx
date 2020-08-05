import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreators} from "../../reducer/app-status/app-status";
import {changeFirstLetterUppercase} from "../utils/utils";
import {genreType} from "../const/const";
import {getFilms} from "../../reducer/data/selectors";
import {getActiveGenre} from "../../reducer/app-status/selectors";

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

GenreList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  activeGenre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  activeGenre: getActiveGenre(state),
});

const mapStateToDispatch = (dispatch) => ({
  setGenre: (filterType) => {
    dispatch(ActionCreators.setActiveGenre(filterType));
  }
});

export {GenreList};
export default connect(mapStateToProps, mapStateToDispatch)(GenreList);
