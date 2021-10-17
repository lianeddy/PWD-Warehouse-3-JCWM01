import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import AddProfileImages from "../../example/AddProfileImages";
import UpdateProfileImages from "../../example/UpdateProfileImages";
import AppDataAlamatUserView from "../AppDataAlamatUser/AppDataAlamatUserView";
import ProfileExample from "../../example/ProfileExample";
import CreateWarehouseComponent from "../AppWarehouse/CreateWarehouseComponent";
import AppPermintaanBarangView from "../AppPermintaanBarang/AppPermintaanBarangView";

const NavbarView = () => {
  const [page, setPage] = useState([
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
    // {
    //   path: "/profile/multi-address",
    //   component: AppDataAlamatUserView,
    // },
    // {
    //   path: "/profile/image/add",
    //   component: AddProfileImages,
    // },
    // {
    //   path: "/profile/image/update",
    //   component: UpdateProfileImages,
    // },
  ]);

  const renderItem = () => {
    let output = page.map((el, index) => {
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
        <Switch>{renderItem()}</Switch>
      </div>
    </>
  );
};

export default NavbarView;
