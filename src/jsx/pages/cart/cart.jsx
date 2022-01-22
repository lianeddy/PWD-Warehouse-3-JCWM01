import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import CardCl from "../../components/Card/Card";
import TableCl from "../../components/Table/Table";

class Cart extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <TableCl />
          </Col>
          {/* <Col hidden>
            <CardCl />
          </Col> */}
          <Col>
            <CardCl />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Cart;
