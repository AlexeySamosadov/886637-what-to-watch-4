import React from "react";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer/data/data";

const GenreList = ({films, filterType, getFilterType}) => {
  console.log(`filterType`,filterType);
  return (
    <ul className="catalog__genres-list">

      <li className="catalog__genres-item catalog__genres-item--active">
        <a onClick={()=> getFilterType(`All genres`)} href="#" className="catalog__genres-link">All genres</a>
      </li>

      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Comedies</a>
      </li>

      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Crime</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Documentary</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Dramas</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Horror</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Kids & Family</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Romance</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Sci-Fi</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Thrillers</a>
      </li>
    </ul>
  );
};

export {GenreList};

const mapStateToProps = (state) => ({
  films: state.films,
  filterType: state.filterType,
});

const mapStateToDispatch = (dispatch) => ({
  getFilterType: (filterType) => {
    dispatch(ActionCreators.getFilterType(filterType));
  }
});

export default connect(mapStateToProps, mapStateToDispatch)(GenreList);
