import React from "react";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer/data/data";
import {ActiveMenu} from "../utils/utils.js";

const MovieCardDescriptionNav = ({getActiveMenuFilmInfo, activeMenuFilmInfo}) => {
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
            getActiveMenuFilmInfo(ActiveMenu.REVIEWS);
          }} href="#" className="movie-nav__link">Reviews</a>
        </li>
      </ul>
    </nav>
  );
};

export {MovieCardDescriptionNav};

const mapStateToDispatch = (dispatch) => ({
  getActiveMenuFilmInfo: (activeMenu) => {
    dispatch(ActionCreators.getActiveMenuFilmInfo(activeMenu));
  }
});

const mapStateToProps = (state) => ({
  activeMenuFilmInfo: state.activeMenuFilmInfo,
});
export default connect(mapStateToProps, mapStateToDispatch)(MovieCardDescriptionNav);
