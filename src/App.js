import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./jsx/pages/login";
import Landing from "./jsx/pages/landing";
import AppDataAlamatUserView from "./jsx/components/AppDataAlamatUser/AppDataAlamatUserView";
import register from "./jsx/pages/register";
import verification from "./jsx/pages/verification";
import ChangePassword from "./jsx/pages/change.password";
import ForgotPassword from "./jsx/pages/forgot.password";
import ForgotPasswordUpdate from "./jsx/pages/forgot.password.update";
import Profile from "./jsx/pages/profile";
import ProfileEdit from "./jsx/pages/profile.edit";
import AdminProducts from "./jsx/pages/admin.products";
import AddProfileImages from "./jsx/example/AddProfileImages";
import UpdateProfileImages from "./jsx/example/UpdateProfileImages";
import UploadProductImage from "./jsx/example/UploadProductImage";
import { Typeahead } from "react-bootstrap-typeahead";
import DasboardExample from "./jsx/example/DashboardExample";

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
              <Route path="/change-password" component={ChangePassword} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route
                path="/forgot-password-update/:token"
                component={ForgotPasswordUpdate}
              />
              <Route component={Profile} path="/profile/" />
              <Route component={ProfileEdit} path="/profile-edit/:id" />
              <Route component={AdminProducts} path="/admin-products/" />

              {/* <Route */}
              {/* <Route
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
              <Route path="/uploadProduct" component={UploadProductImage} />
              <Route path="/" component={Landing} />
              <Route
                path="/users/example-component/typehead"
                component={Typeahead}
              /> */}
              <Route path="/" component={DasboardExample} />
              {/* <Route path="/" component={Landing} /> */}
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
