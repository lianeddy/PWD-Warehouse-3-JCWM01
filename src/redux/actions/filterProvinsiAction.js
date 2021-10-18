import Axios from "axios";
import { URL_API } from "../../helper";

export const getDataFilterProvinsi = () => {
  return (dispatch) => {
    Axios.get(`${URL_API}`).then((result) => {
      dispatch({
        type: "GET_FILTER_PROVINSI",
        payload: {
          multiAddressList: result.data.results,
          provinsiList: result.data,
        },
      });
    });
  };
};
