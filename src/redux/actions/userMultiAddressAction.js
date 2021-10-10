import Axios from "axios";
import { URL_API } from "../../helper";

export const getDataMultiAddress = (
  pages,
  id_propinsi = null,
  id_kabkota = null,
  maxpage = 10
) => {
  return (dispatch) => {
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
        },
      });
    });
  };
};

export const addDataMultiAddress = (data) => {
  return (dispatch) => {
    const output = Axios.post(`${URL_API}/users/multi-address`, data).then(
      (result) => {
        getDataMultiAddress(0, null, null, 10);
      }
    );
  };
};

export const updateDataMultiAddress = (id) => {
  return (dispatch) => {
    const output = Axios.patch(`${URL_API}/users/multi-address/${id}`).then(
      (result) => {
        getDataMultiAddress(0, null, null, 10);
      }
    );
  };
};

export const deleteDataMultiAddress = (id) => {
  return (dispatch) => {
    const output = Axios.delete(`${URL_API}/users/multi-address/${id}`).then(
      (result) => {
        getDataMultiAddress(0, null, null, 10);
      }
    );
  };
};

export const modalIsOpen = (status) => {
  return (dispatch) => {
    dispatch({
      type: "MODAL_IS_OPEN",
      payload: { modalIsOpen: status },
    });
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
// export default { getData, addData, updateData, deleteData };
