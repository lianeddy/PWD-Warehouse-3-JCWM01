import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Login from "./jsx/pages/login";
import Landing from "./jsx/pages/landing";
import AppDataAlamatUserView from "./jsx/components/AppDataAlamatUser/AppDataAlamatUserView";
import register from "./jsx/pages/register";
import verification from "./jsx/pages/verification";
import AddProfileImages from "./jsx/example/AddProfileImages";
import UpdateProfileImages from "./jsx/example/UpdateProfileImages";
import ChangePassword from "./jsx/pages/change.password";
import ForgotPassword from "./jsx/pages/forgot.password";
import UploadProductImage from "./jsx/example/UploadProductImage";
import { Typeahead } from "react-bootstrap-typeahead";
import DasboardExample from "./jsx/example/DashboardExample";
import ProductAdmin from "./jsx/pages/ProductsAdmin";
import ProductDetail from "./jsx/pages/ProductDetail";
import UploadPaymentImages from "./jsx/example/UploadPaymentImages";
import ProductLists from "./jsx/pages/ProductLists";

function App() {
  const dispatch = useDispatch();

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route path="/register" component={register} />
              <Route path="/verification/:token" component={verification} />
              <Route path="/login" component={Login} />
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
              <Route
                path="/product-detail/:id_master_produk"
                component={ProductDetail}
              />
              <Route
                path="/upload-bukti-bayar"
                component={UploadPaymentImages}
              />
              <Route path="/product-list" component={ProductLists} />

              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
