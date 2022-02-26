import Axios from "axios";
import { URL_API } from "../../../helper";
import authHeader from "../../../utility/authHeader";

const url = `${URL_API}/transactions`;

class CheckoutService {
  checkout(
    alamat,
    id_metode_pembayaran,
    id_metode_pengiriman,
    id_user,
    id_warehouse,
    keterangan,
    ongkos_kirim,
    total_harga,
    detailTransactions
  ) {
    let URL_CHECKOUT = `${url}/checkout`;
    if (alamat !== undefined) URL_CHECKOUT += `?alamat=${alamat}`;
    if (id_metode_pembayaran !== undefined)
      URL_CHECKOUT += `&id_metode_pembayaran=${id_metode_pembayaran}`;
    if (id_metode_pengiriman !== undefined)
      URL_CHECKOUT += `&id_metode_pengiriman=${id_metode_pengiriman}`;
    if (id_user !== undefined) URL_CHECKOUT += `&id_user=${id_user}`;
    if (id_warehouse !== undefined)
      URL_CHECKOUT += `&id_warehouse=${id_warehouse}`;
    if (keterangan !== undefined) URL_CHECKOUT += `&keterangan=${keterangan}`;
    if (ongkos_kirim !== undefined)
      URL_CHECKOUT += `&ongkos_kirim=${ongkos_kirim}`;
    if (total_harga !== undefined)
      URL_CHECKOUT += `&total_harga=${total_harga}`;

    return Axios.post(`${URL_CHECKOUT}`, detailTransactions, {
      headers: authHeader(),
    });
  }
  getShipping(id, courier) {
    return Axios.get(
      `${url}/min-cost-shipping?id_user=${id}&courier=${courier}`,
      {
        headers: authHeader(),
      }
    );
  }
  getPayment() {
    return Axios.get(`${url}/get-payment-method`, {
      headers: authHeader(),
    });
  }
  getShippingMethods() {
    return Axios.get(`${url}/get-shipping-method`, {
      headers: authHeader(),
    });
  }
}

export default new CheckoutService();
