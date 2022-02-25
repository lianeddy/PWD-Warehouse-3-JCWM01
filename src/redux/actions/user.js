import Axios from "axios";
import Swal from "sweetalert2";

import authHeader from "../../utility/authHeader";
import { URL_API } from "../../helper";

export const authLogin = (data) => {
  console.log(`Data masuk Action dari component: ${data}`);
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const keepLoginAction = (userLocalStorage) => {
  return async (dispatch) => {
    try {
      const getDataLogin = await Axios.post(
        `${URL_API}/users/keep-login`,
        {},
        {
          headers: authHeader(),
        }
      );

      const data = getDataLogin.data.data;
      if (data.id_role === 1) {
        dispatch({
          type: "ADMIN_CHECK_LOGIN",
          payload: data,
        });
        return;
      } else if (data.id_role === 2) {
        dispatch({
          type: "ADMIN_CHECK_LOGIN",
          payload: data,
        });
        return;
      } else {
        dispatch({
          type: "USER_CHECK_LOGIN",
          payload: data,
        });
      }
    } catch (err) {
      const msgErr = err.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong! ${msgErr}`,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("dataToken");
      localStorage.removeItem("dataUser");
      dispatch({
        type: "USER_LOGOUT",
      });
      dispatch({
        type: "ADMIN_LOGOUT",
      });
      window.location.assign("/");
    } catch (err) {
      alert(err);
    }
  };
};
