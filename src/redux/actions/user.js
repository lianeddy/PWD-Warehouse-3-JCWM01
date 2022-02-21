import Axios from "axios";
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
          headers: {
            authorization: `Bearer ${userLocalStorage}`,
          },
        }
      );
      delete getDataLogin.data.password;
      if (getDataLogin.data.id_role === 1) {
        dispatch({
          type: "ADMIN_CHECK_LOGIN",
          payload: getDataLogin.data,
        });
        return;
      } else if (getDataLogin.data.id_role === 2) {
        dispatch({
          type: "ADMIN_CHECK_LOGIN",
          payload: getDataLogin.data,
        });
        return;
      } else {
        dispatch({
          type: "USER_CHECK_LOGIN",
          payload: getDataLogin.data,
        });
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      console.log("HEre");
      localStorage.removeItem("dataToken");
      localStorage.removeItem("dataUser");
      dispatch({
        type: "USER_LOGOUT",
      });
      dispatch({
        type: "ADMIN_LOGOUT",
      });
      window.location.assign("/products");
    } catch (err) {
      alert(err);
    }
  };
  // localStorage.removeItem("dataToken");
  // localStorage.removeItem("dataUser");
  // window.location.assign("/login");
  // return {
  //   type: "LOGOUT_SUCCESS",
  // };
};
