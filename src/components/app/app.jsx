import React from "react";
import Main from "../main/main";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import history from "../../history/history";
import FilmInfo from "../film-info/film-info";
import {AppRoute} from "../const/const";
import BigVideoPlayer from "../big-video-player/big-video-player";
import MyList from "../my-list/my-list";
import SignIn from "../sign-in/sign-in";
import AddComment from "../add-comment/add-comment";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import PrivateRoute from "../private-route/private-route";
import {getFilms} from "../../reducer/data/selectors";
import {getRouteActiveFilm} from "../utils/utils";


const App = ({authorizationStatus, films}) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.MAIN}
          render={()=><Main/>}
        />
        <Route exact path={`${AppRoute.FILM_INFO}/:id`}
          render={(routeProps)=>{
            const activeFilm = getRouteActiveFilm(routeProps, films);
            return (<FilmInfo
              activeFilm={activeFilm}
            />);
          }}
        />
        <PrivateRoute exact path={AppRoute.MY_LIST}
          auth={authorizationStatus}
          render={()=><MyList/>}
        />
        <Route exact path={`${AppRoute.FILM_INFO}/:id/${AppRoute.PLAYER}`}
          render={(routeProps)=>{
            const activeFilm = getRouteActiveFilm(routeProps, films);
            return (
              <BigVideoPlayer
                activeFilm={activeFilm}
              />
            );
          }}
        />
        <PrivateRoute exact path={`${AppRoute.FILM_INFO}/:id/${AppRoute.ADD_COMMENT}`}
          auth={authorizationStatus}
          render={(routeProps)=>{
            const activeFilm = getRouteActiveFilm(routeProps, films);
            return (
              <AddComment
                activeFilm={activeFilm}
              />
            );
          }}
        />
        <Route exact p={AppRoute.SIGN_IN}
          render={()=><SignIn/>}
        />
        <Redirect to={AppRoute.MAIN}/>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export {App};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  films: getFilms(state),
});

export default connect(mapStateToProps, null)(App);
