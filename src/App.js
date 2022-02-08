import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./jsx/pages/login";
import AppDataAlamatUserView from "./jsx/components/AppDataAlamatUser/AppDataAlamatUserView";
import register from "./jsx/pages/register";
import verification from "./jsx/pages/verification";
import { connect } from "react-redux";
import AddProfileImages from "./jsx/example/AddProfileImages";
import UpdateProfileImages from "./jsx/example/UpdateProfileImages";
import ChangePassword from "./jsx/pages/change.password";
import ForgotPassword from "./jsx/pages/forgot.password";
import ForgotPasswordUpdate from "./jsx/pages/forgot.password.update";
import AdminProducts from "./jsx/pages/admin.products";
import DasboardExample from "./jsx/example/DashboardExample";
import { keepLoginAction } from "./redux/actions/user";
import { getCart } from "./redux/actions/cartAction";

function App(props) {
  const userTokenStorage = localStorage.getItem("dataToken");
  const userDataStorage = JSON.parse(localStorage.getItem("dataUser"));

  const keepLogin = () => {
    if (userTokenStorage) {
      //get user login action
      props.keepLoginAction(userTokenStorage);
    }
  };

  useEffect(() => {
    keepLogin();
    props.getCart(+userDataStorage.id_user);
  }, []);

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <BrowserRouter>
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

              <Route component={AdminProducts} path="/admin-products/" />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
