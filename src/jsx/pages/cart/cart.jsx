import React from "react";
import { Container, Row, Col, Table, Button, Stack } from "react-bootstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import InputSpinner from "react-bootstrap-input-spinner";

import { URL_API } from "../../../helper";
import { quickShowStocks } from "../../../redux/actions/transaksiProdukAction";
import { getCart } from "../../../redux/actions/cartAction";
import CartService from "./cart.services";
import productService from "../product-user/product.services";
import cartServices from "./cart.services";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }

  state = {
    qtyInCart: 0,
    typing: false,
    typingTimeout: 0,
    stock: 0,
    redirect: false,
  };

  componentDidMount() {
    this.props.getCart(this.props.userGlobal.id_user);
  }

  confirmDelete = async function (id) {
    Swal.fire({
      title: "Kamu yakin mau hapus produk ini?",
      text: "Beri tahu kami jika ini tidak cocok",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.BtnDeleteHandler(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  BtnDeleteHandler = async function (id) {
    try {
      await CartService.deleteCart(id);
      this.props.getCart(this.props.userGlobal.id_user);
    } catch (err) {
      const msgErr = err.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong! ${msgErr}`,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  changeQty = async (num, id_barang, id_cart) => {
    const self = this;

    const stockPerItem = await self.quickShowStocks(id_barang);

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      qtyInCart: +num > +stockPerItem ? stockPerItem : num,
      typing: false,
      typingTimeout: setTimeout(
        await function () {
          self.sendToParent(self.state.qtyInCart, id_cart);
        },
        2000
      ),
    });
  };

  sendToParent = async (qty, id_cart) => {
    let value = qty;
    try {
      await cartServices.updateQTY(id_cart, value);
      this.props.getCart(this.props.userGlobal.id_user);
    } catch (err) {
      console.log(err);
    }
  };

  quickShowStocks = async (id_product) => {
    try {
      const { data } = await productService.checkStock(id_product);
      const stock = ++data.data[0].total_stock;
      this.setState({
        stock,
      });
      return await stock;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
      });
    }
  };

  renderCartTable = function () {
    return this.props.cartGlobal.cartList.map((item, idx) => {
      return (
        <tr key={idx}>
          <td className="align-middle">
            <img src={URL_API + item.URL} height={90} width={90} />
          </td>
          <td className="align-middle">{item.ITEM}</td>

          <td height={150} width={150} className="align-middle">
            <InputSpinner
              className="mb-3"
              type={"real"}
              max={this.state.stock > 0 ? this.state.stock : 10000}
              min={1}
              step={1}
              value={item.QTY}
              onChange={(num) =>
                this.changeQty(
                  num,
                  item.id_master_barang,
                  item.id_app_carts_produk
                )
              }
              variant={"primary"}
              size="sm"
            />
          </td>

          <td className="align-middle">{item.PRICE}$</td>
          <td className="align-middle">{item.TOTAL}$</td>
          <td className="align-middle">
            <Button
              onClick={() => this.confirmDelete(item.id_app_carts_produk)}
              variant="outline-danger"
            >
              X
            </Button>
          </td>
        </tr>
      );
    });
  };

  routeChange = () => {
    let url = "/checkout";
    this.props.history.push(url);
  };

  render() {
    return (
      <>
        <div className="col-md-12 col-lg-12 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Your Cart Item</h1>
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

          <Row>
            <Col>
              <Table responsive>
                <thead className="thead light">
                  <tr>
                    <th className="align-middle"></th>
                    <th className="align-middle">Product</th>
                    <th className="align-middle">Quantity</th>
                    <th className="align-middle">Price</th>
                    <th className="align-middle">Total price</th>
                  </tr>
                </thead>
                <tbody>{this.renderCartTable()}</tbody>
              </Table>
            </Col>
          </Row>
          <Container>
            <Stack gap={2} className="col-md-5 mx-auto">
              <hr />
              <Button
                onClick={this.routeChange}
                variant="primary"
                disabled={this.props.cartGlobal.cartList.length === 0}
              >
                Process your cart
              </Button>
              <hr />
            </Stack>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
    cartGlobal: state.cartReducer,
  };
};

const mapDispatchToProps = {
  quickShowStocks,
  getCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
