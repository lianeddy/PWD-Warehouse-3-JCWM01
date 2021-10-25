import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";
import { connect } from "react-redux";
import { authLogin } from "../../redux/actions/user";
import "./auth.css";
import { Redirect } from "react-router";
import Swal from "sweetalert2";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertShow: "none",
      redirect: false,
    };
  }

  onBtnLogin = (event) => {
    this.setState({ disableBtn: true });
    Axios.post(`${URL_API}/users/login`, {
      email: this.inputEmail.value,
      password: this.inputPassword.value,
    })
      .then((result) => {
        localStorage.setItem("dataToken", result.data.token);
        localStorage.setItem("dataUser", JSON.stringify(result.data.dataLogin));
        //action
        this.props.authLogin(result.data.dataLogin);
        this.setState({ redirect: true });
        const userLocalStorage = localStorage.getItem("dataToken");
        // const userData = JSON.parse(userLocalStorage);
        console.log(userLocalStorage);
        console.log("Login Success");
        this.inputUsername.value = "";
        this.inputPassword.value = "";
        // window.location.assign("/Products");
      })
      .catch((err) => {
        // event.preventDefault();
        console.log(err.message);
        this.setState({ alertShow: "block" });
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/products" />;
    }

    return (
      <div className="intro">
        <div className="form-inner">
          <div
            className="alert alert-danger"
            style={{ display: this.state.alertShow }}
            role="alert"
          >
            Account not found
          </div>

          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              ref={(e) => (this.inputEmail = e)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type={this.passwordShown ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              ref={(e) => (this.inputPassword = e)}
            />
            <p>
              <a href="/forgot-password">Forget Password?</a>
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block btn-auth"
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
