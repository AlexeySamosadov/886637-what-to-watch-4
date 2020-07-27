import React from "react";
import Main from "../main/main.jsx";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import history from "../../history/history.js";
import FilmInfo from "../film-info/film-info.jsx";
import {AppRoute} from "../const/const.js";
import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import MyList from "../my-list/my-list.jsx";
import SignIn from "../sign-in/sign-in";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.MAIN}
          render={()=><Main/>}
        />
        <Route exact path={AppRoute.PLAYER}
          render={()=>
            <BigVideoPlayer/>
          }
        />
        <Route exact path={AppRoute.FILM_INFO}
          render={()=><FilmInfo/>}
        />
        <Route exact path={AppRoute.MY_LIST}
          render={()=><MyList/>}
        />
        <Route exact p={AppRoute.SIGN_IN}
          render={()=><SignIn/>}
        />
        {/* <PrivateRoute auth={authorizationStatus} path={}*/}
        {/*              render={}*/}
        {/* />*/}
        <Redirect to={AppRoute.MAIN}/>
      </Switch>
    </Router>
  );
};

export default App;
