import React, { useState } from "react";
import "./productDetail.css";

const ProductDetail = () => {
  const [countAddToCart, setCountAddToCart] = useState(1);

  const handleInput = (e) => {
    setCountAddToCart(parseInt(e.target.value));
  };

  return (
    <div className="card-body">
      <div className="container">
        <div className="row mt-3">
          <div className="col-6">
            <img
              style={{ width: "100%" }}
              src="https://content.adidas.co.in/static/Product-DB3114/UNISEX_Originals_VULCANIZED_SHOES_LOW_DB3114_1.jpg"
              alt=""
            />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h4>Unisex adidas Originals Adi-Ease Shoes</h4>
            <h5>$5999</h5>
            <p>
              Iconic style meets skate-specific features in these shoes built to
              handle any situation. This version of the famous bare-bones skate
              shoes features a printed upper with a vulcanized outsole that's
              the standard for flexibility and board feel.
            </p>
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
