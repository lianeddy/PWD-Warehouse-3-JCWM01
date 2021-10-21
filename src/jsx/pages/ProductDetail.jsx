import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { URL_API } from "../../helper";
import "./productDetail.css";

const ProductDetail = (props) => {
  //global state
  const userGlobal = useSelector((state) => state.authReducer);
  const { id_user } = userGlobal;

  //Redirect
  const [redirect, setRedirect] = useState(null);

  //productDetailData
  const [productDetail, setProductDetail] = useState([]);
  const [otherInfo, setOtherInfo] = useState({
    quantity: 1,
    productNotFound: false,
  });

  const [countAddToCart, setCountAddToCart] = useState(1);

  //handle count input
  const handleInput = (e) => {
    setCountAddToCart(parseInt(e.target.value));
  };

  const fetchProducts = () => {
    const token = localStorage.getItem("dataToken");
    console.log(token);
    Axios.get(
      `${URL_API}/products/${props.match.params.id_master_produk}`
      // {},
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    )
      .then((res) => {
        if (res.data.length) {
          setProductDetail(res.data[0]);
        } else {
          setOtherInfo({ productNotFound: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchStock = () => {};

  useEffect(() => {
    fetchProducts();
  });

  const addToCartHandler = () => {};

  return (
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
            <h4>{productDetail.nm_master_produk}</h4>
            <h5>${productDetail.harga}</h5>
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
                  width: "50px",
                  height: "35px",
                }}
                className="input__qty"
                value={countAddToCart}
                type="number"
                min="1"
                onChange={handleInput}
              />
              <button
                onClick={() => setCountAddToCart(countAddToCart + 1)}
                className="btn btn-outline-success me-4"
                style={{ marginLeft: "20px" }}
              >
                +
              </button>
            </div>
          </div>

          <button className="btn btn-success mt-3">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
