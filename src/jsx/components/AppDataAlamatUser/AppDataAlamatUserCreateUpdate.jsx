import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
  addDataMultiAddress,
  modalIsOpen,
  updateDataMultiAddress,
} from "../../../redux/actions/userMultiAddressAction";
import {
  setLoadingFilterKabkota,
  getDataFilterKabkota,
} from "../../../redux/actions/filterKabkotaAction";
import {
  setLoadingFilterProvinsi,
  getDataFilterProvinsi,
} from "../../../redux/actions/filterProvinsiAction";
import InputAutocomplete from "../InputAutocomplete";

class AppDataAlamatUserCreateUpdate extends React.Component {
  state = {
    show: false,
    address_data_alamat_user: "",
    contact_data_alamat_user: "",
    nm_data_alamat_user: "",
    id_propinsi_now: null,
    id_kabkota_now: null,
    id_propinsi_old: null,
    id_kabkota_old: null,
  };

  handleCloseModal = () => {
    this.props.modalIsOpen(false);
  };

  btnHandler = () => {
    if (this.props.isAddData) this.addBtnHandler();
    else this.updateBtnHandler();
  };

  onInputchangeHandler = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  addBtnHandler = () => {
    let data = {
      id_user: this.props.userGlobal.id,
      address_data_alamat_user: this.state.address_data_alamat_user,
      contact_data_alamat_user: this.state.contact_data_alamat_user,
      nm_data_alamat_user: this.state.nm_data_alamat_user,
    };
    if (this.state.id_propinsi_now != null)
      data = { ...data, id_propinsi: this.state.id_propinsi_now };
    if (this.state.id_propinsi_now != null)
      data = { ...data, id_kabkota: this.state.id_kabkota_now };
    this.props.addDataMultiAddress(data);
  };

  updateBtnHandler = () => {
    let data = {
      id_user: this.props.userGlobal.id,
      address_data_alamat_user: this.state.address_data_alamat_user,
      contact_data_alamat_user: this.state.contact_data_alamat_user,
      nm_data_alamat_user: this.state.nm_data_alamat_user,
    };
    if (this.state.id_propinsi_old != null)
      data = { ...data, id_propinsi: this.state.id_propinsi_old };
    if (this.state.id_kabkota_old != null)
      data = { ...data, id_kabkota: this.state.id_kabkota_old };
    this.props.updateDataMultiAddress(data);
  };

  checkProperty = (data = {}, nm_property, nm_property_2 = "") => {
    console.log(typeof data[nm_property]);
    if (data.hasOwnProperty(nm_property)) {
      if (
        typeof data[nm_property] == "object" ||
        typeof data[nm_property] == "array"
      ) {
        return data[nm_property].hasOwnProperty(nm_property_2)
          ? data[nm_property][nm_property_2]
          : "";
      }
      return data[nm_property];
    } else return null;
  };

  handleChangeFilterProvinsi = (el) => {
    console.log("handleChange");
    console.log(el);
    if (this.props.isAddData)
      this.setState({
        ...this.state,
        id_propinsi_now: el.length != 0 ? el[0].id_propinsi : "",
      });
    else
      this.setState({
        ...this.state,
        id_propinsi_old: el.length != 0 ? el[0].id_propinsi : "",
      });
  };

  handleSearchFilterProvinsi = (query) => {
    // this.setState({ ...this.state, isLoadingFilterProvinsi: true });
    // this.props.filterProvinsiGlobal.isLoading = true;
    this.props.setLoadingFilterProvinsi(true);
    this.props.getDataFilterProvinsi({ nm_propinsi: query });
  };

  renderFilterProvinsi = (option, props) => (
    <>
      <span>{option.nm_propinsi}</span>
    </>
  );

  handleChangeFilterKabKota = (el) => {
    console.log("handleChange");
    console.log(el);
    if (this.props.isAddData)
      this.setState({
        ...this.state,
        id_kabkota_now: el.length !== 0 ? el[0].id_kabkota : null,
      });
    else
      this.setState({
        ...this.state,
        id_kabkota_old: el.length !== 0 ? el[0].id_kabkota : null,
      });
  };

  handleSearchFilterKabkota = (query) => {
    // this.setState({ ...this.state, isLoadingFilterProvinsi: true });
    // this.props.filterProvinsiGlobal.isLoading = true;
    this.props.setLoadingFilterKabkota(true);
    let data = {
      nm_kabkota: query,
    };
    if (this.state.id_propinsi_filter != null) {
      data = {
        ...data,
        id_propinsi: this.state.id_propinsi_filter,
      };
    }
    this.props.getDataFilterKabkota(data);
  };

  renderFilterKabKota = (option, props) => (
    <>
      <span>{option.nm_kabkota}</span>
    </>
  );

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
                <Form.Label column sm="3" className="text-end">
                  Nama alamat
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Nama dari alamat"
                    value={this.checkProperty(
                      this.props.modalData,
                      "nm_data_alamat_user"
                    )}
                    onChange={this.onInputchangeHandler}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="contact_data_alamat_user"
              >
                <Form.Label column sm="3" className="text-end">
                  Contact alamat
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Contact yang dapat dihubungi"
                    value={this.checkProperty(
                      this.props.modalData,
                      "contact_data_alamat_user"
                    )}
                    onChange={this.onInputchangeHandler}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="address_data_alamat_user"
              >
                <Form.Label column sm="3" className="text-end">
                  Alamat lengkap
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    as="textarea"
                    style={{ height: "200px" }}
                    value={this.checkProperty(
                      this.props.modalData,
                      "address_data_alamat_user"
                    )}
                    onChange={this.onInputchangeHandler}
                  />
                </Col>
              </Form.Group>
              <InputAutocomplete
                label="Nama Provinsi"
                onChange={(e) => this.handleChangeFilterProvinsi(e)}
                optionsProps={this.props.filterProvinsiGlobal.provinsiList}
                isLoading={this.props.filterProvinsiGlobal.isLoading}
                handleSearch={this.handleSearchFilterProvinsi}
                placeholder="Ketik nama provinsi"
                id="filter-provinsi"
                renderMenuItemChildren={this.renderFilterProvinsi}
                labelKey={(options) => `${options.nm_propinsi}`}
                smLabel="12"
                mdLabel="3"
                lgLabel="3"
                smAsync="12"
                mdAsync="7"
                lgAsync="7"
              />
              {/* <Form.Group as={Row}>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Tuliskan nama provinsi"
                    value={this.checkProperty(
                      this.props.modalData,
                      "datapropinsi",
                      "id_propinsi"
                    )}
                    name={
                      this.props.isAddData
                        ? "id_propinsi_now"
                        : "id_propinsi_old"
                    }
                    onChange={this.onInputchangeHandler}
                    style={{ display: "none" }}
                  />
                </Col>
              </Form.Group> */}
              <InputAutocomplete
                label="Nama Kabupaten / Kota"
                onChange={(e) => this.handleChangeFilterKabKota(e)}
                optionsProps={this.props.filterKabkotaGlobal.optionsFilter}
                isLoading={
                  this.props.filterKabkotaGlobal.isLoadingFilterKabKota
                }
                handleSearch={this.handleSearchFilterKabkota}
                placeholder="Ketik nama kabupatern / kota"
                id="filter-kabkota"
                renderMenuItemChildren={this.renderFilterKabKota}
                // labelKey={(options) => `${options.type} ${options.nm_kabkota}`}
                labelKey="nm_kabkota"
                smLabel="12"
                mdLabel="3"
                lgLabel="3"
                smAsync="12"
                mdAsync="7"
                lgAsync="7"
              />
              {/* <Form.Group as={Row} controlId="nm_data_alamat_user">
                <Form.Control
                  type="text"
                  placeholder="Tuliskan nama provinsi"
                  value={this.checkProperty(
                    this.props.modalData,
                    "datakabkota",
                    "id_kabkota"
                  )}
                  name={
                    this.props.isAddData ? "id_kabkota_now" : "id_kabkota_old"
                  }
                  style={{ display: "none" }}
                  onChange={this.onInputchangeHandler}
                />
              </Form.Group> */}
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
  return {
    // multiAddressGlobalModal: state.userMultiAddressReducer.modalIsOpen,
    filterProvinsiGlobal: state.filterProvinsiReducer,
    filterKabkotaGlobal: state.filterKabkotaReducer,
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {
  addDataMultiAddress,
  updateDataMultiAddress,
  modalIsOpen,
  getDataFilterProvinsi,
  setLoadingFilterProvinsi,
  getDataFilterKabkota,
  setLoadingFilterKabkota,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDataAlamatUserCreateUpdate);
