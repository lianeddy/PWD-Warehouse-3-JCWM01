import Axios from "axios";
import { URL_API } from "../../../helper";
import authHeader from "../../../utility/authHeader";

const url = `${URL_API}/transactions`;

class OrderService {
  getDataOrder(id) {
    return Axios.get(`${url}/see-my-ongoing-transaction/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new OrderService();
