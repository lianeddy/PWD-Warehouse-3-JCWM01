import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Card.css";
import { useSelector } from "react-redux";

const Card = (props) => {
  const userGlobal = useSelector((state) => state.authReducer);

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
          {/* <small class="text-muted">{props.total_stok}</small> */}
          {/* {userGlobal.id_role == 3 ? null : (
            
          )} */}
          <p class="card-text">{props.productName}</p>

          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              {/* if condition  */}

              <button type="button" class="btn btn-sm btn-outline-secondary">
                Add to cart
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
