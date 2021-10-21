import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebars.css";
import { Dropdown } from "react-bootstrap";
import SVG from "./SVG";

const SidebarsView = () => {
  const [activeNavLink, setActiveNavLink] = useState({
    home: "active",
    orders: "",
    name: "Home",
  });
  const [sidebarItem, setSidebarItem] = useState([
    // { link: "/home", icon: "#home", name: "Home" },
    { link: "/dashboard", icon: "#speedometer2", name: "Dashboard" },
    { link: "/orders", icon: "#table", name: "Orders" },
    { link: "/products", icon: "#grid", name: "Products" },
    { link: "/warehouse", icon: "#home", name: "Warehouse" },
  ]);

  const renderMenu = () => {
    let output = sidebarItem.map((el, index) => {
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
        <ul className="nav nav-pills flex-column mb-auto">{renderMenu()}</ul>
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
            <a href="/change-password">
              <Dropdown.Item>Change Password</Dropdown.Item>
            </a>
            <Link to="/profile/multi-address">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Link>
              <Dropdown.Item>Log Out</Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default SidebarsView;
