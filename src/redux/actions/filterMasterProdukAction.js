import Axios from "axios";
import { URL_API } from "../../helper";

export const getDataFilterMasterProduk = (data) => {
  return (dispatch) => {
    Axios.get(`${URL_API}/utility/filter-masterproduk`, {
      params: data,
    }).then((result) => {
      const options = result.data.results.map((el) => {
        let { nm_master_produk, id_master_produk, data_history_produk } = el;
        data_history_produk = data_history_produk.sort(
          (a, b) =>
            (a.id_history_persediaan_produk < b.id_history_persediaan_produk &&
              1) ||
            -1
        );
        return {
          nm_master_produk,
          id_master_produk,
          jml_produk: data_history_produk[0].sisa,
        };
      });
      dispatch({
        type: "GET_FILTER_MASTER_PRODUK",
        payload: {
          isLoading: false,
          optionsFilter: options,
        },
      });
    });
  };
};

export const setLoadingFilterMasterProduk = (status = false) => {
  return (dispatch) => {
    dispatch({
      type: "GET_FILTER_MASTER_PRODUK",
      payload: {
        isLoading: status,
      },
    });
  };
};

export const setTmpSelectedMasterProduk = (dataRaw, dataSelected) => {
  return (dispatch) => {
    dispatch({
      type: "GET_FILTER_MASTER_PRODUK",
      payload: {
        optionsFilter: dataRaw,
        selected: dataSelected,
      },
    });
  };
};

export const setSelectedMasterProduk = (dataSelected) => {
  return (dispatch) => {
    dispatch({
      type: "GET_FILTER_MASTER_PRODUK",
      payload: {
        selected: dataSelected,
      },
    });
  };
};
