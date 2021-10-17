import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./jsx/pages/login";
import Landing from "./jsx/pages/landing";
import AppDataAlamatUserView from "./jsx/components/AppDataAlamatUser/AppDataAlamatUserView";
import register from "./jsx/pages/register";
import verification from "./jsx/pages/verification";
import DasboardExample from "./jsx/example/DashboardExample";
import { connect } from "react-redux";

function App() {
  useEffect(() => {
    //
    const userLocalStorage = localStorage.getItem("dataToken");

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      // this.props.userKeepLogin(userData);
      // this.props.getCartData(userData.id);
    } else {
      // this.props.checkStorage();
      console.log("Data localStorage tidak ada");
    }
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
              <Route path="/" component={DasboardExample} />
              {/* <Route path="/" component={Landing} /> */}
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
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
