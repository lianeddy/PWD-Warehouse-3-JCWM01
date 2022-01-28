import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import Swal from "sweetalert2";

import CardCl from "../../components/Card/Card";
import TableCl from "../../components/Table/Table";
import { URL_API } from "../../../helper";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  fetchCart = async function () {
    try {
      const { data } = await Axios.get(`${URL_API}/cart/get-my-cart?id_user=2`);
      // console.log(data.data);
      const cartItem = data.data;
      this.setState({ cart: cartItem });
      console.log(this.state.cart);
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

  componentDidMount() {
    this.fetchCart();
  }

  renderCartTable = function () {
    return this.state.cart.map((cart) => {
      return (
        <TableCl
          cartProduct={cart.nm_master_produk}
          qty={cart.quantity}
          harga={cart.harga}
          total={cart.total_produk}
          image={URL_API + cart.URL}
        />
      );
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>{this.renderCartTable()}</Col>
          {/* <Col hidden>
            <CardCl />
          </Col> */}
          <Col>
            <CardCl />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Cart;
