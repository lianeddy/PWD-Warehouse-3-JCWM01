import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./jsx/pages/login";
import Landing from "./jsx/pages/landing";
import AppDataAlamatUserView from "./jsx/components/AppDataAlamatUser/AppDataAlamatUserView";
import register from "./jsx/pages/register";
import verification from "./jsx/pages/verification";
import AddProfileImages from "./jsx/example/AddProfileImages";
import UpdateProfileImages from "./jsx/example/UpdateProfileImages";
import ChangePassword from "./jsx/pages/change.password";
import ForgotPassword from "./jsx/pages/forgot.password";

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
              <Route
                path="/users/multi-address"
                component={AppDataAlamatUserView}
              />
              <Route
                path="/users/example-component/profile-image/add"
                component={AddProfileImages}
              />
              <Route
                path="/users/example-component/profile-image/update"
                component={UpdateProfileImages}
              />
              <Route path="/change-password" component={ChangePassword} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
