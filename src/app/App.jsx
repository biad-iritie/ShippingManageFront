//import "../fake-db";
import "../styles/_app.scss";
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import AppContext from "./appContext";
import history from "history.js";
import { IntlProvider } from "react-intl"
import routes from "./RootRoutes";
import { Store } from "./redux/Store";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayoutSFC";
import AuthGuard from "./auth/AuthGuard";
import Wrappers from "./views/components/Wrappers.js"

/* import Eng from "../lang/en-US.json";
import Fr from "../lang/fr.json";

//CHECKING THE LOCAL LANGUAGE
const local = navigator.language;
let lang;
//console.log(local);
local === "fr" ? lang = Fr : lang = Eng; */

const App = () => {
  return (

    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <Wrappers>
          <MatxTheme>
            <Auth>
              <Router history={history}>
                <AuthGuard>
                  <MatxLayout />
                </AuthGuard>
              </Router>
            </Auth>
          </MatxTheme>
        </Wrappers>
      </Provider>
    </AppContext.Provider>




  );
};

export default App;
