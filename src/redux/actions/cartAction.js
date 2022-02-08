import Axios from "axios";
import Swal from "sweetalert2";

import { URL_API } from "../../helper";

export const getCart = function (id_user) {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/cart/get-my-cart?id_user=${id_user}`
      );
      const cartItem = data.data;
      dispatch({ type: "GET_CART", payload: cartItem });
    } catch (err) {
      const msgErr = err.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong! ${msgErr}`,
      });
    }
  };
};
