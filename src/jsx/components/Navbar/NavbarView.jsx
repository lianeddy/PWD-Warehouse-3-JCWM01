import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import AddProfileImages from "../../example/AddProfileImages";
import UpdateProfileImages from "../../example/UpdateProfileImages";
import AppDataAlamatUserView from "../AppDataAlamatUser/AppDataAlamatUserView";
import ProfileExample from "../../example/ProfileExample";
import CreateWarehouseComponent from "../AppWarehouse/CreateWarehouseComponent";
import AppPermintaanBarangView from "../AppPermintaanBarang/AppPermintaanBarangView";
import AppHistoryProdukView from "../AppHistoryProduk/AppHistoryProdukView";
import AppHistoryTransaksiAdminView from "../AppHistoryTransaksiAdmin/AppHistoryTransaksiAdminView";
import ProfileEdit from "../../pages/profile.edit";
import AdminProducts from "../../pages/admin.products";
import UploadPaymentImages from "../../pages/payment-proof/UploadPaymentImages";
import UploadProductImage from "../../example/UploadProductImage";
import ProductAdmin from "../../pages/product-admin/ProductsAdmin";
import ProductList from "../../pages/product-user/ProductLists";
import productDetail from "../../pages/product-detail-user/ProductDetail";
import AppTransaksiAdminView from "../AppTransaksiAdmin/AppTransaksiAdminView";
import AppTransaksiAdminDetail from "../AppTransaksiAdmin/AppTransaksiAdminDetail";
import Profile from "../../pages/profile";
import Cart from "../../pages/cart/cart";
import Checkout from "../../pages/checkout/Checkout";
import Orders from "../../pages/orders/order";
import Landing from "../../pages/landing/Landing";

const NavbarView = (props) => {
  const [pageAdmin, setPageAdmin] = useState([
    // {
    //   path: "/profile",
    //   component: ProfileExample,
    // },
    {
      path: "/warehouse",
      component: CreateWarehouseComponent,
    },
    {
      path: "/permintaan-barang",
      component: AppPermintaanBarangView,
    },
    {
      path: "/history-barang",
      component: AppHistoryProdukView,
    },
    {
      path: "/history-transaksi",
      component: AppHistoryTransaksiAdminView,
    },
    {
      path: "/profileold/",
      component: ProfileExample,
    },
    {
      path: "/profileold-edit/",
      component: ProfileEdit,
    },
    {
      path: "/admin-products/",
      component: AdminProducts,
    },
    {
      path: "/admin-product/",
      component: ProductAdmin,
    },
    {
      path: "/product-detail/:id_master_produk",
      component: productDetail,
    },
    {
      path: "/uploadProduct/",
      component: UploadProductImage,
    },
    {
      path: "/products",
      component: ProductAdmin,
    },
    {
      path: "/transactions/detail/:id_transaksi_master_produk",
      component: AppTransaksiAdminDetail,
    },
    {
      path: "/transactions/",
      component: AppTransaksiAdminView,
    },
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/profile-edit/:id",
      component: ProfileEdit,
    },
  ]);

  const [pageCustomer, setPageCustomer] = useState([
    // {
    //   path: "/profile",
    //   component: ProfileExample,
    // },

    {
      path: "/profileold/",
      component: ProfileExample,
    },
    {
      path: "/profileold-edit/",
      component: ProfileEdit,
    },
    {
      path: "/upload-bukti-bayar/",
      component: UploadPaymentImages,
    },
    {
      path: "/product-detail/:id_master_produk",
      component: productDetail,
    },
    {
      path: "/transactions/",
      component: UploadProductImage,
    },
    {
      path: "/products",
      component: ProductList,
    },
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/profile-edit/:id",
      component: ProfileEdit,
    },
    {
      path: "/cart",
      component: Cart,
    },
    {
      path: "/checkout",
      component: Checkout,
    },
    {
      path: "/users/multi-address",
      component: AppDataAlamatUserView,
    },
    {
      path: "/orders",
      component: Orders,
    },
    {
      path: "/",
      component: Landing,
    },
  ]);

  const [pageNonLogin, setPageNonLogin] = useState([
    {
      path: "/products",
      component: ProductList,
    },
    {
      path: "/product-detail/:id_master_produk",
      component: productDetail,
    },
    {
      path: "/",
      component: Landing,
    },
  ]);

  const renderItemAdmin = () => {
    let output = pageAdmin.map((el, index) => {
      const { path, component } = el;
      return <Route path={path} component={component} key={index} />;
    });
    return output;
  };

  const renderItemCustomer = () => {
    let output = pageCustomer.map((el, index) => {
      const { path, component } = el;
      return <Route path={path} component={component} key={index} />;
    });
    return output;
  };

  const renderItemNonLogin = () => {
    let output = pageNonLogin.map((el, index) => {
      const { path, component } = el;
      return <Route path={path} component={component} key={index} />;
    });
    return output;
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">Halaman Utama</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-flex justify-content-end"
          >
            <Nav className="me-auto">
              {!props.userGlobal.id_role ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : null}
              {/* <Nav.Link href="#link">Link</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          <NavDropdown title="Category" id="basic-nav-dropdown">
            <NavDropdown.Item href="/products?id_category=1">
              Sport Performance
            </NavDropdown.Item>
            <NavDropdown.Item href="/products?id_category=2">
              Core / Neo
            </NavDropdown.Item>
            <NavDropdown.Item href="/products?id_category=3">
              Originals
            </NavDropdown.Item>
          </NavDropdown>
          <form action="/products" class="d-flex flex-row">
            <input
              name="product"
              class="form-control me-2 p-2"
              type="search products"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success p-2">Search</button>
          </form>
        </Container>
      </Navbar>
      {/* <div className="p-2"> */}
      <div>
        <Switch>
          {props.userGlobal.id_role === 1
            ? renderItemAdmin()
            : props.userGlobal.id_role === 2
            ? renderItemAdmin()
            : props.userGlobal.id_role === 3
            ? renderItemCustomer()
            : props.userGlobal.id_role === null
            ? renderItemNonLogin()
            : null}

          {/* {props.userGlobal.id_role < 3
            ? renderItemAdmin()
            : renderItemCustomer()} */}
          {/* renderItemNonLogin() */}
          {/* Render Navbar User Not Login Here */}
        </Switch>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarView);
