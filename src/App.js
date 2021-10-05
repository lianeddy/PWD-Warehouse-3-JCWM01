import React from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./jsx/pages/login";
import Landing from "./jsx/pages/landing";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route path="/account" component={Login} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
