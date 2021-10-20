import Axios from "axios";
import { URL_API } from "../../helper";
import { SwalFire } from "../../utility/SwalFire";

const getDataPermintaanProdukHandler = (
  pages,
  from_warehouse = null,
  to_warehouse = null,
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
  if (from_warehouse != null || to_warehouse != null) {
    paramsNow = {
      ...paramsNow,
      from_warehouse,
      to_warehouse,
    };
  }
  Axios.get(`${URL_API}/permintaan-produk`, {
    params: paramsNow,
  }).then((result) => {
    console.log("RESULT REDUX ACTION");
    console.log(result);
    dispatch({
      type: "GET_PERMINTAAN_BARANG",
      payload: {
        permintaanProdukList: result.data.results,
        maxPerPage: result.data.maxPerPage,
        pagesNow: result.data.pagesNow,
        total: result.data.total,
      },
    });
  });
};

const getDataPermintaanProduk = (
  pages,
  from_warehouse = null,
  to_warehouse = null,
  maxpage = 10,
  id_warehouse,
  tgl_mulai,
  tgl_selesai,
  status_warehouse
) => {
  console.log(tgl_mulai);
  console.log(tgl_selesai);
  return (dispatch) => {
    getDataPermintaanProdukHandler(
      pages,
      from_warehouse,
      to_warehouse,
      maxpage,
      id_warehouse,
      dispatch,
      tgl_mulai,
      tgl_selesai,
      status_warehouse
    );
  };
};

const addDataPermintaanProduk = (data) => {
  return (dispatch) => {
    const output = Axios.post(`${URL_API}/permintaan-produk`, data)
      .then((result) => {
        if (result.data.code) {
          SwalFire.fire("Add!", result.data.message, "success");
          getDataPermintaanProdukHandler(
            0,
            data.from_warehouse,
            data.to_warehouse,
            10,
            data.id_warehouse,
            dispatch,
            null,
            null,
            null
          );
          modalIsOpenRaw(dispatch, false);
        }
      })
      .catch((err) => {
        SwalFire.fire("Add!", "Server Error", "danger");
      });
  };
};

const updateDataPermintaanProduk = (id, data) => {
  return (dispatch) => {
    const output = Axios.patch(`${URL_API}/permintaan-produk/${id}`, data)
      .then((result) => {
        if (result.data.code) {
          SwalFire.fire("Updated!", result.data.message, "success");
          getDataPermintaanProdukHandler(
            0,
            null,
            null,
            10,
            data.id_warehouse,
            dispatch,
            null,
            null,
            null
          );
          modalIsOpenRaw(dispatch, false);
        }
      })
      .catch((err) => {
        SwalFire.fire("Add!", "Server Error", "danger");
      });
  };
};

const deleteDataPermintaanProduk = (id, data) => {
  return (dispatch) => {
    const { id_warehouse, from_warehouse, to_warehouse } = data;
    delete data.id_warehouse;
    const output = Axios.delete(`${URL_API}/permintaan-produk/${id}`)
      .then((result) => {
        if (result.data.code) {
          SwalFire.fire("Deleted!", result.data.message, "success");
          getDataPermintaanProdukHandler(
            0,
            from_warehouse,
            to_warehouse,
            10,
            id_warehouse,
            dispatch,
            null,
            null,
            null
          );
        }
      })
      .catch((err) => {
        SwalFire.fire("Add!", "Server Error", "danger");
      });
  };
};

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

const isTerimaPermintaanBarang = (id, data, status) => {
  console.table(data);
  const { id_warehouse, from_warehouse, to_warehouse } = data;
  delete data.id_warehouse;
  return (dispatch) => {
    Axios.patch(`${URL_API}/permintaan-produk/${id}`, {
      ...data,
      is_accept: status,
      id_status: status ? 2 : 1,
    })
      .then((result) => {
        SwalFire.fire("Updated!", result.data.message, "success");
        getDataPermintaanProdukHandler(
          0,
          from_warehouse,
          to_warehouse,
          10,
          id_warehouse,
          dispatch,
          null,
          null,
          null
        );
      })
      .catch((err) => {
        SwalFire.fire("Gagal Updated!", "Server Error", "danger");
      });
  };
};

export {
  getDataPermintaanProduk,
  addDataPermintaanProduk,
  updateDataPermintaanProduk,
  deleteDataPermintaanProduk,
  modalIsOpen,
  isTerimaPermintaanBarang,
};
