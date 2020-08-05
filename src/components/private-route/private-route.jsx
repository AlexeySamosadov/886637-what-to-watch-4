import React from "react";
import PropTypes from 'prop-types';
import {Route, Redirect} from "react-router-dom";
import {AppRoute, AuthorizationStatus} from "../const/const";


const PrivateRoute = (props) => {
  const {auth, render} = props;
  return (
    <Route
      {...props}
      render={(routeProps) => auth === AuthorizationStatus.AUTH ? (
        render(routeProps)
      ) : (
        <Redirect to={AppRoute.SIGN_IN} />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
