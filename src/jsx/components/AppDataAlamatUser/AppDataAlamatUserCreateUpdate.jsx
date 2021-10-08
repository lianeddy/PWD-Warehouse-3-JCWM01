import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
  addDataMultiAddress,
  modalIsOpen,
  updateDataMultiAddress,
} from "../../../redux/actions/userMultiAddressAction";

class AppDataAlamatUserCreateUpdate extends React.Component {
  state = {
    show: false,
  };

  handleCloseModal = () => {
    this.props.modalIsOpen(false);
  };

  btnHandler = () => {
    if (this.props.isAddData) this.addBtnHandler();
    else this.updateBtnHandler();
  };

  addBtnHandler() {}

  updateBtnHandler() {}

  render() {
    return (
      <Modal
        show={this.props.isShow}
        onHide={this.handleCloseModal}
        keyboard={false}
        fullscreen={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="nm_data_alamat_user"
              >
                <Form.Label column sm="5">
                  Nama alamat
                </Form.Label>
                <Col sm="7">
                  <Form.Control type="text" placeholder="Nama dari alamat" />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="nm_data_alamat_user"
              >
                <Form.Label column sm="5">
                  Contact alamat
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Contact yang dapat dihubungi"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="nm_data_alamat_user"
              >
                <Form.Label column sm="5">
                  Alamat lengkap
                </Form.Label>
                <Col sm="7">
                  <Form.Control as="textarea" style={{ height: "200px" }} />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="nm_data_alamat_user"
              >
                <Form.Label column sm="5">
                  Detail Provinsi
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Tuliskan nama provinsi"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="nm_data_alamat_user"
              >
                <Form.Label column sm="5">
                  Detai Kabupaten / Kota
                </Form.Label>
                <Col sm="7">
                  <Form.Select>
                    <option>Default select</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.btnHandler}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("CONSO");
  // console.log(state.userMultiAddressReducer);
  return {
    // multiAddressGlobalModal: state.userMultiAddressReducer.modalIsOpen,
  };
};

const mapDispatchToProps = {
  addDataMultiAddress,
  updateDataMultiAddress,
  modalIsOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDataAlamatUserCreateUpdate);
