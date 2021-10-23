import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Card.css";
import { useSelector } from "react-redux";

const CardAdmin = (props) => {
  const userGlobal = useSelector((state) => state.authReducer);

  return (
    <div class="col">
      <div class="card shadow-sm">
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

        <div class="card-body">
          <small class="text-muted">{props.total_stok}</small>

          <p class="card-text">{props.productName}</p>

          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              {/* if condition  */}

              <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary">
                Delete
              </button>
            </div>

            <small class="text-muted">${props.price}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAdmin;
