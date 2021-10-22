import React from "react";
import { connect } from "react-redux";
import {
  Modal,
  Button,
  Table,
  Card,
  Col,
  Badge,
  Form,
  Row,
} from "react-bootstrap";
import AppHistoryTransaksiAdminCreateUpdate from "./AppHistoryTransaksiAdminCreateUpdate";
import { SwalFire } from "../../../utility/SwalFire";
import {
  NumberPagination,
  QueryParams,
} from "../../../utility/NumberPagination";
import InputAutocomplete from "../InputAutocomplete";
import Spacer from "../Spacer";
import BtnFilterCari from "../BtnFilterCari";
import { URL_API } from "../../../helper";
import ReactPaginate from "react-paginate";
import {
  getDataHistoryProduk,
  modalIsOpen,
} from "../../../redux/actions/historyProdukAction";
import {
  getDataFilterWarehouse,
  setLoadingFilterWarehouse,
} from "../../../redux/actions/filterWarehouseAction";
import { getDataTransaksiProduk } from "../../../redux/actions/transaksiProdukAction";

class AppHistoryTransaksiAdminView extends React.Component {
  state = {
    show: false,
    modalTitle: "",
    isAddData: true,
    modalData: {},
    dataTable: [],
    pagesNow: 0,
    maxPerPage: 10,
    search_warehouse: null,
    tipe_transaksi: null,
    status_warehouse: null,
    tgl_mulai: null,
    tgl_selesai: null,
    id_warehouse:
      this.props.userGlobal.id_role == 1
        ? null
        : this.props.userGlobal.id_warehouse,
  };

  componentDidMount() {
    this.props.getDataTransaksiProduk(
      this.state.pagesNow,
      null, // metode pembayaraan
      null, // metode pengiriman
      this.state.maxPerPage,
      this.state.id_warehouse,
      this.state.tgl_mulai,
      this.state.tgl_selesai,
      null, // is_verify
      null // is_bayar
    );
  }

  componentDidUpdate() {
    if (this.state.tipe_transaksi == "-1") {
      this.setState({
        ...this.state,
        tipe_transaksi: null,
      });
    }
  }

  tambahModalHandler = () => {
    // alert("CLICK tambahModalHandler");
    this.setState({
      ...this.state,
      isAddData: true,
      modalData: {},
      modalTitle: "Request Produk",
    });
    this.props.modalIsOpen(true);
  };

  updateModalHandler = (data) => {
    this.setState({
      ...this.state,
      isAddData: false,
      modalData: data,
      modalTitle: "Update Data",
    });
    this.props.modalIsOpen(true);
  };

  renderTable = () => {
    let no = 0;
    if (this.props.transaksiProdukGlobal.list.length == 0) {
      return (
        <tr>
          <td colSpan="10" className="text-center">
            <em>Data Kosong</em>
          </td>
        </tr>
      );
    }
    let output = this.props.transaksiProdukGlobal.list.map((el) => {
      const {
        data_metode_pembayaran,
        data_metode_pengiriman,
        invoice_code,
        data_user,
        tgl_dibuat,
        waktu_dibuat,
        keterangan,
        total_harga,
        is_bayar,
        is_verify,
      } = el;
      no += 1;
      return (
        <tr key={el.id_data_alamat_user}>
          <td>
            {NumberPagination(no, this.state.pagesNow, this.state.maxPerPage)}
          </td>
          <td>{invoice_code}</td>
          <td>
            {data_metode_pembayaran !== null
              ? data_metode_pembayaran.nm_metode_pembayaran
              : "Data tidak ditemukan"}
          </td>
          <td>
            {data_metode_pengiriman !== null
              ? data_metode_pengiriman.nm_metode_pengiriman
              : "Data tidak ditemukan"}
          </td>
          <td>{keterangan}</td>
          <td>{total_harga}</td>
          <td>{is_bayar ? "Sudah " : "Belum"} Bayar</td>
          <td>{is_verify ? "Sudah " : "Belum"} Verifikasi</td>
          <td>{tgl_dibuat}</td>
          <td>{waktu_dibuat}</td>
        </tr>
      );
    });
    return output;
  };

  handleChangeFilterWarehouse = (el, type) => {
    console.log("handleChange");
    console.log(el);
    let data = {
      search_warehouse: el.length != 0 ? el[0].id_warehouse : "",
    };
    this.setState({
      ...this.state,
      ...data,
    });
  };

  handleSearchFilterWarehouse = (query, type) => {
    this.props.setLoadingFilterWarehouse(true);
    this.props.getDataFilterWarehouse({ nm_warehouse: query });
  };

  renderFilterWarehouse = (option, props) => (
    <>
      <span>{option.nm_warehouse}</span>
    </>
  );

  handlePageClick = (data) => {
    console.log(data);
    const { selected } = data;
    this.props.getDataHistoryProduk(
      selected,
      this.state.search_warehouse,
      this.state.tipe_transaksi,
      this.state.maxPerPage,
      this.state.id_warehouse,
      this.state.tgl_mulai,
      this.state.tgl_selesai,
      this.state.status_warehouse
    );
    this.setState({
      ...this.state,
      pagesNow: selected,
    });
  };

  handleFilter = () => {
    this.props.getDataHistoryProduk(
      0,
      this.state.search_warehouse,
      this.state.tipe_transaksi,
      this.state.maxPerPage,
      this.state.id_warehouse,
      this.state.tgl_mulai,
      this.state.tgl_selesai,
      this.state.status_warehouse
    );
    this.setState({
      ...this.state,
      pagesNow: 0,
    });
  };

  handleFilterReset = () => {
    this.props.getDataTransaksiProduk(
      this.state.pagesNow,
      null, // metode pembayaraan
      null, // metode pengiriman
      this.state.maxPerPage,
      this.state.id_warehouse,
      null,
      null,
      null, // is_verify
      null // is_bayar
    );
    this.setState({
      ...this.state,
      search_warehouse: null,
      tipe_transaksi: null,
      status_warehouse: null,
      tgl_mulai: null,
      tgl_selesai: null,
    });
    document.getElementById("tgl_selesai").value = "";
    document.getElementById("tgl_mulai").value = "";
  };

  onInputchangeHandler = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 col-lg-12 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Data History Transaksi</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                {/* <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.tambahModalHandler}
                >
                  &#10147; Kirim Permintaan
                </button> */}
              </div>
            </div>
          </div>

          {/* Form Filter */}
          <div>
            <Card body className="mb-3">
              <Spacer className="mt-3" />
              {this.props.userGlobal.id_role == 1 ? (
                <>
                  <InputAutocomplete
                    label="Warehouse Pengirim"
                    onChange={(e) => this.handleChangeFilterWarehouse(e, 2)}
                    optionsProps={
                      this.props.filterWarehouseGlobal.optionsFilterPengirim
                    }
                    isLoading={this.props.filterWarehouseGlobal.isLoading}
                    handleSearch={(e) => this.handleSearchFilterWarehouse(e, 2)}
                    placeholder="Ketik nama warehouse"
                    id="filter-nm_warehouse"
                    renderMenuItemChildren={this.renderFilterWarehouse}
                    labelKey="nm_warehouse"
                    mdAsync="3"
                    lgAsync="3"
                  />
                  <Spacer className="mb-3" />
                </>
              ) : (
                ""
              )}
              {/* <Form.Group as={Row} className="mb-3" controlId="tipe_transaksi">
                <Form.Label column sm="4" className="text-end">
                  Tipe Transaksi
                </Form.Label>
                <Col sm="12" md="3" lg="3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={this.onInputchangeHandler}
                    value={this.state.tipe_transaksi}
                  >
                    <option value="-1">Semua</option>
                    <option value="0">Permintaan Warehouse</option>
                    <option value="1">Transaksi Customer</option>
                  </Form.Select>
                </Col>
              </Form.Group> */}
              <Form.Group as={Row} className="mb-3" controlId="tgl_mulai">
                <Form.Label column sm="4" className="text-end">
                  Tanggal Mulai
                </Form.Label>
                <Col sm="3">
                  <Form.Control
                    type="date"
                    placeholder="DD/MM/YY"
                    onChange={this.onInputchangeHandler}
                    value={this.state.tgl_mulai}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="tgl_selesai">
                <Form.Label column sm="4" className="text-end">
                  Tanggal Selesai
                </Form.Label>
                <Col sm="3">
                  <Form.Control
                    type="date"
                    placeholder="DD/MM/YY"
                    onChange={this.onInputchangeHandler}
                    value={this.state.tgl_selesai}
                  />
                </Col>
              </Form.Group>
              <Spacer className="mb-3" />
              <BtnFilterCari
                onReset={this.handleFilterReset}
                onCari={this.handleFilter}
              />
            </Card>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center align-middle">#</th>
                  <th className="text-center align-middle">Kode Invoice</th>
                  <th className="text-center align-middle">Pembayaran</th>
                  <th className="text-center align-middle">Pengiriman</th>
                  <th className="text-center align-middle">Keterangan</th>
                  <th className="text-center align-middle">Total Pembayaran</th>
                  <th className="text-center align-middle">Status Bayar</th>
                  <th className="text-center align-middle">
                    Status Verifikasi
                  </th>
                  <th className="text-center align-middle">Tanggal</th>
                  <th className="text-center align-middle">Waktu</th>
                </tr>
              </thead>
              <tbody>{this.renderTable()}</tbody>
            </Table>
            <div id="pagination">
              <ReactPaginate
                breakLabel={"..."}
                pageCount={Math.ceil(
                  this.props.transaksiProdukGlobal.total / this.state.maxPerPage
                )}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageLinkClassName="page-link"
                pageClassName="page-item"
                nextLabel={"next"}
                nextClassName="page-item"
                nextLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                previousLabel={"previous"}
                breakClassName="page-item"
                breakLinkClassName="page-link"
                forcePage={this.state.pagesNow}
              />
            </div>
          </div>
        </div>
        <AppHistoryTransaksiAdminCreateUpdate
          isAddData={this.state.isAddData}
          modalData={this.state.modalData}
          isShow={this.props.transaksiProdukGlobal.modalIsOpen}
          modalTitle={this.state.modalTitle}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filterWarehouseGlobal: state.filterWarehouseReducer,
    userGlobal: state.authReducer,
    transaksiProdukGlobal: state.transaksiProdukReducer,
  };
};

const mapDispatchToProps = {
  getDataHistoryProduk,
  modalIsOpen,
  getDataFilterWarehouse,
  setLoadingFilterWarehouse,
  getDataTransaksiProduk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHistoryTransaksiAdminView);
