import React from "react";
import { withRouter } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    return null;
  }
};

const AuthVerify = (props) => {
  props.history.listen(() => {
    const token = JSON.parse(localStorage.getItem("dataToken"));
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  });
  return <div></div>;
};

export default withRouter(AuthVerify);
