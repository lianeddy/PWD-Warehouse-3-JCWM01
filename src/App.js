import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./jsx/pages/login";
import Landing from "./jsx/pages/landing";
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
import UploadProductImage from "./jsx/example/UploadProductImage";
import { Typeahead } from "react-bootstrap-typeahead";
import DasboardExample from "./jsx/example/DashboardExample";
import ProductAdmin from "./jsx/pages/ProductsAdmin";
import ProductDetail from "./jsx/pages/ProductDetail";
import UploadPaymentImages from "./jsx/example/UploadPaymentImages";
import ProductLists from "./jsx/pages/ProductLists";

// function App() {
//   const dispatch = useDispatch();

function App() {
  // useEffect(() => {
  //   //
  //   const userLocalStorage = localStorage.getItem("dataToken");

  //   if (userLocalStorage) {
  //     const userData = JSON.parse(userLocalStorage);
  //     // this.props.userKeepLogin(userData);
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
              {/* <Route path="/" component={DasboardExample} /> */}
              <Route path="/admin-product" component={ProductAdmin} />
              {/* <Route
                path="/product-detail/:id_master_produk"
                component={ProductDetail}
              /> */}
              <Route
                path="/upload-bukti-bayar"
                component={UploadPaymentImages}
              />
              {/* <Route path="/product-list" component={ProductLists} /> */}

              {/* <Route path="/" component={Landing} /> */}
              <Route path="/change-password" component={ChangePassword} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/uploadProduct" component={UploadProductImage} />
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
