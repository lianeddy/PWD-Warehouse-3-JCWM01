import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { getBuyTransactionDatas } from "../../../redux/actions/transaksiProdukAction";
import { URL_API } from "../../../helper";
import { status, badgeEl } from "../../../utility/Checker.js";
import orderServices from "./order.services";
import "./styles.css";

class Orders extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.fetchData();
  }

  renderTransactions = (data) => {
    return data.map((el, idx) => {
      return (
        <div key={idx} class="col-md-12">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-120 position-relative">
            <div class="col p-2 d-flex flex-column position-static">
              <div class="d-flex align-items-start">
                <div class="col-auto d-none d-lg-block p-2">
                  <img
                    class="bd-placeholder-img"
                    width="120"
                    height="128"
                    src={URL_API + el.getDetail[0].URL}
                  />
                </div>
                <div class="d-flex align-items-start flex-column">
                  <div class="d-flex align-items-start p-1">
                    <strong class="d-inline-block pr-6 text-primary">
                      {el.invoice_code}
                    </strong>
                    <div class="mb-1 text-muted px-1">
                      {moment(el.updated_at).format("DD MMM YYYY")}
                    </div>
                  </div>
                  <span
                    className={badgeEl(el.is_bayar, el.is_verify, el.is_tolak)}
                  >
                    {status(el.is_bayar, el.is_verify, el.is_tolak)}
                  </span>
                  <div class="d-flex align-items-start flex-column p-1">
                    <h6 class="mb-0">{el.getDetail[0].nm_master_produk}</h6>
                    <p class="card-text mb-auto">
                      {el.getDetail[0].jumlah} barang x ${el.getDetail[0].harga}
                    </p>
                    <a href="#">+{el.getDetail.length - 1} produk lainnya</a>
                    <strong class="card-text mb-auto">
                      Total Belanja: ${+el.ongkos_kirim + +el.total_harga}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  fetchData = async () => {
    const id_user = this.props.userGlobal.id_user;
    try {
      const value = await orderServices.getDataOrder(id_user);

      const dataTransactions = value.data.data;
      this.props.getBuyTransactionDatas(dataTransactions);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="col-md-12 col-lg-12 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Your Status Orders</h1>
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
        <div class="d-flex align-items-start flex-column">
          {this.props.transaksiProdukReducer.buyTransactionData.length !== 0
            ? this.renderTransactions(
                this.props.transaksiProdukReducer.buyTransactionData
              )
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
    transaksiProdukReducer: state.transaksiProdukReducer,
  };
};

const mapDispatchToProps = {
  getBuyTransactionDatas,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
