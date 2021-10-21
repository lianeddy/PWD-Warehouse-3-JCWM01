import Axios from "axios";
import { URL_API } from "../../helper";

export const authLogin = (data) => {
  console.log(`Data masuk Action dari component: ${data}`);
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const keepLoginAction = () => {
  return async (dispatch) => {
    dispatch("API_USER_START");
    try {
      const token = localStorage.getItem("dataToken");
      const headers = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await Axios.post(`${URL_API}/keep-login`, {}, headers);
      const { id_user, id_warehouse, id_role, username, email, is_valid } =
        response.data;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { id_user, id_warehouse, id_role, username, email, is_valid },
      });
      dispatch({
        type: "API_USER_START",
      });
    } catch (err) {
      dispatch({
        type: "API_USER_FAILED",
        payload: err.message,
      });
    }
  };
};
