import React from "react";
import Main from "../main/main.jsx";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import history from "../../history/history.js";
import FilmInfo from "../film-info/film-info.jsx";
import {FilmRoute} from "../const/const.js";


// eslint-disable-next-line react/prop-types
const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={FilmRoute.MAIN}
          // render={()=><FilmInfo/>}

          render={()=><Main/>}
        />
        <Route exact path={FilmRoute.FILM_INFO}
          render={()=><FilmInfo/>}
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
