import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Auth from "pages/Auth";
import SignUp from "pages/SignUp";
import Dashboard from "pages/Dashboard";
import Profile from "pages/Profile";
import { store } from "store/store";

export const routes = {
  auth: {
    path: "/",
    exact: true,
    component: Auth,
  },
  signUp: {
    path: "/signUp",
    exact: false,
    component: SignUp,
  },
  dashboards: {
    path: "/dashboard",
    exact: false,
    component: Dashboard,
  },
  profile: {
    path: "/profile",
    exact: false,
    component: Profile,
  },
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {Object.values(routes).map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
