import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { Link, Redirect } from "react-router-dom";
import "./Card.css";
import { useSelector, useDispatch } from "react-redux";
import { URL_API } from "../../helper";
import cartServices from "../pages/cart/cart.services";

const Card = (props) => {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.authReducer);
  const { id_user } = userGlobal;

  const [stok, setStok] = useState(0);

  const checkStokProduct = async () => {
    // FIXME
    try {
      // dispatch({})
    } catch (err) {}
  };

  const AddToCart = async () => {
    try {
      const id_produk = props.id_master_produk;

      const { data } = await cartServices.add1Cart(id_produk, 1, id_user);

      const msg = data.data;

      Swal.fire({
        position: "center",
        icon: "success",
        title: `${msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      const msg = err.response.data.name;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${msg}`,
      });
    }
  };

  // useEffect(() => {
  //   checkStokProduct();
  // }, []);

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

              <button
                onClick={AddToCart}
                type="button"
                class="btn btn-sm btn-outline-secondary"
              >
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
