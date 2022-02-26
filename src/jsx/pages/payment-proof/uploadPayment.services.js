import Axios from "axios";
import { URL_API } from "../../../helper";
import authHeader from "../../../utility/authHeader";

const url = `${URL_API}/transactions`;

class PaymentProofService {
  upload(id1, id2, formData) {
    console.log(id2);
    return Axios.post(
      `${url}/paymentProof?id_user=${id1}&id_transaksi_master_produk=${id2}`,
      formData,
      {
        headers: authHeader(),
      }
    );
  }
}

export default new PaymentProofService();
