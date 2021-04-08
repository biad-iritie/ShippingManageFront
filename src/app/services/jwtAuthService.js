//import axios from "axios";
import localStorageService from "./localStorageService";

/* class JwtAuthService {
 */
// Dummy user object just for the demo
/* const user = {
  userId: "1",
  role: 'ADMIN',
  displayName: "Jason Alexander",
  email: "jasonalexander@gmail.com",
  photoURL: "/assets/images/face-6.jpg",
  age: 25,
  token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh"
} */

// You need to send http request with email and passsword to your server in this method
// Your server will return user object & a Token
// User should have role property
// You can define roles in app/auth/authRoles.js
export function loginWithEmailAndPassword(user, token) {
  //alert("ok")
  /* return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.user);
    }, 1000);
  }).then(data => {
    // Login successful
    // Save token
    this.setSession(data.token);
    // Set user
    this.setUser(data);
    return data;
  }); */

  setSession(token);
  // Set user
  setUser(user);
  return user;
};

/**
 * Sign Up the customer
 * @param {string} email of the customer
 * @param {*} names 
 * @param {*} phone 
 */
export function signUpCustomerService(email, names, phone) {
  //console.log(email, names, phone);
  /* const [signUp, { data, error }] = useMutation(SIGN_UP_CUSTOMER);
  signUp({
    variables: { email: email, password: password, names: names, phone: phone },
  }) */
  //const { loading, error, data } = useQuery(FEED)
  /* const [result, reexecuteQuery] = useQuery({
  query: FEED,
  }); 
  console.log(result);*/
  /* if (!error) {
    // Login successful
    // Save token
    setSession(data.token);
    // Set user
    setUser(data.user);
    return data;
  } else {
    alert("ERROR")
  } */
}
// You need to send http requst with existing token to your server to check token is valid
// This method is being used when user logged in & app is reloaded
export function loginWithToken() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.user);
    }, 100);
  }).then(data => {
    // Token is valid
    this.setSession(data.token);
    this.setUser(data);
    return data;
  });
};

export function logout() {
  setSession(null);
  removeUser();
}

// Set token to all http request header, so you don't need to attach everytime
export function setSession(token) {
  if (token) {
    localStorage.setItem("jwt_token", token);
    //axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    localStorage.removeItem("jwt_token");
    //delete axios.defaults.headers.common["Authorization"];
  }
};

// Save user to localstorage
export function setUser(user) {
  localStorageService.setItem("auth_user", user);
}
// Remove user from localstorage
export function removeUser() {
  localStorage.removeItem("auth_user");
}

/* export default new JwtAuthService(); */