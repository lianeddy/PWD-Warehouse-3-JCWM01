import Swal from "sweetalert2";

import CartService from "../../jsx/pages/cart/cart.services";

export const getCart = function (id_user) {
  return async (dispatch) => {
    try {
      const { data } = await CartService.getCart(id_user);
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
