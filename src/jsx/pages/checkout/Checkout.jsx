import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Form } from "react-bootstrap";

import { URL_API } from "../../../helper";
import { getDataMultiAddress } from "../../../redux/actions/userMultiAddressAction";
import {
  getShippingService,
  getPaymentMethods,
  getShippingMethods,
  passOngkirAndIdMetodePengiriman,
  passIdMetodePembayaran,
  passIdWarehouseOrigin,
  passLocation,
  passTotalHarga,
  passKeterangan,
  passAllCheckoutDatas,
} from "../../../redux/actions/transaksiProdukAction";
import "./styles.css";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    courier: "",
    isFirst: false,
    redirect: false,
    shippingCostSelected: "",
    checkoutDatas: {
      id_user: 0,
      id_metode_pembayaran: 0,
      id_metode_pengiriman: 0,
      id_warehouse: 0,
      invoice_code: "",
      keterangan: "",
      alamat: "",
      total_harga: 0,
      ongkos_kirim: 0,
    },
  };

  componentDidMount() {
    this.props.getDataMultiAddress(
      0,
      null,
      null,
      10,
      this.props.userGlobal.id_user
    );
    this.props.getPaymentMethods();
    this.props.getShippingMethods();
  }

  renderCardAdress = () => {
    const findAddressDefault =
      this.props.multiAdressGlobal.multiAddressList.find(
        (address) => address.is_default === 1
      );

    if (findAddressDefault !== undefined) {
      const {
        nm_data_alamat_user,
        address_data_alamat_user,
        datakabkota,
        datapropinsi,
        contact_data_alamat_user,
      } = findAddressDefault;

      const alamat = `[${nm_data_alamat_user}], ${address_data_alamat_user}, ${datakabkota.type} ${datakabkota.nm_kabkota} - Provinsi ${datapropinsi.nm_propinsi}`;

      passLocation(alamat, this.props.userGlobal.id_user);

      return (
        <div>
          <Card.Subtitle className="mb-2 text-muted">
            {nm_data_alamat_user} ({contact_data_alamat_user})
          </Card.Subtitle>
          <Card.Text>
            {address_data_alamat_user} <br />
            Provinsi {datapropinsi.nm_propinsi} - {datakabkota.type}{" "}
            {datakabkota.nm_kabkota}
          </Card.Text>
        </div>
      );
    }
  };

  renderCartInfo = () => {
    return this.props.cartGlobal.cartList.map((value, idx) => {
      return (
        <li
          key={idx}
          className="list-group-item d-flex justify-content-between lh-sm"
        >
          <div>
            <h6 className="my-0">{value.ITEM}</h6>
            <small className="text-muted">
              ${value.PRICE} x {value.QTY}
            </small>
          </div>
          <span className="text-muted">${value.TOTAL}</span>
        </li>
      );
    });
  };

  renderTotalCart = () => {
    const total_harga = this.props.cartGlobal.cartList
      .map((value) => value.TOTAL)
      .reduce((cur, price) => cur + price, 0);

    passTotalHarga(total_harga);
    return total_harga;
  };

  dropDownShippingHandler = async (e) => {
    await this.props.getShippingService(
      this.props.userGlobal.id_user,
      e.target.value
    );

    const idWarehouseOrigin =
      this.props.transaksiProdukReducer.shippingCourier[0].id_warehouse_origin;

    passIdWarehouseOrigin(idWarehouseOrigin);
    this.setState({ isFirst: true });
  };

  componentDidUpdate(prevProps) {
    const props_checkout = this.props.transaksiProdukReducer.checkoutData;
    const props_detailTrans = this.props.cartGlobal.cartList;
    if (props_checkout !== prevProps.transaksiProdukReducer.checkoutData) {
      this.postDataCheckout(props_checkout, props_detailTrans);
    }
  }

  postDataCheckout = async (checkout, detailTrans) => {
    try {
      const dataDetailTrancs = detailTrans.map((elem) => ({
        id_master_barang: elem.id_master_barang,
        harga: elem.PRICE,
        jumlah: elem.QTY,
      }));

      const {
        alamat,
        id_metode_pembayaran,
        id_metode_pengiriman,
        id_user,
        id_warehouse,
        keterangan,
        ongkos_kirim,
        total_harga,
      } = checkout;

      let url = `${URL_API}/transactions/checkout`;
      if (alamat !== undefined) url += `?alamat=${alamat}`;
      if (id_metode_pembayaran !== undefined)
        url += `&id_metode_pembayaran=${id_metode_pembayaran}`;
      if (id_metode_pengiriman !== undefined)
        url += `&id_metode_pengiriman=${id_metode_pengiriman}`;
      if (id_user !== undefined) url += `&id_user=${id_user}`;
      if (id_warehouse !== undefined) url += `&id_warehouse=${id_warehouse}`;
      if (keterangan !== undefined) url += `&keterangan=${keterangan}`;
      if (ongkos_kirim !== undefined) url += `&ongkos_kirim=${ongkos_kirim}`;
      if (total_harga !== undefined) url += `&total_harga=${total_harga}`;
      console.log(url);

      const postData = await Axios.post(`${url}`, dataDetailTrancs);
    } catch (err) {
      console.log(err);
    }
  };
  submitCheckout = () => {
    this.props.passAllCheckoutDatas();
    this.setState({ redirect: true });
  };

  inputHandler = (e, service) => {
    const ongkos_kirim = e.target.value;
    console.log(ongkos_kirim);
    const data = this.props.transaksiProdukReducer.shippingMethods.find(
      (el) => el.kode_metode_pengiriman === service
    );
    const id_metode_pengiriman = data.id_metode_pengiriman;
    passOngkirAndIdMetodePengiriman(ongkos_kirim, id_metode_pengiriman);
  };

  renderCategoryMethods = () => {
    return this.props.transaksiProdukReducer.paymentMethods.map((value) => {
      return (
        <option value={value.id_metode_pembayaran}>
          {value.nm_metode_pembayaran}
        </option>
      );
    });
  };

  renderShippingServices = (courier) => {
    return courier.map((value) => {
      return (
        <React.Fragment>
          <input
            className="list-group-item-check"
            type="radio"
            name="listGroupCheckableRadios"
            id="listGroupCheckableRadios1"
            value={value.cost[0].value}
            onClick={(e) => this.inputHandler(e, value.service)}
          />
          <label
            className="list-group-item py-3"
            for="listGroupCheckableRadios1"
          >
            {value.service} || {value.description}
            <span className="d-block small opacity-50">
              estimated shipping {value.cost[0].etd}
            </span>
            <span>Rp. {value.cost[0].value}</span>
          </label>
        </React.Fragment>
      );
    });
  };

  dropDownPaymentHandler = (e) => {
    const id_metode_pembayaran = e.target.value;
    passIdMetodePembayaran(id_metode_pembayaran);
  };

  inputAdditionalInfo = (e) => {
    const keterangan = e.target.value;
    passKeterangan(keterangan);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/orders" />;
    }

    return (
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout</h2>
        </div>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
                {this.props.cartGlobal.cartList.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {/* render list item here */}
              {this.renderCartInfo()}
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Shipping Costs</h6>
                </div>
                <span className="text-success">
                  ${this.state.checkoutDatas.ongkos_kirim}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>
                  $
                  {+this.renderTotalCart() +
                    +this.state.checkoutDatas.ongkos_kirim}
                </strong>
              </li>
            </ul>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="additional information"
                onChange={this.inputAdditionalInfo}
              />
            </div>
          </div>
          <div className="col-md-7 col-lg-8">
            {/* <form className="needs-validation" novalidate> */}
            <Card>
              <Card.Body>
                <Card.Title>Alamat pengirim</Card.Title>
                <hr />
                {this.renderCardAdress()}
                <Card.Link href="users/multi-address">
                  Pilih Alamat Lain
                </Card.Link>
              </Card.Body>
            </Card>

            <hr class="my-4" />

            <div className="list-group-checkable">
              <Form.Select
                isValid={false}
                onChange={this.dropDownShippingHandler}
                aria-label="Default select example"
              >
                <option value="">Shipping Option</option>
                <option value="jne">JNE</option>
                <option value="pos">POS Indonesia</option>
                <option disabled value="tiki">
                  TIKI
                </option>
              </Form.Select>

              {this.state.isFirst
                ? this.renderShippingServices(
                    this.props.transaksiProdukReducer.shippingCourier[0]
                      .shipping_service
                  )
                : []}
            </div>

            <hr class="my-4" />

            <h4 className="mb-3">Payment</h4>

            <Form.Select
              isValid={false}
              onChange={this.dropDownPaymentHandler}
              aria-label="Default select example"
            >
              <option value="">Payment Option</option>
              {this.renderCategoryMethods()}
            </Form.Select>

            <hr class="my-4" />
            <button
              onClick={this.submitCheckout}
              className="w-100 btn btn-primary btn-lg"
              type="submit"
            >
              Continue to checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
    cartGlobal: state.cartReducer,
    multiAdressGlobal: state.userMultiAddressReducer,
    transaksiProdukReducer: state.transaksiProdukReducer,
  };
};

const mapDispatchToProps = {
  getDataMultiAddress,
  getShippingService,
  getPaymentMethods,
  getShippingMethods,
  passAllCheckoutDatas,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
