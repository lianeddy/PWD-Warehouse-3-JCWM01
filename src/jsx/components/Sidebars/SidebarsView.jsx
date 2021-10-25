import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebars.css";
import { Dropdown } from "react-bootstrap";
import SVG from "./SVG";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/actions/user";

const SidebarsView = (props) => {
  const [activeNavLink, setActiveNavLink] = useState({
    home: "active",
    orders: "",
    name: "Home",
  });
  const [sidebarItemAdmin, setsidebarItemAdmin] = useState([
    // { link: "/home", icon: "#home", name: "Home" },
    { link: "/dashboard", icon: "#speedometer2", name: "Dashboard" },
    { link: "/orders", icon: "#table", name: "Orders" },
    { link: "/warehouse", icon: "#home", name: "Warehouse" },
    {
      link: "/permintaan-barang",
      icon: "#request-produk",
      name: "Request Products",
    },
    { link: "/history-barang", icon: "#calendar3", name: "History Products" },
    { link: "/list-admins", icon: "#person-circle", name: "Admins" },
    { link: "/notif", icon: "#notif", name: "Notifications" },
    {
      link: "/history-transaksi",
      icon: "#archieve",
      name: "History Transactions",
    },
    { link: "/Products", icon: "#grid", name: "Products" },
  ]);

  const [sidebarItemCustomer, setsidebarItemCustomer] = useState([
    { link: "/orders", icon: "#table", name: "Orders" },
    { link: "/upload-bukti-bayar", icon: "#notif", name: "Order Confirmation" },
    { link: "/Products", icon: "#grid", name: "Products" },
  ]);

  const renderMenuAdmin = () => {
    let output = sidebarItemAdmin.map((el, index) => {
      const { link, icon, name } = el;
      return (
        <li className="nav-item" key={index}>
          <NavLink to={link} className={`nav-link link-dark`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref={icon} />
            </svg>
            {name}
          </NavLink>
        </li>
      );
    });
    return output;
  };

  const renderMenuCustomer = () => {
    let output = sidebarItemCustomer.map((el, index) => {
      const { link, icon, name } = el;
      return (
        <li className="nav-item" key={index}>
          <NavLink to={link} className={`nav-link link-dark`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref={icon} />
            </svg>
            {name}
          </NavLink>
        </li>
      );
    });
    return output;
  };

  return (
    <>
      <SVG />

      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light"
        style={{ width: "16.66666667%", minHeight: "100vh", position: "fixed" }}
      >
        <ul className="nav nav-pills flex-column mb-auto">
          {props.userGlobal.id_role < 3
            ? renderMenuAdmin()
            : renderMenuCustomer()}
        </ul>
        <hr />
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{ width: "100%" }}
            className="d-flex align-items-center"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={`/change-password`}>change pass</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={`/profile/`}>My profile</Link>
            </Dropdown.Item>

            <Link>
              <Dropdown.Item onClick={props.logoutUser}>Log Out</Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarsView);
