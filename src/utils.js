import { differenceInSeconds } from "date-fns";
var crypto = require('crypto');

// For the encryption
export function encryptData(data, public_key) {
  // publicEncrypt() method with its parameters 
  const encrypted = crypto.publicEncrypt(
    public_key,
    Buffer.from(data, 'utf8')).toString("base64");
  //console.log(encrypted);
  return encrypted;
}

export function checkError(error) {
  let msg = "ERROR IN SERVER";

  if (error.networkError) {
    msg = error.networkError.toString();
  }
  if (error.graphQLErrors)
    //console.log(error.graphQLErrors);
    error.graphQLErrors.map(({ message, locations, path }) => {
      /* if (message === "Not authenticated" || message === "jwt expired") {
          window.location.reload()
      } else {
          setInfo(message)
      } */

      msg = message.toString()
      //console.log(message);
    }
    );
  return msg;
}
//MANAGE MESSAGES
export function manageMsg(info) {
  //console.log(info);
  switch (info) {
    case "Not authenticated" || "jwt expired":
      window.location.reload()
      break;
    case "TypeError: Failed to fetch" || "ERROR IN SERVER":
      return "Technical error, please contact us to resolve this problem ASAP . Thanks for your understanding"
      break;
    case "PWD_SUCCESS":
      return "Password updated !"
      break;
    case "PWD_WRONG":
      return "Wrong password , verify your password"
      break;
    case "PROFILE_UPDATED":
      return "Profile updated !"
      break;
    case "COMPANY_EXIST":
      return "A company exist already with this informations"
      break;
    case "USER_EXIST":
    case "Error: USER_EXIST":
      return "Sorry, a user use this email"
      break;
    case "LOGIN_FAILLED":
      return "Invalid email or password "
      break;
    case "USER_NOT_FIND":
      return "Invalid email or password "
      break;
    case "ACCOUNT_CLOSED":
      return "Account closed, contact your Manager"
      break;
    case "NOT_ALLOW":
      return "Sorry you can\'t apply this request"
      break;
    case "EMPOYEE_EXIST":
      return "Please check carefully if you have information that will belongs to another account. Thanks"
      break;
    default: return "Technical error, please contact us to resolve this problem ASAP . Thanks for your understanding"
      break;
  }
}
/* export function encr(params) {
  //const bcrypt = require('bcryptjs')
} */
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1199px)`).matches;
  }
  return false;
}

function currentYPosition() {
  if (!window) {
    return;
  }
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);
  if (!elmID || !elm) {
    return;
  }
  var startY = currentYPosition();
  var stopY = elmYPosition(elm);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  let difference = differenceInSeconds(new Date(), date);

  if (difference < 60) return `${Math.floor(difference)} seconds`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} minutes`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} hours`;
  else if (difference < 86400 * 30)
    return `${Math.floor(difference / 86400)} days`;
  else if (difference < 86400 * 30 * 12)
    return `${Math.floor(difference / 86400 / 30)} months`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} years`;
}

export function generateRandomId() {
  let tempId = Math.random().toString();
  let uid = tempId.substr(2, tempId.length - 1);
  return uid;
}

export function getQueryParam(prop) {
  var params = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf("?") + 1)
  );
  var definitions = search.split("&");
  definitions.forEach(function (val, key) {
    var parts = val.split("=", 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
  return Object.entries(classes)
    .filter(entry => entry[1])
    .map(entry => entry[0])
    .join(" ");
}
