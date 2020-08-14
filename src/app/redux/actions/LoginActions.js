import { setSession, setUser } from "../../services/jwtAuthService";
//import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";


export function loading() {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });
    return null
  }

}
export function error(error) {
  return dispatch => {
    dispatch({
      type: LOGIN_ERROR,
      payload: error
    });
  }
}
export function loginWithEmailAndPassword(user, token) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });
    /* console.log("Action loginWithEmailAndPassword");
    console.log(user, token); */

    /* jwtAuthService.loginWithEmailAndPassword(user, token)
      .then((user) => { */
    setSession(token);
    // Set user
    //console.log(user);
    setUser(user);
    dispatch(setUserData(user));

    history.push({
      pathname: "/dashboard/analytics"
    });

    return dispatch({
      type: LOGIN_SUCCESS
    });
    /* })
    .catch((error) => {
      return dispatch({
        type: LOGIN_ERROR,
        payload: error
      });
    }); */
  };
}

export function signUpCustomer({ email, password, names, phone }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });
    /*jwtAuthService
      .signUpCustomerService(email, password, names, phone)
       .then(result => {
        if (!result.error) {
          dispatch(setUserData(result.user));

          history.push({
            pathname: "/"
          });

          return dispatch({
            type: SIGNUP_SUCCESS
          });
        } else {
          alert("ERRor Login Action")
        }

      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      }); */
  };
}

export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}
/* export function firebaseLoginEmailPassword({ email, password }) {
  return dispatch => {
    FirebaseAuthService.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          dispatch(
            setUserData({
              userId: "1",
              role: "ADMIN",
              displayName: "Watson Joyce",
              email: "watsonjoyce@gmail.com",
              photoURL: "/assets/images/face-7.jpg",
              age: 25,
              token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
              ...user
            })
          );

          history.push({
            pathname: "/"
          });

          return dispatch({
            type: LOGIN_SUCCESS
          });
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            payload: "Login Failed"
          });
        }
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
} */
