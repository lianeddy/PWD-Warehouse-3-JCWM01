import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  return (
    <div class="col">
      <div class="card shadow-sm">
        <Link to={`/product-detail/${props.id_master_produk}`}>
          <div>
            <img
              class="bd-placeholder-img card-img-top"
              width="10rem"
              src={props.image}
              role="img"
              aria-label="Placeholder: Thumbnail"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            />
          </div>
        </Link>

        <div class="card-body">
          <p class="card-text">{props.productName}</p>

          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">
                Add to Cart
              </button>
            </div>
            <small class="text-muted">${props.price}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
