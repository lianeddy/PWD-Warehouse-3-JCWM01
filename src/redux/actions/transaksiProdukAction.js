import Axios from "axios";
import { URL_API } from "../../helper";
import { SwalFire } from "../../utility/SwalFire";

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

// const isTerimaPermintaanBarang = (id, data, status) => {
//   console.table(data);
//   const { id_warehouse, id_metode_pembayaran, to_warehouse } = data;
//   delete data.id_warehouse;
//   return (dispatch) => {
//     Axios.patch(`${URL_API}/history-transaksi-produk/${id}`, {
//       ...data,
//       is_accept: status,
//       id_status: status ? 2 : 1,
//     })
//       .then((result) => {
//         SwalFire.fire("Updated!", result.data.message, "success");
//         getDataTransaksiProdukHandler(
//           0,
//           id_metode_pembayaran,
//           to_warehouse,
//           10,
//           id_warehouse,
//           dispatch,
//           null,
//           null,
//           null
//         );
//       })
//       .catch((err) => {
//         SwalFire.fire("Gagal Updated!", "Server Error", "danger");
//       });
//   };
// };

export {
  getDataTransaksiProduk,
  // addDataTransaksiProduk,
  // updateDataTransaksiProduk,
  // deleteDataTransaksiProduk,
  modalIsOpen,
  // isTerimaPermintaanBarang,
};
