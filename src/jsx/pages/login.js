import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";
import { connect } from "react-redux";
import { authLogin } from "../../actions";
import "./login.css";
import { Redirect } from "react-router";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertShow: "none",
      redirect: false,
    };
  }

  onBtnLogin = () => {
    Axios.post(`${URL_API}/users/login`, {
      email: this.inputEmail.value,
      password: this.inputPassword.value,
    })
      .then((result) => {
        console.log(result.data.length);
        if ((result.data.length = undefined)) {
          this.setState({ alertShow: "block" });
        } else {
          localStorage.setItem("dataToken", result.data.token);
          //action
          this.props.authLogin(result.data.dataLogin);
          this.setState({ redirect: true });
          console.log("Login Success");
          this.inputUsername.value = "";
          this.inputPassword.value = "";
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.redirect) {
      // this.setState({})
      return <Redirect to="/" />;
    }

    return (
      <div className="form-inner">
        <div
          className="alert alert-danger"
          style={{ display: this.state.alertShow }}
          role="alert"
        >
          Account not found !
        </div>
        <form>
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
              type="password"
              className="form-control"
              placeholder="Enter password"
              ref={(e) => (this.inputPassword = e)}
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={this.onBtnLogin}
          >
            Login
          </button>
          <p className="forgot-password text-right">
            <a href="#">Forgot password?</a>
          </p>
        </form>
      </div>
    );
  }
}

export default connect(null, { authLogin })(Login);
