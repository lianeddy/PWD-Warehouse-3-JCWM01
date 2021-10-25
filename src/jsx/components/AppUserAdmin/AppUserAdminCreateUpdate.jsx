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
  setTmpSelectedKabkota,
  setSelectedKabkota,
} from "../../../redux/actions/filterKabkotaAction";
import {
  setLoadingFilterProvinsi,
  getDataFilterProvinsi,
  setTmpSelectedProvinsi,
  setSelectedProvinsi,
} from "../../../redux/actions/filterProvinsiAction";
import InputAutocomplete from "../InputAutocomplete";
import { isEmpty } from "../../../utility/Checker";

class AppUserAdminCreateUpdate extends React.Component {
  state = {
    show: false,
    address_data_alamat_user: "",
    contact_data_alamat_user: "",
    nm_data_alamat_user: "",
    id_propinsi_now: null,
    id_kabkota_now: null,
    id_propinsi_old: null,
    id_kabkota_old: null,
    id_data_alamat_user: 0,
  };

  componentDidUpdate() {
    if (
      this.props.modalData.id_data_alamat_user != this.state.id_data_alamat_user
    ) {
      console.log("componentDidUpdate State Update !!");
      this.setState({
        ...this.state,
        id_data_alamat_user: this.props.modalData.id_data_alamat_user,
        address_data_alamat_user: this.checkProperty(
          this.props.modalData,
          "address_data_alamat_user"
        ),
        contact_data_alamat_user: this.checkProperty(
          this.props.modalData,
          "contact_data_alamat_user"
        ),
        nm_data_alamat_user: this.checkProperty(
          this.props.modalData,
          "nm_data_alamat_user"
        ),
        id_propinsi_now: null,
        id_kabkota_now: null,
        id_propinsi_old: this.checkProperty(
          this.props.modalData,
          "datapropinsi",
          "id_propinsi"
        ),
        id_kabkota_old: this.checkProperty(
          this.props.modalData,
          "datakabkota",
          "id_kabkota"
        ),
      });

      // console.table(this.props.modalData.datakabkota);

      // Set Nama Propinsi Autocomplete
      if (this.props.modalData.hasOwnProperty("datapropinsi")) {
        const { nm_propinsi, id_propinsi } = this.props.modalData.datapropinsi;
        const optionSelectedPropinsi = {
          nm_propinsi: nm_propinsi,
          id_propinsi: id_propinsi,
        };
        this.props.setTmpSelectedProvinsi(
          [optionSelectedPropinsi],
          [optionSelectedPropinsi]
        );
      }

      // Set Nama Kabkota Autocomplete
      if (this.props.modalData.hasOwnProperty("datakabkota")) {
        const { nm_kabkota, type, id_kabkota } =
          this.props.modalData.datakabkota;
        const optionSelectedKabkota = {
          nm_kabkota: `${type} ${nm_kabkota}`,
          id_kabkota: id_kabkota,
        };
        this.props.setTmpSelectedKabkota(
          [optionSelectedKabkota],
          [optionSelectedKabkota]
        );
      }
    }
  }

  checkProperty = (data = {}, nm_property, nm_property_2 = "") => {
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
    } else return "";
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
      id_user: this.props.userGlobal.id_user,
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
      id_user: this.props.userGlobal.id_user,
      address_data_alamat_user: this.state.address_data_alamat_user,
      contact_data_alamat_user: this.state.contact_data_alamat_user,
      nm_data_alamat_user: this.state.nm_data_alamat_user,
    };
    if (this.state.id_propinsi_old != null)
      data = { ...data, id_propinsi: this.state.id_propinsi_old };
    if (this.state.id_kabkota_old != null)
      data = { ...data, id_kabkota: this.state.id_kabkota_old };
    this.props.updateDataMultiAddress(
      this.props.modalData.id_data_alamat_user,
      data
    );
  };

  handleChangeFilterProvinsi = (el) => {
    console.log("handleChange");
    console.log(el);
    this.props.setSelectedProvinsi(null);
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
    this.props.setSelectedKabkota(null);
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
    this.props.setLoadingFilterKabkota(true);
    let data = {
      nm_kabkota: query,
    };
    if (this.state.id_propinsi_old != null) {
      data = {
        ...data,
        id_propinsi: this.state.id_propinsi_old,
      };
    }
    if (this.state.id_propinsi_now != null) {
      data = {
        ...data,
        id_propinsi: this.state.id_propinsi_now,
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
        show={this.props.multiAddressGlobalModal}
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
                    value={this.state.nm_data_alamat_user}
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
                    value={this.state.contact_data_alamat_user}
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
                    value={this.state.address_data_alamat_user}
                    onChange={this.onInputchangeHandler}
                  />
                </Col>
              </Form.Group>
              <InputAutocomplete
                label="Nama Provinsi"
                onChange={(e) => this.handleChangeFilterProvinsi(e)}
                optionsProps={this.props.filterProvinsiGlobal.optionsFilter}
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
                selected={this.props.filterProvinsiGlobal.selected}
              />
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
                selected={this.props.filterKabkotaGlobal.selected}
              />
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
    multiAddressGlobalModal: state.userMultiAddressReducer.modalIsOpen,
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
  setTmpSelectedKabkota,
  setTmpSelectedProvinsi,
  setSelectedProvinsi,
  setSelectedKabkota,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppUserAdminCreateUpdate);
