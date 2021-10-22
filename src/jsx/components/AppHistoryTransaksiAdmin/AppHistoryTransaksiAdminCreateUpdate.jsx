import React from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  addDataPermintaanProduk,
  modalIsOpen,
  updateDataPermintaanProduk,
} from "../../../redux/actions/permintaanProdukAction";
import InputAutocomplete from "../InputAutocomplete";
import { isEmpty } from "../../../utility/Checker";
import {
  getDataFilterWarehouse,
  setLoadingFilterWarehouse,
  setSelectedWarehouse,
} from "../../../redux/actions/filterWarehouseAction";
import {
  setSelectedMasterProduk,
  setLoadingFilterMasterProduk,
  getDataFilterMasterProduk,
} from "../../../redux/actions/filterMasterProdukAction";

class AppHistoryTransaksiAdminCreateUpdate extends React.Component {
  state = {
    show: false,
    jumlah: 1,
    jumlahMax: 1000,
    jumlahMin: 1,
    deskripsi: "",
    to_warehouse: null,
    id_master_produk: null,
    id_propinsi_now: null,
    id_kabkota_now: null,
    id_propinsi_old: null,
    id_kabkota_old: null,
    id_data_alamat_user: 0,
  };

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
    this.addBtnHandler();
  };

  onInputchangeHandler = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  addBtnHandler = () => {
    let data = {
      id_user: this.props.userGlobal.id_user,
      id_master_produk: this.state.id_master_produk,
      to_warehouse: this.state.to_warehouse,
      from_warehouse: this.props.userGlobal.id_warehouse,
      jumlah: this.state.jumlah,
      id_status: 3,
      deskripsi: this.state.deskripsi,
    };
    this.props.addDataPermintaanProduk(data);
  };

  // Warehouse
  handleChangeFilterWarehouse = (el) => {
    console.log("handleChange");
    console.log(el);
    this.props.setSelectedWarehouse(null);
    this.setState({
      ...this.state,
      to_warehouse: el.length != 0 ? el[0].id_warehouse : null,
    });
    this.props.setLoadingFilterWarehouse(false);
  };

  handleSearchFilterWarehouse = (query) => {
    this.props.setLoadingFilterWarehouse(true);
    this.props.getDataFilterWarehouse({ nm_warehouse: query });
  };

  renderFilterWarehouse = (option, props) => (
    <>
      <span>{option.nm_warehouse}</span>
    </>
  );

  // Master Produk
  handleChangeFilterMasterProduk = (el) => {
    console.log("handleChange");
    console.log(el);
    this.props.setSelectedMasterProduk(null);
    this.setState({
      ...this.state,
      id_master_produk: el.length !== 0 ? el[0].id_master_produk : null,
      jumlahMax: el[0].jml_produk,
      jumlah: el[0].jml_produk,
    });
    this.props.setLoadingFilterMasterProduk(false);
  };

  handleSearchFilterMasterProduk = (query) => {
    this.props.setLoadingFilterMasterProduk(true);
    this.props.getDataFilterMasterProduk({
      nm_master_produk: query,
      id_warehouse: this.state.to_warehouse,
    });
  };

  renderFilterMasterProduk = (option, props) => (
    <>
      <span>
        {option.nm_master_produk} - {option.jml_produk}
      </span>
    </>
  );

  render() {
    return (
      <Modal
        show={this.props.permintaanProdukGlobalModalIsOpen}
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
              <InputAutocomplete
                label="Warehouse request stock produk"
                onChange={(e) => this.handleChangeFilterWarehouse(e)}
                optionsProps={
                  this.props.filterWarehouseGlobal.optionsFilterPengirim
                }
                isLoading={this.props.filterWarehouseGlobal.isLoadingPengirim}
                handleSearch={this.handleSearchFilterWarehouse}
                placeholder="Ketik warehouse yang dimintai stock produk"
                id="input-warehouse-request-produk"
                renderMenuItemChildren={this.renderFilterWarehouse}
                labelKey={"nm_warehouse"}
                smLabel="12"
                mdLabel="3"
                lgLabel="3"
                smAsync="12"
                mdAsync="7"
                lgAsync="7"
                selected={this.props.filterWarehouseGlobal.selected}
              />
              <InputAutocomplete
                label="Nama Produk"
                onChange={(e) => this.handleChangeFilterMasterProduk(e)}
                optionsProps={this.props.filterMasterProdukGlobal.optionsFilter}
                isLoading={
                  this.props.filterMasterProdukGlobal.isLoadingFilterKabKota
                }
                handleSearch={this.handleSearchFilterMasterProduk}
                placeholder="Ketik nama produk yang diinginkan"
                id="input-master-produk"
                renderMenuItemChildren={this.renderFilterMasterProduk}
                // labelKey={(options) => `${options.type} ${options.nm_kabkota}`}
                labelKey="nm_master_produk"
                smLabel="12"
                mdLabel="3"
                lgLabel="3"
                smAsync="12"
                mdAsync="7"
                lgAsync="7"
                selected={this.props.filterMasterProdukGlobal.selected}
                disabled={this.state.to_warehouse == null ? true : false}
              />
              <Form.Group as={Row} className="mb-3" controlId="jumlah">
                <Form.Label column sm="3" className="text-end">
                  Jumlah produk yang diminta
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="number"
                    placeholder="Jumlah produk"
                    value={this.state.jumlah}
                    onChange={this.onInputchangeHandler}
                    max={this.state.jumlahMax}
                    min={this.state.jumlahMin}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="deskripsi">
                <Form.Label column sm="3" className="text-end">
                  Deskripsi
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    as="textarea"
                    style={{ height: "200px" }}
                    value={this.state.deskripsi}
                    onChange={this.onInputchangeHandler}
                  />
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
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    permintaanProdukGlobalModalIsOpen:
      state.permintaanProdukReducer.modalIsOpen,
    filterWarehouseGlobal: state.filterWarehouseReducer,
    filterMasterProdukGlobal: state.filterMasterProdukReducer,
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {
  addDataPermintaanProduk,
  updateDataPermintaanProduk,
  modalIsOpen,
  getDataFilterWarehouse,
  setLoadingFilterWarehouse,
  setSelectedWarehouse,
  setSelectedMasterProduk,
  setLoadingFilterMasterProduk,
  getDataFilterMasterProduk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHistoryTransaksiAdminCreateUpdate);
