import Axios from "axios";
import { URL_API } from "../../helper";
import { SwalFire } from "../../utility/SwalFire";

const getDataMultiAddressHandler = (
  pages,
  id_propinsi = null,
  id_kabkota = null,
  maxpage = 10,
  id_user,
  dispatch
) => {
  console.log("RUN GET DATA MULTI ADDRESS");
  let paramsNow = { pages, maxpage };
  if (id_propinsi != null || id_kabkota != null) {
    paramsNow = {
      ...paramsNow,
      id_propinsi,
      id_kabkota,
    };
  }
  Axios.get(`${URL_API}/users/multi-address`, {
    params: paramsNow,
  }).then((result) => {
    console.log("RESULT REDUX ACTION");
    console.log(result);
    dispatch({
      type: "GET_MULTI_ADDRESS",
      payload: {
        multiAddressList: result.data.results,
        maxPerPage: result.data.maxPerPage,
        pagesNow: result.data.pagesNow,
        total: result.data.total,
      },
    });
  });
};

const getDataMultiAddress = (
  pages,
  id_propinsi = null,
  id_kabkota = null,
  maxpage = 10,
  id_user
) => {
  return (dispatch) => {
    getDataMultiAddressHandler(
      pages,
      id_propinsi,
      id_kabkota,
      maxpage,
      id_user,
      dispatch
    );
  };
};

const addDataMultiAddress = (data) => {
  return (dispatch) => {
    const output = Axios.post(`${URL_API}/users/multi-address`, data)
      .then((result) => {
        if (result.data.code) {
          SwalFire.fire("Add!", result.data.message, "success");
          getDataMultiAddressHandler(0, null, null, 10, data.id_user, dispatch);
          modalIsOpenRaw(dispatch, false);
        }
      })
      .catch((err) => {
        SwalFire.fire("Add!", "Server Error", "danger");
      });
  };
};

const updateDataMultiAddress = (id, data) => {
  return (dispatch) => {
    const output = Axios.patch(`${URL_API}/users/multi-address/${id}`, data)
      .then((result) => {
        if (result.data.code) {
          SwalFire.fire("Updated!", result.data.message, "success");
          getDataMultiAddressHandler(0, null, null, 10, data.id_user, dispatch);
          modalIsOpenRaw(dispatch, false);
        }
      })
      .catch((err) => {
        SwalFire.fire("Add!", "Server Error", "danger");
      });
  };
};

const deleteDataMultiAddress = (id, data) => {
  return (dispatch) => {
    const output = Axios.delete(`${URL_API}/users/multi-address/${id}`)
      .then((result) => {
        if (result.data.code) {
          SwalFire.fire("Deleted!", result.data.message, "success");
          getDataMultiAddressHandler(0, null, null, 10, data.id_user, dispatch);
        }
      })
      .catch((err) => {
        SwalFire.fire("Add!", "Server Error", "danger");
      });
  };
};

const modalIsOpenRaw = (dispatch2, status) => {
  dispatch2({
    type: "MODAL_IS_OPEN",
    payload: { modalIsOpen: status },
  });
};

const modalIsOpen = (status) => {
  return (dispatch) => {
    modalIsOpenRaw(dispatch, status);
  };
};

const setDefaultMultiAddress = (id, data) => {
  console.table(data);
  return (dispatch) => {
    Axios.patch(`${URL_API}/users/multi-address/many-data/${data.id_user}`, {
      is_default: 0,
    })
      .then((result) => {
        Axios.patch(`${URL_API}/users/multi-address/${id}`, data)
          .then((result) => {
            console.log("NNNNNsa");
            SwalFire.fire("Updated!", result.data.message, "success");
            getDataMultiAddressHandler(
              0,
              null,
              null,
              10,
              data.id_user,
              dispatch
            );
          })
          .catch((err) => {
            SwalFire.fire("Gagal Updated!", "Server Error", "danger");
          });
      })
      .catch((err) => {
        SwalFire.fire("Gagal Updated!", "Server Error", "danger");
      });
  };
};

export {
  getDataMultiAddress,
  addDataMultiAddress,
  updateDataMultiAddress,
  deleteDataMultiAddress,
  modalIsOpen,
  setDefaultMultiAddress,
};
