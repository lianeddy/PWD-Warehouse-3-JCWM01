import React, { useState } from "react";
import { Col, Button, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const BtnFilterCari = ({ onReset, onCari }) => {
  return (
    <Row>
      <Col sm="12" md="3" lg="4" lg="4" />
      <Col sm="12" md="3" lg="6" lg="6">
        <Button variant="secondary" className="me-2" onClick={onReset}>
          Reset
        </Button>
        <Button variant="primary" onClick={onCari}>
          Cari
        </Button>
      </Col>
    </Row>
  );
};

export default BtnFilterCari;
