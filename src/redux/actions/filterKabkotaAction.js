import Axios from "axios";
import { URL_API } from "../../helper";

export const getDataFilterKabkota = (data) => {
  return (dispatch) => {
    Axios.get(`${URL_API}/utility/filter-kabkota`, {
      params: data,
    }).then((result) => {
      const options = result.data.results.map((i) => ({
        nm_kabkota: `${i.type} ${i.nm_kabkota}`,
        id_kabkota: i.id_kabkota,
      }));
      dispatch({
        type: "GET_FILTER_KABKOTA",
        payload: {
          kabkotaList: result.data.results,
          isLoading: false,
          optionsFilter: options,
        },
      });
    });
  };
};

export const setLoadingFilterKabkota = (status = false) => {
  return (dispatch) => {
    dispatch({
      type: "GET_FILTER_KABKOTA",
      payload: {
        isLoading: status,
      },
    });
  };
};
