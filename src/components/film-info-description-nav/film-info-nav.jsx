import React from "react";
import {connect} from "react-redux";
import {ActionCreators, Operation} from "../../reducer/data/data.js";
import {ActiveMenu} from "../utils/utils.js";
import PropTypes from "prop-types";


const MovieCardDescriptionNav = ({getActiveMenuFilmInfo, activeMenuFilmInfo, activeFilm, loadReviews}) => {
  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        <li className={`movie-nav__item ${activeMenuFilmInfo === ActiveMenu.OVERVIEW && `movie-nav__item--active`}`} >
          <a onClick={(evt)=>{
            evt.preventDefault();
            getActiveMenuFilmInfo(ActiveMenu.OVERVIEW);
          }} href="#" className="movie-nav__link">Overview</a>
        </li>
        <li className={`movie-nav__item ${activeMenuFilmInfo === ActiveMenu.DETAILS && `movie-nav__item--active`}`}>
          <a onClick={(evt)=>{
            evt.preventDefault();
            getActiveMenuFilmInfo(ActiveMenu.DETAILS);
          }} href="#" className="movie-nav__link">Details</a>
        </li>
        <li className={`movie-nav__item ${activeMenuFilmInfo === ActiveMenu.REVIEWS && `movie-nav__item--active`}`}>
          <a onClick={(evt)=>{
            evt.preventDefault();
            loadReviews(activeFilm.id);
            getActiveMenuFilmInfo(ActiveMenu.REVIEWS);
          }} href="#" className="movie-nav__link">Reviews</a>
        </li>
      </ul>
    </nav>
  );
};

MovieCardDescriptionNav.propTypes = {
  getActiveMenuFilmInfo: PropTypes.func.isRequired,
  activeMenuFilmInfo: PropTypes.string.isRequired,
  activeFilm: PropTypes.array.isRequired,
  loadReviews: PropTypes.func.isRequired,
};

export {MovieCardDescriptionNav};

const mapStateToDispatch = (dispatch) => ({
  getActiveMenuFilmInfo: (activeMenu) => {
    dispatch(ActionCreators.getActiveMenuFilmInfo(activeMenu));
  },
  loadReviews: (id) => {
    dispatch(Operation.loadReviews(id));
  },
});

const mapStateToProps = (state) => ({
  activeMenuFilmInfo: state.activeMenuFilmInfo,
  activeFilm: state.activeFilm,
});
export default connect(mapStateToProps, mapStateToDispatch)(MovieCardDescriptionNav);
