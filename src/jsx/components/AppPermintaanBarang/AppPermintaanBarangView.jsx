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
import AppPermintaanBarangCreateUpdate from "./AppPermintaanBarangCreateUpdate";
import { SwalFire } from "../../../utility/SwalFire";
import {
  NumberPagination,
  QueryParams,
} from "../../../utility/NumberPagination";
// import { BoostrapPaginator } from "../../../utility/BootstraPaginator";
import InputAutocomplete from "../InputAutocomplete";
import Spacer from "../Spacer";
import BtnFilterCari from "../BtnFilterCari";
import { URL_API } from "../../../helper";
import {
  getDataFilterProvinsi,
  setLoadingFilterProvinsi,
} from "../../../redux/actions/filterProvinsiAction";
import {
  getDataFilterKabkota,
  setLoadingFilterKabkota,
} from "../../../redux/actions/filterKabkotaAction";
import ReactPaginate from "react-paginate";
import {
  getDataPermintaanProduk,
  modalIsOpen,
  addDataPermintaanProduk,
  updateDataPermintaanProduk,
  deleteDataPermintaanProduk,
  isTerimaPermintaanBarang,
} from "../../../redux/actions/permintaanProdukAction";
import {
  getDataFilterWarehouse,
  setLoadingFilterWarehouse,
} from "../../../redux/actions/filterWarehouseAction";

class AppPermintaanBarangView extends React.Component {
  state = {
    show: false,
    modalTitle: "",
    isAddData: true,
    modalData: {},
    dataTable: [],
    pagesNow: 0,
    maxPerPage: 10,
    from_warehouse: this.props.userGlobal.id_warehouse,
    to_warehouse: this.props.userGlobal.id_warehouse,
    status_warehouse: null,
    tgl_mulai: null,
    tgl_selesai: null,
  };

  componentDidMount() {
    this.props.getDataPermintaanProduk(
      this.state.pagesNow,
      this.state.from_warehouse,
      this.state.to_warehouse,
      this.state.maxPerPage,
      this.props.userGlobal.id_warehouse,
      this.state.tgl_mulai,
      this.state.tgl_selesai,
      this.state.status_warehouse
    );
  }

  // componentDidUpdate() {
  //   console.log("COMPONENT UPDATE");
  //   console.log(QueryParams(this.props.location.search).get("pages"));
  //   console.log(QueryParams(this.props.location.search).get("maxpage"));
  // }

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

  batalBtnHandler = (data) => {
    SwalFire.fire({
      title: "Anda yakin?",
      text: `Membatalkan permintaan produk ke warehouse ini`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YA",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mengirim data update
        const { id_permintaan_produk } = data;
        this.props.deleteDataPermintaanProduk(id_permintaan_produk, {
          id_warehouse: this.props.userGlobal.id_warehouse,
        });
      }
    });
  };

  tolakBtnHandler = (data) => {
    SwalFire.fire({
      title: "Anda yakin?",
      text: `Menolak permintaan produk dari warehouse ini`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YA",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mengirim data update
        const { id_permintaan_produk } = data;
        const dataUpdate = {
          from_warehouse: data.from_warehouse,
          to_warehouse: data.to_warehouse,
          jumlah: data.jumlah,
          id_master_produk: data.id_master_produk,
          id_user: this.props.userGlobal.id_user,
          id_warehouse: this.props.userGlobal.id_warehouse,
        };
        this.props.isTerimaPermintaanBarang(
          id_permintaan_produk,
          dataUpdate,
          false
        );
      }
    });
  };

  terimaBtnHandler = (data) => {
    // console.log(data);
    SwalFire.fire({
      title: "Anda yakin?",
      text: `Menerima permintaan produk dari warehouse ini`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mengirim data update
        const { id_permintaan_produk } = data;
        const dataUpdate = {
          from_warehouse: data.from_warehouse,
          to_warehouse: data.to_warehouse,
          jumlah: data.jumlah,
          id_master_produk: data.id_master_produk,
          id_user: this.props.userGlobal.id_user,
          id_warehouse: this.props.userGlobal.id_warehouse,
        };
        this.props.isTerimaPermintaanBarang(
          id_permintaan_produk,
          dataUpdate,
          true
        );
      }
    });
  };

  renderTable = () => {
    let no = 0;
    if (this.props.permintaanProdukGlobal.permintaanProdukList.length == 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center">
            <em>Data Kosong</em>
          </td>
        </tr>
      );
    }
    let output = this.props.permintaanProdukGlobal.permintaanProdukList.map(
      (el) => {
        const {
          jumlah,
          is_accept,
          data_master_produk,
          data_from_warehouse,
          data_status,
          data_user,
          data_to_warehouse,
          to_warehouse,
          id_status,
        } = el;
        no += 1;
        return (
          <tr key={el.id_data_alamat_user}>
            <td>
              {NumberPagination(no, this.state.pagesNow, this.state.maxPerPage)}
            </td>
            <td>
              <Badge
                bg={
                  is_accept ? "success" : id_status == 1 ? "danger" : "warning"
                }
              >
                {/* {is_accept ? "Diterima" : "Tidak"} */}
                {data_status.nm_status}
              </Badge>
            </td>
            <td>
              {data_master_produk !== null
                ? data_master_produk.nm_master_produk
                : "Data tidak ditemukan"}
            </td>
            <td>
              {data_from_warehouse !== null
                ? data_from_warehouse.nm_warehouse
                : "Data tidak ditemukan"}
            </td>
            <td>
              {data_to_warehouse !== null
                ? data_to_warehouse.nm_warehouse
                : "Data tidak ditemukan"}
            </td>
            <td>{jumlah}</td>
            <td>
              {data_user !== null ? data_user.username : "Data tidak ditemukan"}
            </td>
            <td>
              {is_accept || id_status == 1 ? (
                <Badge bg="info">Selesai</Badge>
              ) : (
                <>
                  {to_warehouse == this.props.userGlobal.id_warehouse ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-sm btn-success me-1 mb-1"
                        disabled={el.is_default}
                        onClick={() => this.terimaBtnHandler(el)}
                        disabled={is_accept ? true : false}
                      >
                        &#10003; Terima
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger me-1 mb-1"
                        onClick={() => this.tolakBtnHandler(el)}
                        disabled={is_accept ? true : false}
                      >
                        &#10540; Tolak
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger mb-1"
                      disabled={el.is_default}
                      onClick={() => this.batalBtnHandler(el)}
                    >
                      &#9851; Batal
                    </button>
                  )}
                </>
              )}
            </td>
          </tr>
        );
      }
    );
    return output;
  };

  handleChangeFilterWarehouse = (el, type) => {
    console.log("handleChange");
    console.log(el);
    let data = {};
    if (type == 1) {
      data = {
        from_warehouse: el.length != 0 ? el[0].id_warehouse : "",
      };
    } else if (type == 2) {
      data = {
        to_warehouse: el.length != 0 ? el[0].id_warehouse : "",
      };
    } else {
      data = {
        from_warehouse: el.length != 0 ? el[0].id_warehouse : "",
        to_warehouse: el.length != 0 ? el[0].id_warehouse : "",
      };
    }
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
      <span>{option.nm_propinsi}</span>
    </>
  );

  handlePageClick = (data) => {
    console.log(data);
    const { selected } = data;
    this.props.getDataPermintaanProduk(
      selected,
      this.state.from_warehouse,
      this.state.to_warehouse,
      this.state.maxPerPage,
      this.props.userGlobal.id_warehouse,
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
    this.props.getDataPermintaanProduk(
      0,
      this.state.from_warehouse,
      this.state.to_warehouse,
      this.state.maxPerPage,
      this.props.userGlobal.id_warehouse,
      this.state.tgl_mulai,
      this.state.tgl_selesai,
      this.state.status_warehouse
    );
  };

  handleFilterReset = () => {
    this.props.getDataPermintaanProduk(
      this.state.pagesNow,
      this.props.userGlobal.id_warehouse,
      this.props.userGlobal.id_warehouse,
      this.state.maxPerPage,
      this.props.userGlobal.id_warehouse,
      null,
      null,
      null
    );
    this.setState({
      ...this.state,
      from_warehouse: this.props.userGlobal.id_warehouse,
      to_warehouse: this.props.userGlobal.id_warehouse,
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
            <h1 className="h2">Data Permintaan Produk</h1>
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
                    placeholder="Ketik nama warehouse pengirim"
                    id="filter-provinsi"
                    renderMenuItemChildren={this.renderFilterWarehouse}
                    labelKey="nm_warehouse"
                  />
                  <Spacer className="mb-3" />
                  <InputAutocomplete
                    label="Warehouse Penerima"
                    onChange={(e) => this.handleChangeFilterWarehouse(e, 1)}
                    optionsProps={
                      this.props.filterWarehouseGlobal.optionsFilterPenerima
                    }
                    isLoading={this.props.filterWarehouseGlobal.isLoading}
                    handleSearch={(e) => this.handleSearchFilterWarehouse(e, 1)}
                    placeholder="Ketik nama warehouse penerima"
                    id="filter-kabkota"
                    renderMenuItemChildren={this.renderFilterWarehouse}
                    labelKey="nm_warehouse"
                  />
                </>
              ) : (
                // (
                //   ""
                // )
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="status_warehouse"
                >
                  <Form.Label column sm="4" className="text-end">
                    Status sebagai
                  </Form.Label>
                  <Col sm="3">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={this.onInputchangeHandler}
                      value={this.state.status_warehouse}
                    >
                      <option value="0">Semua</option>
                      <option value="1">Warehouse Penerima Permintaan</option>
                      <option value="2">Warehouse Pengirim Permintaan</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              )}
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
                  <th>#</th>
                  <th>Status</th>
                  <th>Nama Produk</th>
                  <th>Warehouse Penerima Permintaan</th>
                  <th>Warehouse Pengirim Permintaan</th>
                  <th>Jumlah</th>
                  <th>Diterima Oleh</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>{this.renderTable()}</tbody>
            </Table>
            <div id="pagination">
              <ReactPaginate
                breakLabel={"..."}
                pageCount={Math.ceil(
                  this.props.permintaanProdukGlobal.total /
                    this.state.maxPerPage
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
              />
            </div>
          </div>
        </div>
        {/* <AppPermintaanBarangCreateUpdate
          isAddData={this.state.isAddData}
          modalData={this.state.modalData}
          isShow={this.props.permintaanProdukGlobal.modalIsOpen}
          modalTitle={this.state.modalTitle}
        /> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filterWarehouseGlobal: state.filterWarehouseReducer,
    permintaanProdukGlobal: state.permintaanProdukReducer,
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {
  getDataPermintaanProduk,
  addDataPermintaanProduk,
  updateDataPermintaanProduk,
  deleteDataPermintaanProduk,
  modalIsOpen,
  isTerimaPermintaanBarang,
  getDataFilterWarehouse,
  setLoadingFilterWarehouse,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPermintaanBarangView);
