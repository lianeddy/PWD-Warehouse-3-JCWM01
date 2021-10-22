import React from "react";
import { connect } from "react-redux";
import {
  getDataMultiAddress,
  modalIsOpen,
  setDefaultMultiAddress,
  deleteDataMultiAddress,
} from "../../../redux/actions/userMultiAddressAction";
import { Modal, Button, Table, Card, Col, Badge } from "react-bootstrap";
import AppDataAlamatUserCreateUpdate from "./AppDataAlamatUserCreateUpdate";
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

class AppDataAlamatUserView extends React.Component {
  state = {
    show: false,
    modalTitle: "",
    isAddData: true,
    modalData: {},
    dataTable: [],
    pagesNow: 0,
    maxPerPage: 10,
    id_propinsi_filter: null,
    id_kabkota_filter: null,
    isLoadingFilterKabKota: false,
    optionsFilterKabKota: [],
    multiAddressLocal: this.props.multiAddressGlobal.multiAddressList,
  };

  componentDidMount() {
    this.props.getDataMultiAddress(
      this.state.pagesNow,
      this.state.id_propinsi_filter,
      this.state.id_kabkota_filter,
      this.state.maxPerPage,
      this.props.userGlobal.id_user
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
      modalTitle: "Tambah Data",
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

  deleteBtnHandler = (data) => {
    SwalFire.fire({
      title: "Anda yakin?",
      text: `Menghapus data alamat ${data.nm_data_alamat_user}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mengirim data update
        const { id_data_alamat_user, id_user } = data;
        let dataUpdate = { is_default: 1, id_user };
        this.props.deleteDataMultiAddress(id_data_alamat_user, dataUpdate);
      }
    });
  };

  setDefaultModalHandler = (data) => {
    // console.log(data);
    SwalFire.fire({
      title: "Anda yakin?",
      text: `Menjadikan ini sebagai default alamat`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mengirim data update
        const { id_data_alamat_user, id_user } = data;
        let dataUpdate = { is_default: 1, id_user };
        this.props.setDefaultMultiAddress(id_data_alamat_user, dataUpdate);
      }
    });
  };

  renderTable = () => {
    let no = 0;
    if (this.props.multiAddressGlobal.multiAddressList.length == 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center">
            <em>Data Kosong</em>
          </td>
        </tr>
      );
    }
    let output = this.props.multiAddressGlobal.multiAddressList.map((el) => {
      const {
        nm_data_alamat_user,
        contact_data_alamat_user,
        address_data_alamat_user,
        is_default,
        datapropinsi,
        datakabkota,
      } = el;
      no += 1;
      return (
        <tr key={el.id_data_alamat_user}>
          <td>
            {NumberPagination(no, this.state.pagesNow, this.state.maxPerPage)}
          </td>
          <td>
            <Badge bg={is_default ? "primary" : "secondary"}>
              {is_default ? "Ya" : "Tidak"}
            </Badge>
          </td>
          <td>{nm_data_alamat_user}</td>
          <td>{contact_data_alamat_user}</td>
          <td>{address_data_alamat_user}</td>
          <td>
            {datapropinsi.hasOwnProperty("nm_propinsi")
              ? datapropinsi.nm_propinsi
              : ""}
          </td>
          <td>
            {datakabkota.hasOwnProperty("nm_kabkota")
              ? datakabkota.nm_kabkota
              : ""}
          </td>
          <td>
            <button
              type="button"
              className="btn btn-sm btn-success me-1 mb-1"
              disabled={el.is_default}
              onClick={() => this.setDefaultModalHandler(el)}
            >
              Set Default
            </button>
            <button
              type="button"
              className="btn btn-sm btn-warning me-1 mb-1"
              onClick={() => this.updateModalHandler(el)}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger mb-1"
              disabled={el.is_default}
              onClick={() => this.deleteBtnHandler(el)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return output;
  };

  handleChangeFilterProvinsi = (el) => {
    console.log("handleChange");
    console.log(el);
    this.setState({
      ...this.state,
      id_propinsi_filter: el.length != 0 ? el[0].id_propinsi : "",
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
    this.setState({
      ...this.state,
      id_kabkota_filter: el.length != 0 ? el[0].id_kabkota : "",
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

  handlePageClick = (data) => {
    console.log(data);
    const { selected } = data;
    this.props.getDataMultiAddress(
      selected,
      this.state.id_propinsi_filter,
      this.state.id_kabkota_filter,
      this.state.maxPerPage,
      this.props.userGlobal.id_user
    );
    this.setState({
      ...this.state,
      pagesNow: selected,
    });
  };

  handleFilter = () => {
    this.props.getDataMultiAddress(
      this.state.pagesNow,
      this.state.id_propinsi_filter,
      this.state.id_kabkota_filter,
      this.state.maxPerPage,
      this.props.userGlobal.id_user
    );
  };

  handleFilterReset = () => {
    this.props.getDataMultiAddress(
      this.state.pagesNow,
      null,
      null,
      this.state.maxPerPage,
      this.props.userGlobal.id_user
    );
    this.setState({
      ...this.state,
      id_propinsi_filter: null,
      id_kabkota_filter: null,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 col-lg-12 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Data Alamat User</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.tambahModalHandler}
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
          <div>
            <Card body className="mb-3">
              <Spacer className="mt-3" />
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
              />
              <Spacer className="mb-3" />
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
              />
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
                  <th>Default</th>
                  <th>Nama Alamat</th>
                  <th>Kontak User</th>
                  <th>Alamat Lengkap</th>
                  <th>Provinsi</th>
                  <th>Kabupaten / Kota</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>{this.renderTable()}</tbody>
            </Table>
            <div id="pagination">
              <ReactPaginate
                breakLabel={"..."}
                pageCount={Math.ceil(
                  this.props.multiAddressGlobal.total / this.state.maxPerPage
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
        <AppDataAlamatUserCreateUpdate
          isAddData={this.state.isAddData}
          modalData={this.state.modalData}
          isShow={this.props.multiAddressGlobal.modalIsOpen}
          modalTitle={this.state.modalTitle}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    multiAddressGlobal: state.userMultiAddressReducer,
    filterProvinsiGlobal: state.filterProvinsiReducer,
    filterKabkotaGlobal: state.filterKabkotaReducer,
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {
  getDataMultiAddress,
  modalIsOpen,
  setDefaultMultiAddress,
  deleteDataMultiAddress,
  getDataFilterProvinsi,
  setLoadingFilterProvinsi,
  getDataFilterKabkota,
  setLoadingFilterKabkota,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDataAlamatUserView);
