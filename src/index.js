import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {createAPI} from "./api/api.js";
import {Operation} from "./reducer/data/data.js";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer.js";

const unUnAuthorized = () => {
  // Здесь будет авторизация
};

const api = createAPI(unUnAuthorized);

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
));

store.dispatch(Operation.loadFilms());
store.dispatch(Operation.loadPromoFilms());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
