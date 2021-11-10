import React from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  addDataPermintaanProduk,
  modalIsOpen,
  updateDataPermintaanProduk,
  updateJmlSelisih,
} from "../../../redux/actions/permintaanProdukAction";
import InputAutocomplete from "../InputAutocomplete";
import { isEmpty } from "../../../utility/Checker";
import {
  getDataFilterWarehouse,
  setLoadingFilterWarehouse,
  setSelectedWarehouse,
} from "../../../redux/actions/filterWarehouseAction";
import { withRouter } from "react-router-dom";
import Spacer from "../Spacer";
import BtnFilterCari from "../BtnFilterCari";
import AppPermintaanBarangCreateUpdate from "../AppPermintaanBarang/AppPermintaanBarangCreateUpdate";
import { URL_API } from "../../../helper";
import Axios from "axios";
import {
  isTerimaPesanan,
  isTolakPesanan,
} from "../../../redux/actions/transaksiProdukAction";
import { SwalFire } from "../../../utility/SwalFire";

class AppTransaksiAdminDetail extends React.Component {
  state = {
    show: false,
    jumlah: 1,
    jumlahMax: 1000,
    jumlahMin: 1,
    deskripsi: "",
    isAllProductFound: false,
    to_warehouse: null,
    id_master_produk: null,
    id_data_alamat_user: 0,
    modalData: {
      data_master_produk: {},
    },
    dataDetail: {
      data_detail_transaksi_master_produk: [],
      data_user: {},
      data_alamat_user_single: {
        datakabkota: {},
        datapropinsi: {},
      },
    },
  };

  componentDidMount() {
    console.log("AppTransaksiAdminDetail MOUNT");
    console.log(this.props.location.state.state);
    Axios.get(`${URL_API}/history-transaksi-produk`, {
      params: {
        id_transaksi_master_produk:
          this.props.match.params.id_transaksi_master_produk,
      },
    }).then((result) => {
      // console.log(result);
      this.setState({ ...this.state, dataDetail: result.data.results[0] });
      console.table(this.state.dataDetail);
    });
  }

  componentDidUpdate() {
    console.log("AppTransaksiAdminDetail UPDATE");
  }

  onInputchangeHandler = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  terimaBtnHandler = () => {
    // let data = {
    //   id_user: this.props.userGlobal.id_user,
    //   id_master_produk: this.state.id_master_produk,
    //   to_warehouse: this.state.to_warehouse,
    //   from_warehouse: this.props.userGlobal.id_warehouse,
    //   jumlah: this.state.jumlah,
    //   id_status: 3,
    //   deskripsi: this.state.deskripsi,
    // };
    // this.props.addDataPermintaanProduk(data);
    SwalFire.fire({
      title: "Anda yakin?",
      text: `Menerima pesanan ini.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mengirim data update
        this.props.isTerimaPesanan(
          this.state.dataDetail.id_transaksi_master_produk,
          this.props.history,
          this.props.userGlobal
        );
      }
    });
  };

  requestProdukBtnHandler = (data) => {
    this.setState({
      ...this.state,
      isAddData: true,
      modalData: { ...data },
      modalTitle: "Request Products",
    });
    this.props.modalIsOpen(true);
  };

  kembaliBtnHandler = () => {
    this.props.history.goBack();
  };

  tolakBtnHandler = () => {
    SwalFire.fire({
      title: "Anda yakin?",
      text: `Menolak pesanan ini.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mengirim data update
        this.props.isTolakPesanan(
          this.state.dataDetail.id_transaksi_master_produk,
          this.props.history
        );
      }
    });
  };

  checkRequestProducts = () => {
    let out =
      this.state.dataDetail.data_permintaan_produk_single != null
        ? this.state.dataDetail.data_permintaan_produk_single.id_status
        : null;
    if (out == 3) {
      return 0;
    }
    if (out == 1) {
      return 1;
    }
    if (out == null) return 2;
  };

  checkStock = (valA, valB, data) => {
    // console.log("CHECK STOK");
    // console.table(data);
    data = {
      ...data,
      jumlah_selisih: Math.abs(valA - valB),
    };
    if (valA - valB < 0) {
      return (
        <>
          <div className="mb-1">
            <b>Stock Gudang Tidak Mencukupi</b>
          </div>
          <div className="mb-0">
            {this.checkRequestProducts() == 1 ? (
              <b>Permintaan Ditolak</b>
            ) : this.checkRequestProducts() == 2 ? (
              <Button
                variant="info"
                onClick={() => this.requestProdukBtnHandler(data)}
              >
                &#10147; Request Stok
              </Button>
            ) : (
              <b>Menunggu Persetujuan Permintaan Produk Dari Warehouse Lain</b>
            )}
          </div>
        </>
      );
    }
    return (
      <div>
        <b>Stock Mencukupi</b>
      </div>
    );
  };

  renderTable = () => {
    let no = 0;
    if (this.state.dataDetail.data_detail_transaksi_master_produk.length == 0) {
      return (
        <tr>
          <td colSpan="10" className="text-center">
            <em>Data Kosong</em>
          </td>
        </tr>
      );
    }
    let output = this.state.dataDetail.data_detail_transaksi_master_produk.map(
      (el, index) => {
        const { data_master_produk, jumlah, data_persediaan_produk_single } =
          el;
        no += 1;
        return (
          <>
            <tr>
              <td className="align-middle text-center" rowSpan="4">
                {index + 1}
              </td>
              <td className="align-middle">
                <b>Nama Produk</b>
              </td>
              <td className="align-middle">
                {data_master_produk.nm_master_produk}
              </td>
              <td className="align-middle text-center" rowSpan="4">
                {this.checkStock(
                  parseInt(data_persediaan_produk_single.stok),
                  parseInt(jumlah),
                  el
                )}
              </td>
            </tr>
            <tr>
              <td className="align-middle">
                <b>Harga Satuan</b>
              </td>
              <td className="align-middle">{data_master_produk.harga}</td>
            </tr>
            <tr>
              <td className="align-middle">
                <b>Jumlah</b>
              </td>
              <td className="align-middle">{jumlah}</td>
            </tr>
            <tr>
              <td className="align-middle">
                <b>Stock Gudang</b>
              </td>
              <td className="align-middle">
                {data_persediaan_produk_single.stok}
              </td>
            </tr>
          </>
        );
      }
    );
    return output;
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 col-lg-12 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">
              Detail Pesanan {this.props.location.state.state.invoice_code}
            </h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button
                  type="button"
                  className="btn btn-secondary me-1"
                  onClick={this.kembaliBtnHandler}
                >
                  &#8592; Kembali
                </button>
                <button
                  type="button"
                  className="btn btn-primary me-1"
                  onClick={this.terimaBtnHandler}
                >
                  &#10004; Terima
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.tolakBtnHandler}
                >
                  &#10006; Tolak
                </button>
              </div>
            </div>
          </div>

          {/* Form Filter */}
          <div>
            <Card>
              <Card.Body className="mb-3">
                <Card.Title>Deskripsi Customer</Card.Title>
                <hr />
                <Spacer className="mt-3" />
                <Table border>
                  <tbody>
                    <tr>
                      <td className="text-end">
                        <b>Username</b>
                      </td>
                      <td>{this.state.dataDetail.data_user.username}</td>
                    </tr>
                    <tr>
                      <td className="text-end">
                        <b>Nama Pemesan</b>
                      </td>
                      <td>{this.state.dataDetail.data_user.full_name}</td>
                    </tr>
                    <tr>
                      <td className="text-end">
                        <b>Nomer Telepon</b>
                      </td>
                      <td>{this.state.dataDetail.data_user.phone}</td>
                    </tr>
                    <tr>
                      <td className="text-end">
                        <b>Alamat Lengkap</b>
                      </td>
                      <td>
                        {
                          this.state.dataDetail.data_alamat_user_single
                            .address_data_alamat_user
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className="text-end">
                        <b>Provinsi</b>
                      </td>
                      <td>
                        {
                          this.state.dataDetail.data_alamat_user_single
                            .datapropinsi.nm_propinsi
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className="text-end">
                        <b>Kabupaten / Kota</b>
                      </td>
                      <td>
                        {
                          this.state.dataDetail.data_alamat_user_single
                            .datakabkota.nm_kabkota
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className="text-end">
                        <b>Ongkos Kirim</b>
                      </td>
                      <td>{this.state.dataDetail.ongkos_kirim}</td>
                    </tr>
                    <tr>
                      <td className="text-end">
                        <b>Bukti Pembayaraan</b>
                      </td>
                      <td>{this.state.dataDetail.ongkos_kirim}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>

          <div className="table-responsive mt-3">
            <Table bordered>
              <thead>
                <tr>
                  <th className="text-center align-middle">#</th>
                  <th className="text-center align-middle">Keterangan</th>
                  <th className="text-center align-middle">Nilai</th>
                  <th className="text-center align-middle">Stock Warehouse</th>
                </tr>
              </thead>
              <tbody>{this.renderTable()}</tbody>
            </Table>
          </div>
        </div>
        <AppPermintaanBarangCreateUpdate
          isAddData={this.state.isAddData}
          modalData={this.state.modalData}
          isShow={this.props.permintaanProdukGlobal.modalIsOpen}
          modalTitle={this.state.modalTitle}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    permintaanProdukGlobal: state.permintaanProdukReducer,
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
  updateJmlSelisih,
  isTerimaPesanan,
  isTolakPesanan,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppTransaksiAdminDetail)
);
