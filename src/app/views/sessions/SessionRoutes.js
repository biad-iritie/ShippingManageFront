import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NotFound from "./NotFound";
import ForgotPassword from "./ForgotPassword";
//OWN
//import CompSignIn from "./CompSignIn";
import CompSignUp from "./CompSignUp";
import Profile from "./Profile";
import ShipMan from "./ShipMan";
import { fullScreen } from "../../settings"

const settings = fullScreen;

const sessionRoutes = [
  {
    path: "/session/signup",
    component: SignUp,
    settings
  },
  {
    path: "/session/signin",
    component: SignIn,
    settings
  },
  {
    path: "/session/forgot-password",
    component: ForgotPassword,
    settings
  },
  {
    path: "/session/404",
    component: NotFound,
    settings
  },
  {
    path: "/session/profile",
    component: Profile,
  },
  //SHIPMAN INFO
  {
    path: "/Cshipman/info",
    component: ShipMan,
    //settings
  },
  {
    path: "/shipman/info",
    component: ShipMan,
    settings
  },
  {
    path: "/session/comp-sign-up",
    component: CompSignUp,
    settings
  },

];

export default sessionRoutes;
