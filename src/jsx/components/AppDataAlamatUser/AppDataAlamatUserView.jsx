import React from "react";
import { connect } from "react-redux";
import {
  getDataMultiAddress,
  modalIsOpen,
} from "../../../redux/actions/userMultiAddressAction";
import { Modal, Button, Table, Card, Col } from "react-bootstrap";
import AppDataAlamatUserCreateUpdate from "./AppDataAlamatUserCreateUpdate";
import { SwalFire } from "../../../utility/SwalFire";
import { NumberPagination } from "../../../utility/NumberPagination";
import { BoostrapPaginator } from "../../../utility/BootstraPaginator";
import SelectCategory from "../SelectCategory";
import Spacer from "../Spacer";
import BtnFilterCari from "../BtnFilterCari";
import { URL_API } from "../../../helper";

class AppDataAlamatUserView extends React.Component {
  state = {
    show: false,
    modalTitle: "",
    isAddData: true,
    modalData: {},
    dataTable: [],
    pagesNow: 0,
    maxPerPage: 10,
    id_propinsi: "",
    id_kabkota: "",
    isLoadingFilterProvinsi: false,
    isLoadingFilterKabKota: false,
    optionsFilterProvinsi: [],
  };

  componentDidMount() {
    this.props.getDataMultiAddress(
      this.state.pagesNow,
      null,
      null,
      this.state.maxPerPage
    );
    let outPaging = BoostrapPaginator(
      "/users/multi-address?pages=",
      this.props.multiAddressGlobal.pagesNow,
      this.props.multiAddressGlobal.maxPerPage,
      1000
    ).render();
    document.getElementById("pagination").innerHTML = outPaging;
  }

  ge;

  tambahModalHandler = () => {
    // alert("CLICK tambahModalHandler");
    this.setState({
      ...this.state,
      isAddData: true,
      modalTitle: "Tambah Data",
    });
    this.props.modalIsOpen(true);
  };

  updateModalHandler = (data) => {
    this.setState({
      ...this.state,
      isAddData: false,
      modalData: {},
      modalTitle: "Update Data",
    });
    this.props.modalIsOpen(true);
  };

  setDefaultModalHandler = (id) => {
    SwalFire.fire({
      title: <p>Hello World</p>,
      footer: "Copyright 2018",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal`
        //   with all the same instance & static methods
        SwalFire.clickConfirm();
      },
    }).then(() => {
      return SwalFire.fire(<p>Shorthand works too</p>);
    });
  };

  renderTable = () => {
    // console.log("Data Render Table");
    // console.table(this.props.multiAddressGlobal.multiAddressList);
    let no = 0;
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
          <td>{is_default ? "Default" : ""}</td>
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
              className="btn btn-sm btn-success me-1"
              onClick={() => this.setDefaultModalHandler(el)}
            >
              Set Default
            </button>
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={() => this.updateModalHandler(el.id_data_alamat_user)}
            >
              Update
            </button>
          </td>
        </tr>
      );
    });
    return output;
  };

  filterSearchProvinsi = (query) => {
    this.setState({
      ...this.state,
      isLoadingFilterProvinsi: true,
    });

    fetch(`${URL_API}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        const options = items.map((i) => ({
          avatar_url: i.avatar_url,
          id: i.id,
          login: i.login,
        }));

        // setOptions(options);
        this.setState({
          ...this.state,
          isLoadingFilterProvinsi: false,
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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
              <SelectCategory label="Nama Provinsi" onSearch={""} />
              <Spacer className="mb-3" />
              <SelectCategory label="Nama Kabupaten / Kota" />
              <Spacer className="mb-3" />
              <BtnFilterCari />
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
            <div id="pagination"></div>
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
  };
};

const mapDispatchToProps = {
  getDataMultiAddress,
  modalIsOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDataAlamatUserView);
