import React from "react";
import Main from "../main/main.jsx";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import history from "../../history/history.js";
import FilmInfo from "../film-info/film-info.jsx";
import {AppRoute} from "../const/const.js";
import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import MyList from "../my-list/my-list.jsx";
import SignIn from "../sign-in/sign-in";
import AddComment from "../add-comment/add-comment";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import PrivateRoute from "../private-route/private-route";
import {getFilms} from "../../reducer/data/selectors";

const App = ({authorizationStatus, films}) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.MAIN}
          render={()=><Main/>}
        />
        <Route exact path={`${AppRoute.FILM_INFO}/:id?`}
          render={(routeProps)=>{
            const id = parseInt(routeProps.match.params.id, 10);
            const activeFilm = films.find((offer) => offer.id === id);
            return (<FilmInfo
              activeFilm={activeFilm}
            />);
          }}
        />
        <PrivateRoute exact path={AppRoute.MY_LIST}
          auth={authorizationStatus}
          render={()=><MyList/>}
        />
        <PrivateRoute exact path={AppRoute.PLAYER}
          auth={authorizationStatus}
          render={()=><BigVideoPlayer/>}
        />
        <PrivateRoute exact path={AppRoute.ADD_COMMENT}
          auth={authorizationStatus}
          render={()=><AddComment/>}
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
