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

const App = ({authorizationStatus}) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.MAIN}
          render={()=><Main/>}
        />
        <Route exact path={AppRoute.FILM_INFO}
          render={()=><FilmInfo/>}
        />
        <Route exact p={AppRoute.SIGN_IN}
          render={()=><SignIn/>}
        />
        <PrivateRoute exact path={AppRoute.PLAYER}
          auth={authorizationStatus}
          render={()=><BigVideoPlayer/>}
        />
        <PrivateRoute exact path={AppRoute.MY_LIST}
          auth={authorizationStatus}
          render={()=><MyList/>}
        />
        <PrivateRoute exact path={AppRoute.ADD_COMMENT}
          auth={authorizationStatus}
          render={()=><AddComment/>}
        />
        <Redirect to={AppRoute.MAIN}/>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

export {App};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps, null)(App);
