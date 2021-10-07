import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./jsx/pages/login";
import Landing from "./jsx/pages/landing";
import register from "./jsx/pages/register";
import verification from "./jsx/pages/verification";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route path="/register" component={register} />
              <Route path="/verification/:token" component={verification} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
