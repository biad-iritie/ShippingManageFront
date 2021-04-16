import React, { Fragment, useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "app/appContext";

const redirectRoute = props => {
  const { location, history, user } = props;
  const { pathname } = location;
  //console.log(user);
  if (user.role) {
    history.push({
      //pathname: "/session/signin",
      pathname: "/dashboard/analytics",
      state: { redirectUrl: pathname }
    });
  } else {
    history.push({
      pathname: "/session/signin",
      //pathname: "/dashboard/analytics",
      state: { redirectUrl: pathname }
    });
  }

};

const getAuthStatus = (props, routes) => {
  const { location, user } = props;
  const { pathname } = location;
  const matched = routes.find(r => r.path === pathname);
  const authenticated =
    matched && matched.auth && matched.auth.length
      ? matched.auth.includes(user.role)
      : true;

  return authenticated;
};

const AuthGuard = ({ children, ...props }) => {
  const { routes } = useContext(AppContext);

  let [authenticated, setAuthenticated] = useState(
    getAuthStatus(props, routes)
  );

  useEffect(() => {
    //console.log(authenticated);
    if (!authenticated) {
      redirectRoute(props);
    }
    setAuthenticated(getAuthStatus(props, routes));
  }, [setAuthenticated, authenticated, routes, props]);

  return authenticated ? <Fragment>{children}</Fragment> : null;
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
