import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import history from "../../history/history";
import {AppRoute} from "../const/const";
import {getFavouriteFilmList} from "../../reducer/data/selectors";
import FilmList from "../film-list/film-list";

const MyList = ({favouriteFilmList}) => {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a onClick={(e)=>{
            e.preventDefault();
            history.push(AppRoute.MAIN);
          }} href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <a href="#" onClick={(e)=> {
          e.preventDefault();
          history.goBack();
        }} className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </a>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList films={favouriteFilmList}/>
      </section>
      <footer className="page-footer">
        <div className="logo">
          <a onClick={(e)=>{
            e.preventDefault();
            history.push(AppRoute.MAIN);
          }}
          href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};


MyList.propTypes = {
  favouriteFilmList: PropTypes.arrayOf(PropTypes.shape({
  }).isRequired).isRequired,
};


export {MyList};

const MapStateToProps = (state) => ({
  favouriteFilmList: getFavouriteFilmList(state),
});

export default connect(MapStateToProps, null)(MyList);
