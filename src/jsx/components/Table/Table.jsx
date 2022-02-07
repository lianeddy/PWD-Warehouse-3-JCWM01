import React from "react";
import Axios from "axios";
import Swal from "sweetalert2";

import { Table, Button, InputGroup } from "react-bootstrap";

import { URL_API } from "../../../helper";

class TableCl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgWarningStock: "",
      countQtyCart: 0,
      data: [],
      stock: 1,
    };
    this.setState({ data: props.data });
    console.log(props.data);
    console.log(this.state.data);
  }

  // fetchDataCart = () => {
  //   // console.log("test");
  //   // console.log(this.props.data);
  //   // this.setState({ data: [1] });
  //   // console.log(this.state.data);
  //   console.log(this.state.data);
  //   this.setState({
  //     stock: 2,
  //   });
  //   console.log(this.state.stock);
  // };

  componentDidMount() {
    console.log(this.props.data);
    this.setState({ data: this.props.data });
  }

  // data = function () {
  //   console.log(this.state.data);
  //   console.log(this.state.stock);
  // };

  confirmDelete = async function (id) {
    // console.log(this.state.data);
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
    console.log(id);
    try {
      console.log("test");
      const cartDelete = await Axios.delete(
        `${URL_API}/cart/delete-item-in-cart/${id}`
      );

      console.log(cartDelete);
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

  quickShowStocks = async (id_product) => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/products/quick-check-stocks?id=${id_product}`
      );

      const stock = ++data.data[0].total_stock;

      this.setState({ ...this.state, stock });

      // setOtherInfo({ stock });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
      });
    }
  };

  inputHadler = (e, id, qty) => {
    this.setState({ countQtyCart: qty });
    const input = e.target.value;
    // const data = input > qty ? qty : input;
    // console.log(input);
    this.setState({ countQtyCart: +input });
  };

  render() {
    return (
      <Table responsive>
        {/* {Object.keys(...this.props.data).map((judul) => (
          <thead>
            <tr>
              <th>{judul}</th>
            </tr>
          </thead>
        ))} */}
        <tbody>
          {this.props.data.map((value, idx) => (
            <tr key={idx}>
              <td>
                <img src={URL_API + value.URL} height={90} width={90} />
              </td>
              <td>{value.ITEM}</td>
              {/* <td>{value.QTY}</td> */}
              <td>
                <InputGroup className="mb-3">
                  <Button
                    onClick={() =>
                      this.setState({
                        ...this.state,
                        countQtyCart: this.state.countQtyCart++,
                      })
                    }
                    variant="outline-secondary"
                    id="button-addon1"
                    disabled={this.state.countQtyCart === 0}
                    value={this.state.countQtyCart}
                  >
                    -
                  </Button>
                  {/* INPUT HANDLER FIXME */}
                  <input
                    type="number"
                    min="1"
                    onChange={(e) =>
                      this.inputHadler(e, value.id_app_carts_produk, value.QTY)
                    }
                    value={value.QTY}
                    // value={value.QTY}
                  />
                  {/* <input type="number" min="1" /> */}

                  <Button
                    onClick={() =>
                      this.setState({
                        ...this.state,
                        countQtyCart: this.state.countQtyCart++,
                      })
                    }
                    value={this.state.countQtyCart}
                    variant="outline-secondary"
                    id="button-addon1"
                    disabled={this.state.countQtyCart === this.state.stock}
                  >
                    +
                  </Button>
                </InputGroup>
              </td>
              <td>{value.PRICE}$</td>
              <td>{value.TOTAL}$</td>
              <td>
                <Button
                  onClick={() => this.confirmDelete(value.id_app_carts_produk)}
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default TableCl;
