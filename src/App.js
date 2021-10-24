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
import Profile from "./jsx/pages/profile";
import ProfileEdit from "./jsx/pages/profile.edit";
import AdminProducts from "./jsx/pages/admin.products";
import DasboardExample from "./jsx/example/DashboardExample";
import { keepLoginAction } from "./redux/actions/user";

function App(props) {
  // useEffect(() => {
  //   //
  //   const userLocalStorage = localStorage.getItem("dataToken");
  //   const userData = JSON.parse(userLocalStorage);
  //   console.log(userLocalStorage);

  //   // console.log(userData);
  //   if (userLocalStorage) {
  //     console.log("HERE");
  //     // const userData = JSON.parse(userLocalStorage);
  //     // this.props.keepLoginAction(userData);
  //     // this.props.getCartData(userData.id);
  //   } else {
  //     // this.props.checkStorage();
  //     console.log("Data localStorage tidak ada");
  //   }
  // }, []);

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <BrowserRouter>
            {props.userGlobal.isLogin ? (
              <DasboardExample />
            ) : (
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
                {/* Move Ke NavbarView Routenya */}
                {/* <Route component={Profile} path="/profile/" />
                <Route component={ProfileEdit} path="/profile-edit/:id" />
                <Route component={AdminProducts} path="/admin-products/" />

                <Route path="/admin-product" component={ProductAdmin} /> */}

                <Route path="/change-password" component={ChangePassword} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            )}
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {
  keepLoginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
