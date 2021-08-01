import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from "./components/views/Footer/Footer";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <>
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, true)} />
          <Route exact path="/home" component={LandingPage} />
        </Switch>
      </div>
    </Router>
    <Footer />
    </>
  );
}

export default App;
