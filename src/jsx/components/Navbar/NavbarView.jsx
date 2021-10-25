import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import AddProfileImages from "../../example/AddProfileImages";
import UpdateProfileImages from "../../example/UpdateProfileImages";
import AppDataAlamatUserView from "../AppDataAlamatUser/AppDataAlamatUserView";
import ProfileExample from "../../example/ProfileExample";
import CreateWarehouseComponent from "../AppWarehouse/CreateWarehouseComponent";
import AppPermintaanBarangView from "../AppPermintaanBarang/AppPermintaanBarangView";
import AppHistoryProdukView from "../AppHistoryProduk/AppHistoryProdukView";
import AppHistoryTransaksiAdminView from "../AppHistoryTransaksiAdmin/AppHistoryTransaksiAdminView";
import { connect } from "react-redux";
import Profile from "../../pages/profile";
import ProfileEdit from "../../pages/profile.edit";
import AdminProducts from "../../pages/admin.products";
import UploadPaymentImages from "../../example/UploadPaymentImages";
import UploadProductImage from "../../example/UploadProductImage";
import ProductAdmin from "../../pages/ProductsAdmin";
import ProductList from "../../pages/ProductLists";
import productDetail from "../../pages/ProductDetail";

const NavbarView = (props) => {
  const [pageAdmin, setPageAdmin] = useState([
    {
      path: "/profile",
      component: ProfileExample,
    },
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
      component: Profile,
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
      path: "/uploadProduct/",
      component: UploadProductImage,
    },
    {
      path: "/Products",
      component: ProductAdmin,
    },
  ]);

  const [pageCustomer, setPageCustomer] = useState([
    {
      path: "/profile",
      component: ProfileExample,
    },
    {
      path: "/profileold/",
      component: Profile,
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
      path: "/Products",
      component: ProductList,
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

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Judul Brand</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-flex justify-content-end"
          >
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">
                  Notification
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="p-2">
        <Switch>
          {props.userGlobal.id_role < 3
            ? renderItemAdmin()
            : renderItemCustomer()}
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
