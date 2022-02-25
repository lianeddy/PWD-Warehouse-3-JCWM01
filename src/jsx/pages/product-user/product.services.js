import Axios from "axios";
import authHeader from "../../../utility/authHeader";
import { URL_API } from "../../../helper";

const url = `${URL_API}/products`;

class ProductService {
  checkStock(id) {
    return Axios.get(`${url}/quick-check-stocks?id=${id}`, {
      headers: authHeader(),
    });
  }
}

export default new ProductService();
