import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing, Navbar } from "./components/layout";
import { Register, Login } from "./components/auth";
import "./App.css";

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </>
    </Router>
  );
}

export default App;
