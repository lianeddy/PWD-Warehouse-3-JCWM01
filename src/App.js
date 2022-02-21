import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./jsx/pages/login/Login";
import Register from "./jsx/pages/register/Register";
import Verification from "./jsx/pages/register/Verification";
import AddProfileImages from "./jsx/example/AddProfileImages";
import UpdateProfileImages from "./jsx/example/UpdateProfileImages";
import ChangePassword from "./jsx/pages/change.password";
import ForgotPassword from "./jsx/pages/forgot.password";
import ForgotPasswordUpdate from "./jsx/pages/forgot.password.update";
import AdminProducts from "./jsx/pages/admin.products";
import DasboardExample from "./jsx/example/DashboardExample";

import { keepLoginAction, logoutUser } from "./redux/actions/user";
import { getCart } from "./redux/actions/cartAction";
import { parseJwt } from "./utility/parsing";

function App(props) {
  const userDataStorage = JSON.parse(localStorage.getItem("dataUser"));
  const userTokenStorage = localStorage.getItem("dataToken");

  const keepLogin = () => {
    if (userTokenStorage !== null) {
      const decodedJwt = parseJwt(userTokenStorage);

      // check token expired
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logoutUser();
      }

      //get user login action
      props.keepLoginAction(userTokenStorage);
    }
  };

  useEffect(() => {
    if (userTokenStorage !== null) {
      keepLogin();
    }
    if (userDataStorage !== null) {
      props.getCart(+userDataStorage.id_user);
    }
  }, []);

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <BrowserRouter>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/verification/:token" component={Verification} />
              <Route path="/login" component={Login} />
              <Route path="/change-password" component={ChangePassword} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route
                path="/forgot-password-update/:token"
                component={ForgotPasswordUpdate}
              />

              <Route component={AdminProducts} path="/admin-products/" />
              {/* <Route
                path="/users/multi-address"
                component={AppDataAlamatUserView}
              /> */}
              <Route
                path="/users/example-component/profile-image/add"
                component={AddProfileImages}
              />
              <Route
                path="/users/example-component/profile-image/update"
                component={UpdateProfileImages}
              />
              <Route path="/" component={DasboardExample} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
    cartGlobal: state.cartReducer,
  };
};

const mapDispatchToProps = {
  keepLoginAction,
  getCart,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
