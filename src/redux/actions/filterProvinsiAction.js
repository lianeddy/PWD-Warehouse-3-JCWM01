import Axios from "axios";
import { URL_API } from "../../helper";

export const getDataFilterProvinsi = (data) => {
  return (dispatch) => {
    Axios.get(`${URL_API}/utility/filter-provinsi`, {
      params: data,
    }).then((result) => {
      const options = result.data.results.map((i) => ({
        nm_propinsi: `Provinsi ${i.nm_propinsi}`,
        id_propinsi: i.id_propinsi,
      }));
      dispatch({
        type: "GET_FILTER_PROVINSI",
        payload: {
          provinsiList: result.data.results,
          isLoading: false,
          optionsFilter: options,
        },
      });
    });
  };
};

export const setLoadingFilterProvinsi = (status = false) => {
  return (dispatch) => {
    dispatch({
      type: "GET_FILTER_PROVINSI",
      payload: {
        isLoading: status,
      },
    });
  };
};

export const setTmpSelectedProvinsi = (dataRaw, dataSelected) => {
  return (dispatch) => {
    dispatch({
      type: "GET_FILTER_PROVINSI",
      payload: {
        optionsFilter: dataRaw,
        selected: dataSelected,
      },
    });
  };
};

export const setSelectedProvinsi = (dataSelected) => {
  return (dispatch) => {
    dispatch({
      type: "GET_FILTER_PROVINSI",
      payload: {
        selected: dataSelected,
      },
    });
  };
};
