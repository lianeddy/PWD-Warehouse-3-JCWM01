import Axios from "axios";
import authHeader from "../../../utility/authHeader";
import { URL_API } from "../../../helper";

const url = `${URL_API}/products`;

class ProductAdminService {
  getProducts(curPage, sort) {
    return Axios.get(`${url}/product-admin?page=${curPage}&sortBy=${sort}`, {
      headers: authHeader(),
    });
  }
}

export default new ProductAdminService();
