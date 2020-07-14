import React from "react";
import Main from "../main/main.jsx";
import {Switch, Route, Router} from "react-router-dom";
import history from "../../history/history.js";

// eslint-disable-next-line react/prop-types
const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/"
          render={()=>
            <Main/>
          }
        />
        <Route exact path="/dev-component"
          render={()=>
            <Main/>
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
