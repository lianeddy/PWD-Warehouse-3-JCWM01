import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "./Card.css";
import { useSelector } from "react-redux";
import { URL_API } from "../../helper";

const Card = (props) => {
  const userGlobal = useSelector((state) => state.authReducer);

  const [stok, setStok] = useState(0);

  const checkStokProduct = () => {
    Axios.get(
      `${URL_API}/products/check-stok?product=${props.id_master_produk}`
    )
      .then((res) => {
        setStok(res.data.dataStok);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const AddToCart = () => {
    if (userGlobal.id_user && stok > 0) {
      Axios.post(`${URL_API}/`, {
        id_user: userGlobal.id_user,
        id_master_produk: props.id_master_produk,
        quantity: 1,
      });
    }
  };

  useEffect(() => {
    checkStokProduct();
  }, []);

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
