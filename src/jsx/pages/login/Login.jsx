import React from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { URL_API } from "../../../helper";
import { connect } from "react-redux";
import { authLogin } from "../../../redux/actions/user";
import "./login.css";
import { Redirect } from "react-router";

const eye = <FontAwesomeIcon icon={faEye} />;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertShow: "none",
      redirect: false,
      error: "",
      typePass: "password",
    };
  }

  onBtnLogin = async (event) => {
    this.setState({ disableBtn: true });
    try {
      const result = await Axios.post(`${URL_API}/users/login`, {
        email: this.inputEmail.value,
        password: this.inputPassword.value,
      });

      const user = result.data.data;
      const currToken = result.data.data.token;
      localStorage.setItem("dataToken", currToken);

      //action
      this.props.authLogin(user);
      this.setState({ redirect: true });
    } catch (err) {
      const msgErr = err.response.data.name;
      this.setState({ error: msgErr });
      this.setState({ alertShow: "block" });
    }
  };

  togglePassHandler = () => {
    this.state.typePass === "password"
      ? this.setState({ typePass: "text" })
      : this.setState({ typePass: "password" });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="intro">
        <div className="form-inner">
          <div
            className="alert alert-danger"
            style={{ display: this.state.alertShow }}
            role="alert"
          >
            {this.state.error}
          </div>

          <h3>Sign In</h3>

          <div className="form-group mt-2">
            <label>Email address</label>
            <input
              required
              type="email"
              className="form-control"
              placeholder="Enter email"
              ref={(e) => (this.inputEmail = e)}
            />
          </div>

          <div className="form-group mt-2">
            <label>Password</label>
            <input
              required
              type={this.state.typePass}
              className="form-control"
              placeholder="Enter password"
              ref={(e) => (this.inputPassword = e)}
            />
            <span toggle="#password-field" class="field-icon toggle-password">
              <i onClick={this.togglePassHandler}>{eye}</i>
            </span>
          </div>
          <p className="mt-2">
            <a href="/forgot-password">Forget Password?</a>
          </p>

          <button
            type="button"
            className="btn btn-primary btn-block btn-auth "
            onClick={this.onBtnLogin}
          >
            Login
          </button>
          <p className="forgot-password text-right">
            Dont have an <a href="/register"> account?</a>
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  authLogin,
};

export default connect(null, mapDispatchToProps)(Login);
