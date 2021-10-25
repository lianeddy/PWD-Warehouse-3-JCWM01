import Axios from "axios";
import { URL_API } from "../../helper";

export const getDataFilterWarehouse = (data, type) => {
  return (dispatch) => {
    Axios.get(`${URL_API}/utility/filter-warehouse`, {
      params: data,
    }).then((result) => {
      const options = result.data.results.map((i) => ({
        nm_warehouse: i.nm_warehouse,
        id_warehouse: i.id_warehouse,
      }));
      if (type == 1) {
        dispatch({
          type: "GET_FILTER_WAREHOUSE",
          payload: {
            isLoadingPenerima: false,
            optionsFilterPenerima: options,
          },
        });
      } else if (type == 2) {
        dispatch({
          type: "GET_FILTER_WAREHOUSE",
          payload: {
            isLoadingPengirim: false,
            optionsFilterPengirim: options,
          },
        });
      } else {
        dispatch({
          type: "GET_FILTER_WAREHOUSE",
          payload: {
            isLoadingPengirim: false,
            isLoadingPenerima: false,
            optionsFilterPenerima: options,
            optionsFilterPengirim: options,
          },
        });
      }
    });
  };
};

export const setLoadingFilterWarehouse = (status = false, type) => {
  return (dispatch) => {
    if (type == 1) {
      dispatch({
        type: "GET_FILTER_WAREHOUSE",
        payload: {
          isLoadingPenerima: status,
        },
      });
    } else {
      dispatch({
        type: "GET_FILTER_WAREHOUSE",
        payload: {
          isLoadingPengirim: status,
        },
      });
    }
  };
};

export const setTmpSelectedWarehouse = (dataRaw, dataSelected) => {
  return (dispatch) => {
    dispatch({
      type: "GET_FILTER_WAREHOUSE",
      payload: {
        optionsFilter: dataRaw,
        selected: dataSelected,
      },
    });
  };
};

export const setSelectedWarehouse = (dataSelected) => {
  return (dispatch) => {
    dispatch({
      type: "GET_FILTER_WAREHOUSE",
      payload: {
        selected: dataSelected,
      },
    });
  };
};
