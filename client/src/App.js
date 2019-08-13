import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing, Navbar, Alert } from "./components/layout";
import { Register, Login } from "./components/auth";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
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
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
}

export default App;
