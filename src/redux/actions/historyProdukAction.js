import Axios from "axios";
import { URL_API } from "../../helper";
import { SwalFire } from "../../utility/SwalFire";

const getDataHistoryProdukHandler = (
  pages,
  search_warehouse = null,
  tipe_transaksi = null,
  maxpage = 10,
  id_warehouse,
  dispatch,
  tgl_mulai = null,
  tgl_selesai = null,
  status_warehouse = null
) => {
  let paramsNow = {
    pages,
    maxpage,
    id_warehouse,
    tgl_mulai,
    tgl_selesai,
    status_warehouse,
  };
  if (search_warehouse != null || tipe_transaksi != null) {
    paramsNow = {
      ...paramsNow,
      id_warehouse: search_warehouse,
      tipe_transaksi,
    };
  }
  Axios.get(`${URL_API}/history-persediaan-produk`, {
    params: paramsNow,
  }).then((result) => {
    console.log("RESULT REDUX ACTION");
    console.log(result);
    dispatch({
      type: "GET_HISTORY_PRODUK",
      payload: {
        list: result.data.results,
        maxPerPage: result.data.maxPerPage,
        pagesNow: result.data.pagesNow,
        total: result.data.total,
      },
    });
  });
};

const getDataHistoryProduk = (
  pages,
  search_warehouse = null,
  tipe_transaksi = null,
  maxpage = 10,
  id_warehouse,
  tgl_mulai,
  tgl_selesai,
  status_warehouse
) => {
  return (dispatch) => {
    getDataHistoryProdukHandler(
      pages,
      search_warehouse,
      tipe_transaksi,
      maxpage,
      id_warehouse,
      dispatch,
      tgl_mulai,
      tgl_selesai,
      status_warehouse
    );
  };
};

// const addDataHistoryProduk = (data) => {
//   return (dispatch) => {
//     const output = Axios.post(`${URL_API}/history-persediaan-produk`, data)
//       .then((result) => {
//         if (result.data.code) {
//           SwalFire.fire("Add!", result.data.message, "success");
//           getDataHistoryProdukHandler(
//             0,
//             data.search_warehouse,
//             data.search_warehouse,
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

// const updateDataHistoryProduk = (id, data) => {
//   return (dispatch) => {
//     const output = Axios.patch(`${URL_API}/history-persediaan-produk/${id}`, data)
//       .then((result) => {
//         if (result.data.code) {
//           SwalFire.fire("Updated!", result.data.message, "success");
//           getDataHistoryProdukHandler(
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

// const deleteDataHistoryProduk = (id, data) => {
//   return (dispatch) => {
//     const { id_warehouse, search_warehouse, to_warehouse } = data;
//     delete data.id_warehouse;
//     const output = Axios.delete(`${URL_API}/history-persediaan-produk/${id}`)
//       .then((result) => {
//         if (result.data.code) {
//           SwalFire.fire("Deleted!", result.data.message, "success");
//           getDataHistoryProdukHandler(
//             0,
//             search_warehouse,
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
    type: "MODAL_IS_OPEN_PERMINTAAN_BARANG",
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
//   const { id_warehouse, search_warehouse, to_warehouse } = data;
//   delete data.id_warehouse;
//   return (dispatch) => {
//     Axios.patch(`${URL_API}/history-persediaan-produk/${id}`, {
//       ...data,
//       is_accept: status,
//       id_status: status ? 2 : 1,
//     })
//       .then((result) => {
//         SwalFire.fire("Updated!", result.data.message, "success");
//         getDataHistoryProdukHandler(
//           0,
//           search_warehouse,
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
  getDataHistoryProduk,
  // addDataHistoryProduk,
  // updateDataHistoryProduk,
  // deleteDataHistoryProduk,
  modalIsOpen,
  // isTerimaPermintaanBarang,
};
