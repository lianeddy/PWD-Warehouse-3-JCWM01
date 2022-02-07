import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import "./productDetail.css";
import Swal from "sweetalert2";
import { Card, Badge } from "react-bootstrap";

import { URL_API } from "../../helper";
import { quickShowStocks } from "../../redux/actions/transaksiProdukAction";

const ProductDetail = (props) => {
  //global state
  const userGlobal = useSelector((state) => state.authReducer);
  const { id_user } = userGlobal;

  //productDetailData
  const [productDetail, setProductDetail] = useState([]);
  const [otherInfo, setOtherInfo] = useState({
    stock: 1,
  });

  const [countAddToCart, setCountAddToCart] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const token = localStorage.getItem("dataToken");
    Axios.get(
      `${URL_API}/products/${props.match.params.id_master_produk}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    )
      .then((res) => {
        setProductDetail(res.data[0]);
        dispatch(quickShowStocks(res.data[0].id_master_produk, setOtherInfo));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCartHandler = async () => {
    // AJAX CALL
    try {
      const { data } = await Axios.post(
        `${URL_API}/cart/add-from-product-list/${productDetail.id_master_produk}?quantity=${countAddToCart}&id_user=${id_user}`
      );

      const msg = data.data;

      Swal.fire({
        position: "center",
        icon: "success",
        title: `${msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      // Error Handling
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
      });
    }
  };

  //handle count input
  const handleInput = (e) => {
    let input = e.target.value;
    if (+input === 0) return (input = 1);
    const data = input > otherInfo.stock ? otherInfo.stock : input;
    setCountAddToCart(+data);
  };

  const badgeShow = (bgColor, text) => {
    const component = <Badge bg={bgColor}>{text}</Badge>;
    return component;
  };

  return (
    <div className="col-md-12 col-lg-12 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{productDetail.nm_master_produk}</h1>
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
      <Card body className="mb-3">
        <div className="card-body">
          <div className="container">
            <div className="row mt-3">
              <div className="col-6">
                <img
                  style={{ width: "100%" }}
                  src={URL_API + productDetail.URL}
                  alt=""
                />
              </div>
              <div className="col-6 d-flex flex-column justify-content-center">
                {/* <h4>{productDetail.nm_master_produk}</h4> */}
                <h5>${productDetail.harga}</h5>
                <div>
                  {otherInfo.stock !== 0
                    ? badgeShow("success", "In stock")
                    : badgeShow("danger", "out of stock")}
                </div>
                <p>{productDetail.description}</p>
                <div className="d-flex flex-row align-items-center ">
                  <button
                    onClick={() => setCountAddToCart(countAddToCart - 1)}
                    className="btn btn-outline-success me-4"
                    style={{ marginRight: "20px" }}
                    disabled={countAddToCart === 1}
                  >
                    -
                  </button>
                  <input
                    style={{
                      textAlign: "center",
                      border: "none",
                      width: "100px",
                      height: "20px",
                    }}
                    className="input__qty"
                    // value={
                    //   countAddToCart > otherInfo.stock ? otherInfo.stock : 1
                    // }
                    value={countAddToCart}
                    type="number"
                    min="1"
                    onChange={handleInput}
                  />
                  <button
                    onClick={() => setCountAddToCart(countAddToCart + 1)}
                    className="btn btn-outline-success me-4"
                    style={{ marginLeft: "20px" }}
                    disabled={otherInfo.stock === countAddToCart}
                  >
                    +
                  </button>
                  <button
                    onClick={addToCartHandler}
                    className="btn btn-success me-4"
                    disabled={otherInfo.stock === 0}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
