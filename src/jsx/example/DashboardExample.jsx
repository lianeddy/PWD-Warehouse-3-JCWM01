import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarView from "../components/Navbar/NavbarView";
import SidebarsView from "../components/Sidebars/SidebarsView";

class DasboardExample extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="2" lg="2" className="pe-0 ps-0">
            <SidebarsView />
          </Col>
          <Col md="10" lg="10" className="pe-0 ps-0">
            <NavbarView />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DasboardExample;
