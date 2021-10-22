import { useState } from "react";
import { Nav } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppDataAlamatUserView from "../components/AppDataAlamatUser/AppDataAlamatUserView";
import AddProfileImages from "./AddProfileImages";
import UpdateProfileImages from "./UpdateProfileImages";

const ProfileExample = ({ pathBase = "/profile" }) => {
  const [selector, setSelector] = useState(0);
  const [subPage, setSubPage] = useState([
    {
      path: `${pathBase}/multi-address`,
      component: <AppDataAlamatUserView />,
    },
    {
      path: "/profile/image/add",
      component: <AddProfileImages />,
    },
    {
      path: "/profile/image/update",
      component: <UpdateProfileImages />,
    },
  ]);
  const [navItem, setNavItem] = useState([
    {
      eventKey: `link-datadiri`,
      textTitle: `Data Diri`,
      indexSelector: 0,
    },
    {
      eventKey: `link-dataalamat`,
      textTitle: `Data Alamat`,
      indexSelector: 0,
    },
    {
      eventKey: `link-profileimage`,
      textTitle: `Profile Image`,
      indexSelector: 1,
    },
    {
      eventKey: `link-riwayattransaksi`,
      textTitle: `Riwayat Transaksi`,
      indexSelector: 1,
    },
  ]);

  const renderNavItem = () => {
    let output = navItem.map((el, index) => {
      const { eventKey, textTitle, indexSelector } = el;
      return (
        <>
          <Nav.Item>
            <Nav.Link
              eventKey={eventKey}
              onClick={() => navHandler(indexSelector)}
            >
              {textTitle}
            </Nav.Link>
          </Nav.Item>
        </>
      );
    });
    return output;
  };

  const chooseOpenSubPage = (index) => {
    // let output = subPage[index];
    const { component } = subPage[index];
    return <dvi>{component}</dvi>;
  };

  const navHandler = (index) => {
    setSelector(index);
  };

  return (
    <>
      <Nav justify variant="tabs" defaultActiveKey="link-datadiri">
        {renderNavItem()}
      </Nav>

      <div id="OpenSubPage" className="mt-2">
        {chooseOpenSubPage(selector)}
      </div>
    </>
  );
};

export default ProfileExample;
