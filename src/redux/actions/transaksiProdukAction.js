import Axios from "axios";
import { URL_API } from "../../helper";
import { SwalFire } from "../../utility/SwalFire";
import Swal from "sweetalert2";
import productServices from "../../jsx/pages/product-user/product.services";
import checkoutServices from "../../jsx/pages/checkout/checkout.services";

const getDataTransaksiProdukHandler = (
  pages,
  id_metode_pembayaran = null,
  id_metode_pengiriman = null,
  maxpage = 10,
  id_warehouse,
  dispatch,
  tgl_mulai = null,
  tgl_selesai = null,
  is_verify = null,
  is_bayar = null
) => {
  let paramsNow = {
    pages,
    maxpage,
    id_warehouse,
    tgl_mulai,
    tgl_selesai,
    is_verify,
    is_bayar,
    id_metode_pembayaran,
    id_metode_pengiriman,
  };
  Axios.get(`${URL_API}/history-transaksi-produk`, {
    params: paramsNow,
  }).then((result) => {
    console.log("RESULT REDUX ACTION");
    console.log(result);
    dispatch({
      type: "GET_TRANSAKSI_PRODUK",
      payload: {
        list: result.data.results,
        maxPerPage: result.data.maxPerPage,
        pagesNow: result.data.pagesNow,
        total: result.data.total,
      },
    });
  });
};

const getDataTransaksiProduk = (
  pages,
  id_metode_pembayaran = null,
  id_metode_pengiriman = null,
  maxpage = 10,
  id_warehouse,
  tgl_mulai,
  tgl_selesai,
  is_verify = null,
  is_bayar = null
) => {
  return (dispatch) => {
    getDataTransaksiProdukHandler(
      pages,
      id_metode_pembayaran,
      id_metode_pengiriman,
      maxpage,
      id_warehouse,
      dispatch,
      tgl_mulai,
      tgl_selesai,
      is_verify,
      is_bayar
    );
  };
};

// const addDataTransaksiProduk = (data) => {
//   return (dispatch) => {
//     const output = Axios.post(`${URL_API}/history-transaksi-produk`, data)
//       .then((result) => {
//         if (result.data.code) {
//           SwalFire.fire("Add!", result.data.message, "success");
//           getDataTransaksiProdukHandler(
//             0,
//             data.id_metode_pembayaran,
//             data.id_metode_pembayaran,
//             10,
//             data.id_warehouse,
//             dispatch,
//             null,
//             null,
//             null
//           );
//           modalIsOpenRaw(dispatch, false);
//         }
//       })
//       .catch((err) => {
//         SwalFire.fire("Add!", "Server Error", "danger");
//       });
//   };
// };

// const updateDataTransaksiProduk = (id, data) => {
//   return (dispatch) => {
//     const output = Axios.patch(`${URL_API}/history-transaksi-produk/${id}`, data)
//       .then((result) => {
//         if (result.data.code) {
//           SwalFire.fire("Updated!", result.data.message, "success");
//           getDataTransaksiProdukHandler(
//             0,
//             null,
//             null,
//             10,
//             data.id_warehouse,
//             dispatch,
//             null,
//             null,
//             null
//           );
//           modalIsOpenRaw(dispatch, false);
//         }
//       })
//       .catch((err) => {
//         SwalFire.fire("Add!", "Server Error", "danger");
//       });
//   };
// };

// const deleteDataTransaksiProduk = (id, data) => {
//   return (dispatch) => {
//     const { id_warehouse, id_metode_pembayaran, to_warehouse } = data;
//     delete data.id_warehouse;
//     const output = Axios.delete(`${URL_API}/history-transaksi-produk/${id}`)
//       .then((result) => {
//         if (result.data.code) {
//           SwalFire.fire("Deleted!", result.data.message, "success");
//           getDataTransaksiProdukHandler(
//             0,
//             id_metode_pembayaran,
//             to_warehouse,
//             10,
//             id_warehouse,
//             dispatch,
//             null,
//             null,
//             null
//           );
//         }
//       })
//       .catch((err) => {
//         SwalFire.fire("Add!", "Server Error", "danger");
//       });
//   };
// };

const modalIsOpenRaw = (dispatch2, status) => {
  dispatch2({
    type: "MODAL_IS_OPEN_TRANSAKSI_PRODUK",
    payload: { modalIsOpen: status },
  });
};

const modalIsOpen = (status) => {
  return (dispatch) => {
    modalIsOpenRaw(dispatch, status);
  };
};

const isTerimaPesanan = (id, propsHistory, data = null) => {
  return (dispatch) => {
    let dataOut = {
      is_tolak: 1,
      is_verify: 1,
      is_terima_pesanan: true,
    };
    if (data != null) {
      const { id_user, id_warehouse } = data;
      dataOut = {
        ...dataOut,
        id_user,
        id_warehouse,
      };
    }
    Axios.patch(`${URL_API}/history-transaksi-produk/${id}`, dataOut)
      .then((result) => {
        SwalFire.fire("Pesanan Diterima!", result.data.message, "success");
        propsHistory.goBack();
      })
      .catch((err) => {
        console.log(err);
        SwalFire.fire("Gagal Updated!", "Server Error", "error");
      });
  };
};

const isTolakPesanan = (id, propsHistory) => {
  return (dispatch) => {
    Axios.patch(`${URL_API}/history-transaksi-produk/${id}`, {
      is_tolak: 2,
      is_verify: 2,
    })
      .then((result) => {
        SwalFire.fire("Pesanan Diterima!", result.data.message, "success");
        propsHistory.goBack();
      })
      .catch((err) => {
        SwalFire.fire("Gagal Updated!", "Server Error", "error");
      });
  };
};

const quickShowStocks = async (id_product, state) => {
  try {
    const { data } = await productServices.checkStock(id_product);
    const stock = ++data.data[0].total_stock;

    return state({ stock });
  } catch (err) {
    const msg = err.response.data.name;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${msg}`,
    });
  }
};

const getShippingService = (id, courier) => {
  return async (dispatch) => {
    try {
      const couriers = await checkoutServices.getShipping(id, courier);
      const courierService = couriers.data.data;

      dispatch({ type: "GET_SHIPPING_COURIER", payload: courierService });
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

const getPaymentMethods = () => {
  return async (dispatch) => {
    try {
      const value = await checkoutServices.getPayment();
      const paymentMethods = value.data.data;

      dispatch({ type: "GET_PAYMENT_METHODS", payload: paymentMethods });
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

const getShippingMethods = () => {
  return async (dispatch) => {
    try {
      const value = await checkoutServices.getShippingMethods();
      const shippingMethods = value.data.data;

      dispatch({ type: "GET_SHIPPING_METHODS", payload: shippingMethods });
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

const dataCheckout = {};

const passOngkirAndIdMetodePengiriman = (
  dataOngkir,
  dataIdMetodePengiriman
) => {
  dataCheckout.ongkos_kirim = dataOngkir;
  dataCheckout.id_metode_pengiriman = dataIdMetodePengiriman;
};

const passIdMetodePembayaran = (dataIdMetodePembayaran) => {
  dataCheckout.id_metode_pembayaran = dataIdMetodePembayaran;
};

const passIdWarehouseOrigin = (dataIdWarehouse) => {
  dataCheckout.id_warehouse = dataIdWarehouse;
};

const passLocation = (dataLocation, dataIdUser) => {
  dataCheckout.alamat = dataLocation;
  dataCheckout.id_user = dataIdUser;
};

const passTotalHarga = (dataTotalHarga) => {
  dataCheckout.total_harga = dataTotalHarga;
};

const passKeterangan = (dataKeterangan) => {
  dataCheckout.keterangan = dataKeterangan;
};

const passAllCheckoutDatas = () => {
  return (dispatch) => {
    return dispatch({
      type: "PASS_ALL_CHECKOUT_DATAS",
      payload: {
        checkoutData: dataCheckout,
      },
    });
  };
};

const getBuyTransactionDatas = (data) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_BUY_TRANSACTIONS_DATAS",
      payload: data,
    });
  };
};

export {
  getDataTransaksiProduk,
  // addDataTransaksiProduk,
  // updateDataTransaksiProduk,
  // deleteDataTransaksiProduk,
  modalIsOpen,
  isTerimaPesanan,
  isTolakPesanan,
  quickShowStocks,
  getShippingService,
  getPaymentMethods,
  getShippingMethods,
  passOngkirAndIdMetodePengiriman,
  passIdMetodePembayaran,
  passIdWarehouseOrigin,
  passLocation,
  passTotalHarga,
  passKeterangan,
  passAllCheckoutDatas,
  getBuyTransactionDatas,
};
