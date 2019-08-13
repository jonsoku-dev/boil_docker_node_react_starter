import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing, Navbar, Alert } from "./components/layout";
import { Register, Login } from "./components/auth";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./store/actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
import { Dashboard } from "./components/dashboard";
import { CreateProfile, EditProfile, AddExp, AddEdu } from "./components/profile-form";
import { Profiles } from "./components/profiles";

// 토큰이 있으면 로그인을 유지시킨다. (껐다 껐을때..)
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExp} />
              <PrivateRoute exact path="/add-education" component={AddEdu} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
