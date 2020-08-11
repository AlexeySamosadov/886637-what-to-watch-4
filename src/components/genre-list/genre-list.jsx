import * as React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreators} from "../../reducer/app-status/app-status";
import {changeFirstLetterUppercase} from "../utils/utils";
import {GenreType} from "../const/const";
import {getFilms} from "../../reducer/data/selectors";
import {getActiveGenre} from "../../reducer/app-status/selectors";

const GenreList = ({films, activeGenre, onSetGenre}) => {
  const setGenres = new Set();
  setGenres.add(GenreType.ALL);
  films.forEach((it)=> setGenres.add(it.genre));
  const genreList = Array.from(setGenres);

  return (
    <ul className="catalog__genres-list">
      {genreList.map((it, i) => (
        <li key={i} onClick={(evt)=>{
          evt.preventDefault();
          onSetGenre(it);
        }} className={`catalog__genres-item ${activeGenre === it && `catalog__genres-item--active`}`}>
          <a href="#" className="catalog__genres-link">{changeFirstLetterUppercase(it)}</a>
        </li>
      ))}
    </ul>
  );
};

GenreList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  })).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onSetGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  activeGenre: getActiveGenre(state),
});

const mapStateToDispatch = (dispatch) => ({
  onSetGenre: (filterType) => {
    dispatch(ActionCreators.setActiveGenre(filterType));
  }
});

export {GenreList};
export default connect(mapStateToProps, mapStateToDispatch)(GenreList);
