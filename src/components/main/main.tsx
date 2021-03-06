import * as React from "react";
import {connect} from "react-redux";
import PageContent from "../page-content/page-content";
import {Operation as DataOperation} from "../../reducer/data/data";
import history from "../../history/history";
import {AppRoute, AuthorizationStatus} from "../const/const";
import {getPromoFilm} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Film} from "../type";

interface Props {
  promoFilm: Film,
  authorizationStatus: string,
  onUpdateFavouriteFilms: (id:number, ar:number) => void,
}

const Main:React.FC<Props> = ({promoFilm, authorizationStatus, onUpdateFavouriteFilms}: Props) => {
  const {name, genre, released, posterImage, backgroundImage, id, isFavorite} = promoFilm;

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
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
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
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img onClick={()=> {
                history.push(`${AppRoute.FILM_INFO}/${id}`);
              }} src={posterImage} alt={`${name} poster`} width="218"
              height="327"/>
            </div>

            <div className="movie-card__desc">
              <h2 onClick={()=> {
                history.push(`${AppRoute.FILM_INFO}/${id}`);
              }} className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button onClick={()=> {
                  history.push(`${AppRoute.FILM_INFO}/${id}/${AppRoute.PLAYER}`);
                }}
                className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use href="#play-s"/>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <PageContent/>
    </React.Fragment>
  );
};

// Main.propTypes = {
//   promoFilm: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     genre: PropTypes.string,
//     released: PropTypes.number,
//     isFavorite: PropTypes.bool,
//     posterImage: PropTypes.string,
//     backgroundImage: PropTypes.string,
//   }),
//   onUpdateFavouriteFilms: PropTypes.func.isRequired,
//   authorizationStatus: PropTypes.string.isRequired,
// };

const mapStateToProps = (state) => ({
  promoFilm: getPromoFilm(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapStateToDispatch = (dispatch) => ({
  onUpdateFavouriteFilms: (id, status) => {
    dispatch(DataOperation.postFavoriteFilm(id, status));
  },
});

export {Main};
export default connect(mapStateToProps, mapStateToDispatch)(Main);
