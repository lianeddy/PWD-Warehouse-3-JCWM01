import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
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
      const { data } = await Axios.get(
        `${URL_API}/cart/get-my-cart?id_user=${this.props.userGlobal.id_user}`
      );
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
    return this.state.cart.map((item) => {
      return (
        <TableCl
          head={Object.keys(item)[1]}
          cartProduct={item.nm_master_produk}
          qty={item.quantity}
          harga={item.harga}
          total={item.total_produk}
          image={URL_API + item.URL}
        />
      );
    });
  };

  render() {
    return (
      <Container>
        <Row>
          {/* <Col>{this.renderCartTable()}</Col> */}
          <Col>
            <TableCl data={this.state.cart} />
          </Col>

          <Col hidden>
            <CardCl />
          </Col>
          {/* <Col>
            <CardCl  />
          </Col> */}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

export default connect(mapStateToProps, null)(Cart);
