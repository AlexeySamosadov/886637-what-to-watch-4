import * as React from "react";
import {connect} from "react-redux";
import history from "../../history/history";
import FilmInfoDescription from "../film-info-description/film-info-description";
import FilmList from "../film-list/film-list";
import {AppRoute} from "../const/const";
import {getFilms} from "../../reducer/data/selectors";
import {Operation as DataOperation} from "../../reducer/data/data";
import {AuthorizationStatus} from "../const/const";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {filterFilms} from "../utils/utils";
import Footer from "../footer/footer";
import {Film} from "../type";

interface Props {
    films: Film[] ,
    activeFilm: Film,
    onUpdateFavouriteFilms:(id:number,ar:number)=>void,
    authorizationStatus: string
}


const FilmInfo: React.FC<Props>= ({films, activeFilm, onUpdateFavouriteFilms, authorizationStatus}:Props) => {
  if (JSON.stringify(activeFilm) === `{}`) {
    history.push(AppRoute.MAIN);
  }
  const sameFilms = filterFilms(films, activeFilm.genre).slice(0, 4);
  const {name, backgroundImage, genre, released, posterImage, backgroundColor, id, isFavorite} = activeFilm;
  const styleCard = {
    backgroundColor,
  };

  const changeFavorite = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      if (isFavorite) {
        onUpdateFavouriteFilms(id, 0);
      } else {
        onUpdateFavouriteFilms(id, 1);
      }
    } else {
      history.push(AppRoute.SIGN_IN);
    }
  };


  return (
    <React.Fragment>
      <section className="movie-card movie-card--full" style={styleCard}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="#" onClick={(e)=>{
                e.preventDefault();
                history.push(AppRoute.MAIN);
              }} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>
            {authorizationStatus === AuthorizationStatus.AUTH ? (
              <a href="#" onClick={(e)=> {
                e.preventDefault();
                history.push(AppRoute.MY_LIST);
              }} className="user-block">
                <div onClick={()=>{
                  history.push(AppRoute.MY_LIST);
                }} className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </a>) :
              (< div className="user-block">
                <a href="#" className="user-block__link" onClick={(e)=> {
                  e.preventDefault();
                  history.push(AppRoute.SIGN_IN);
                }}>Sign in</a>
              </div>)}
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button onClick={()=> {
                  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                    history.push(AppRoute.SIGN_IN);
                  } else {
                    history.push(`${AppRoute.FILM_INFO}/${id}/${AppRoute.PLAYER}`);
                  }
                }}
                className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  onClick={changeFavorite}
                  className="btn btn--list movie-card__button" type="button">
                  {isFavorite ?

                    <>
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#remove"/>
                      </svg>
                      <span>Remove from list</span>
                    </>
                    :
                    <>
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"/>
                      </svg>
                      <span>My list</span>
                    </>

                  }
                </button>
                <a onClick={(e)=> {
                  e.preventDefault();
                  history.push(`${AppRoute.FILM_INFO}/${id}/${AppRoute.ADD_COMMENT}`);
                }} href="#" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt="The Grand Budapest Hotel poster" width="218"
                height="327"/>
            </div>
            <FilmInfoDescription activeFilm={activeFilm}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={sameFilms}/>
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
};



const mapStateToProps = (state) => ({
  films: getFilms(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapStateToDispatch = (dispatch) => ({
  onUpdateFavouriteFilms: (id, status) => {
    dispatch(DataOperation.postFavoriteFilm(id, status));
  },
});

export {FilmInfo};
export default connect(mapStateToProps, mapStateToDispatch)(FilmInfo);
