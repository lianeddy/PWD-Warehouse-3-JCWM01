import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";
import { connect } from "react-redux";
import { authLogin } from "../../actions";
import "./login.css";
import { Redirect } from "react-router";

class Register extends React.Component {
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
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
        </form>
      </div>
    );
  }
}

export default connect(null, { authLogin })(Register);
