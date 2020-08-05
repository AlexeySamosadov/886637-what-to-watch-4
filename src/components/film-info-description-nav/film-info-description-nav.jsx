import React from "react";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data";
import {ActionCreators} from "../../reducer/app-status/app-status";
import {ActiveMenu} from "../const/const";
import PropTypes from "prop-types";
import {getActiveMenuFilmInfo} from "../../reducer/app-status/selectors";

const FilmInfoDescriptionNav = ({setActiveMenuFilmInfo, activeMenuFilmInfo, activeFilm, loadReviews}) => {
  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        <li className={`movie-nav__item ${activeMenuFilmInfo === ActiveMenu.OVERVIEW && `movie-nav__item--active`}`} >
          <a onClick={(evt)=>{
            evt.preventDefault();
            setActiveMenuFilmInfo(ActiveMenu.OVERVIEW);
          }} href="#" className="movie-nav__link">Overview</a>
        </li>
        <li className={`movie-nav__item ${activeMenuFilmInfo === ActiveMenu.DETAILS && `movie-nav__item--active`}`}>
          <a onClick={(evt)=>{
            evt.preventDefault();
            setActiveMenuFilmInfo(ActiveMenu.DETAILS);
          }} href="#" className="movie-nav__link">Details</a>
        </li>
        <li className={`movie-nav__item ${activeMenuFilmInfo === ActiveMenu.REVIEWS && `movie-nav__item--active`}`}>
          <a onClick={(evt)=>{
            evt.preventDefault();
            loadReviews(activeFilm.id);
            setActiveMenuFilmInfo(ActiveMenu.REVIEWS);
          }} href="#" className="movie-nav__link">Reviews</a>
        </li>
      </ul>
    </nav>
  );
};

FilmInfoDescriptionNav.propTypes = {
  setActiveMenuFilmInfo: PropTypes.func.isRequired,
  activeMenuFilmInfo: PropTypes.string.isRequired,
  loadReviews: PropTypes.func.isRequired,
  activeFilm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToDispatch = (dispatch) => ({
  setActiveMenuFilmInfo: (activeMenu) => {
    dispatch(ActionCreators.getActiveMenuFilmInfo(activeMenu));
  },
  loadReviews: (id) => {
    dispatch(Operation.loadReviews(id));
  },
});

const mapStateToProps = (state) => ({
  activeMenuFilmInfo: getActiveMenuFilmInfo(state),
});

export {FilmInfoDescriptionNav};
export default connect(mapStateToProps, mapStateToDispatch)(FilmInfoDescriptionNav);
