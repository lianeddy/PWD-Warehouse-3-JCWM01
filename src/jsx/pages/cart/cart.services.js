import Axios from "axios";
import authHeader from "../../../utility/authHeader";
import { URL_API } from "../../../helper";

const url = `${URL_API}/cart`;

class CartService {
  deleteCart(id) {
    return Axios.delete(`${url}/delete-item-in-cart/${id}`, {
      headers: authHeader(),
    });
  }
  updateQTY(id, qty) {
    return Axios.patch(
      `${url}/edit-Qtyitem-in-cart/${id}?quantity=${qty}`,
      {},
      {
        headers: authHeader(),
      }
    );
  }
  checkStock(id) {
    return Axios.get(`${URL_API}/products/quick-check-stocks?id=${id}`, {
      headers: authHeader(),
    });
  }
  getCart(id) {
    return Axios.get(`${url}/get-my-cart?id_user=${id}`, {
      headers: authHeader(),
    });
  }
  addToCart(id_product, qty, id) {
    return Axios.post(
      `${url}/add-from-product-list/${id_product}?quantity=${qty}&id_user=${id}`,
      {},
      {
        headers: authHeader(),
      }
    );
  }
  add1Cart(id_product, qty, id) {
    return Axios.post(
      `${url}/add-from-product-list/${id_product}?quantity=${qty}&id_user=${id}`,
      {},
      {
        headers: authHeader(),
      }
    );
  }
}

export default new CartService();
