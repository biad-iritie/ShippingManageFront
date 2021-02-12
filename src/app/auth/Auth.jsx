/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import { getNavigationByUser } from "../redux/actions/NavigationAction";
//import jwtAuthService from "../services/jwtAuthService";
//import localStorageService from "../services/localStorageService";
import { useQuery } from '@apollo/client';
// import firebaseAuthService from "../services/firebase/firebaseAuthService";
import history from "history.js";

import { VERIFY_TOKEN } from '../../graphql/User';
import { addCompany } from "../redux/actions/CompanyAction"


const checkJwtAuth = (setUserData, data, addCompany) => {
  // You need to send token to your server to check token is valid
  // modify loginWithToken method in jwtService
  //let user = await jwtAuthService.loginWithToken();
  /* console.log("checkJwtAuth");
  console.log(data != undefined); */
  //console.log("checkJwtAuth");
  if (data !== undefined) {
    //console.log(data.verifyToken.__typename);
    //delete data.verifyToken.__typename
    //console.log(data.verifyToken);
    setUserData(data.verifyToken.user)
    //console.log(data.verifyToken.check);
    addCompany(data.verifyToken.check)
    //console.log(data);
    /* history.push({
      pathname: "/dashboard/analytics"
    }); */
  }
  else {
    history.push({
      pathname: "/session/signin"
    });
  }

  //return data;
};

// const checkFirebaseAuth = () => {
//   firebaseAuthService.checkAuthStatus(user => {
//     if (user) {
//       console.log(user.uid);
//       console.log(user.email);
//       console.log(user.emailVerified);
//     } else {
//       console.log("not logged in");
//     }
//   });
// };

const Auth = ({ children, setUserData, getNavigationByUser, addCompany }) => {
  //Check the TOKEN 
  const { loading, error, data } = useQuery(VERIFY_TOKEN);
  //console.log("Auth");
  //console.log(data);

  useEffect(() => {
    //console.log("useEffect");
    checkJwtAuth(setUserData, data, addCompany);
    getNavigationByUser();
  }, [setUserData, getNavigationByUser, data]);

  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  getNavigationByUser: PropTypes.func.isRequired,
  login: state.login,
  addCompany: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { setUserData, addCompany, getNavigationByUser })(
  Auth
);
