import React from "react";
import { connect } from "react-redux";
import { Card, Form } from "react-bootstrap";

import { getDataMultiAddress } from "../../../redux/actions/userMultiAddressAction";
import { getShippingService } from "../../../redux/actions/transaksiProdukAction";
import "./styles.css";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    courier: "",
    isFirst: false,
    shippingCostSelected: "",
  };

  componentDidMount() {
    this.props.getDataMultiAddress(
      0,
      null,
      null,
      10,
      this.props.userGlobal.id_user
    );
  }

  renderCardAdress = () => {
    return this.props.multiAdressGlobal.multiAddressList
      .filter((address) => address.is_default === 1)
      .map((defValue) => {
        return (
          <div>
            <Card.Subtitle className="mb-2 text-muted">
              {defValue.nm_data_alamat_user} (
              {defValue.contact_data_alamat_user})
            </Card.Subtitle>
            <Card.Text>
              {defValue.address_data_alamat_user} <br />
              Provinsi {defValue.datapropinsi.nm_propinsi} -{" "}
              {defValue.datakabkota.type} {defValue.datakabkota.nm_kabkota}
            </Card.Text>
          </div>
        );
      });
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
    this.setState({ isFirst: true });
  };

  inputHandler = (e) => {
    console.log(e.target.value);
    this.setState({ shippingCostSelected: e.target.value });
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
            onClick={this.inputHandler}
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
                  ${this.state.shippingCostSelected}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>
                  ${+this.renderTotalCart() + +this.state.shippingCostSelected}
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
                  <option>Shipping Option</option>
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

              {/* <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                />

                <label className="form-check-label" for="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                />
                <label className="form-check-label" for="save-info">
                  Save this information for next time
                </label>
              </div> */}

              <hr class="my-4" />

              <h4 className="mb-3">Payment</h4>

              <div className="my-3">
                <div className="form-check">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    checked
                    required
                  />
                  <label className="form-check-label" for="credit">
                    Credit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required
                  />
                  <label className="form-check-label" for="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required
                  />
                  <label className="form-check-label" for="paypal">
                    PayPal
                  </label>
                </div>
              </div>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label for="cc-name" className="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>

                <div className="col-md-6">
                  <label for="cc-number" className="form-label">
                    Credit card number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>

                <div className="col-md-3">
                  <label for="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>

                <div className="col-md-3">
                  <label for="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
