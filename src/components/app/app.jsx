import React from "react";
import Main from "../main/main.jsx";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import history from "../../history/history.js";
import FilmInfo from "../film-info/film-info.jsx";
import {FilmRoute} from "../const/const.js";
import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import MyList from "../my-list/my-list.jsx";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={FilmRoute.MAIN}
          render={()=><Main/>}
        />
        <Route exact path={FilmRoute.PLAYER}
          render={()=>
            <BigVideoPlayer/>
          }
        />
        <Route exact path={FilmRoute.FILM_INFO}
          render={()=><FilmInfo/>}
        />
        <Route exact path={FilmRoute.MY_LIST}
          render={()=><MyList/>}
        />
        {/* <PrivateRoute auth={authorizationStatus} path={}*/}
        {/*              render={}*/}
        {/* />*/}
        <Redirect to={FilmRoute.MAIN}/>
      </Switch>
    </Router>
  );
};

export default App;
