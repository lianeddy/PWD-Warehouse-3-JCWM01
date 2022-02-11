import React from "react";
import { connect } from "react-redux";
import { Card, Form } from "react-bootstrap";

import { getDataMultiAddress } from "../../../redux/actions/userMultiAddressAction";
import {
  getShippingService,
  getPaymentMethods,
  getShippingMethods,
} from "../../../redux/actions/transaksiProdukAction";
import "./styles.css";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    courier: "",
    isFirst: false,
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
    test: "",
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
    //FIXME
    const findAddressDefault =
      this.props.multiAdressGlobal.multiAddressList.find(
        (address) => address.is_default === 1
      );

    if (findAddressDefault !== undefined) {
      console.log(findAddressDefault);

      const {
        nm_data_alamat_user,
        address_data_alamat_user,
        datakabkota,
        datapropinsi,
        contact_data_alamat_user,
      } = findAddressDefault;

      const alamat = `[${nm_data_alamat_user}], ${address_data_alamat_user}, ${datakabkota.type} ${datakabkota.nm_kabkota} - Provinsi ${datapropinsi.nm_propinsi}`;
      console.log(alamat);

      this.submitCheckout(alamat);

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
    return this.props.cartGlobal.cartList.map((value) => {
      return (
        <li className="list-group-item d-flex justify-content-between lh-sm">
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
    return this.props.cartGlobal.cartList
      .map((value) => value.TOTAL)
      .reduce((cur, price) => cur + price, 0);
  };

  dropDownShippingHandler = async (e) => {
    await this.props.getShippingService(
      this.props.userGlobal.id_user,
      e.target.value
    );

    const idWarehouseOrigin =
      this.props.transaksiProdukReducer.shippingCourier[0].id_warehouse_origin;
    // this.setState({ isFirst: true });
    this.setState((prevState) => ({
      isFirst: true,
      checkoutDatas: {
        ...prevState.checkoutDatas,
        id_warehouse: idWarehouseOrigin,
      },
    }));
  };

  submitCheckout = (alamat) => {
    // this.setState
    // this.setState((prevState) => ({
    //   checkoutDatas: {
    //     ...prevState.checkoutDatas,
    //     alamat,
    //   },
    // }));
  };

  inputHandler = (e, service) => {
    console.log(e.target.value);
    console.log(this.props.transaksiProdukReducer.shippingMethods);
    const data = this.props.transaksiProdukReducer.shippingMethods.find(
      (el) => el.kode_metode_pengiriman === service
    );
    console.log(data.id_metode_pengiriman);
    console.log(this.props.multiAdressGlobal);
    this.setState((prevState) => ({
      checkoutDatas: {
        ...prevState.checkoutDatas,
        ongkos_kirim: e.target.value,
        id_metode_pengiriman: data.id_metode_pengiriman,
      },
    }));
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
    console.log(e.target.value);
    this.setState((prevState) => ({
      checkoutDatas: {
        ...prevState.checkoutDatas,
        id_metode_pembayaran: e.target.value,
      },
    }));
  };

  render() {
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

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-7 col-lg-8">
            <form className="needs-validation" novalidate>
              <Card>
                <Card.Body>
                  <Card.Title>Alamat pengirim</Card.Title>
                  <hr />
                  {/* render here */}
                  {this.renderCardAdress()}
                  <Card.Link href="users/multi-address">
                    Pilih Alamat Lain
                  </Card.Link>
                </Card.Body>
              </Card>

              <hr class="my-4" />

              <div className="list-group-checkable">
                <Form.Select
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

                {/* RENDER SHIPPING SERVICES HERE */}

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
                onChange={this.dropDownPaymentHandler}
                aria-label="Default select example"
              >
                <option value="">Payment Option</option>
                {this.renderCategoryMethods()}
              </Form.Select>

              <hr class="my-4" />
              <button
                onClick={this.test}
                className="w-100 btn btn-primary btn-lg"
                type="submit"
              >
                Continue to checkout
              </button>
            </form>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
