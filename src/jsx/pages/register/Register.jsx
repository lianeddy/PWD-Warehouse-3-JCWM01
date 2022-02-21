import React from "react";
import Axios from "axios";
import { URL_API } from "../../../helper";
import { connect } from "react-redux";
import "./register.css";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      alertShow: "none",
      disableBtn: false,
    };
  }

  onBtnRegister = () => {
    let username = this.inputUsername.value;
    let email = this.inputEmail.value;
    let password = this.inputPassword.value;

    this.setState({ disableBtn: true });

    if (username === "" || email === "" || password === "") {
      alert("Fill in all the form");
    } else {
      Axios.post(`${URL_API}/users/register`, {
        username,
        email,
        password,
      })
        .then((res) => {
          console.log(res.data.message);
          Swal.fire("Register success, check your email for verification");
          this.setState({
            alertShow: "block",
            redirect: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="intro">
        <div className="form-inner">
          <div
            className="alert alert-danger"
            style={{ display: this.state.alertShow }}
            role="alert"
          >
            Register success
          </div>

          <h3>Sign Up</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              ref={(e) => (this.inputUsername = e)}
            />
          </div>

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

          <button
            type="submit"
            className="btn btn-primary btn-block btn-register"
            onClick={this.onBtnRegister}
            disabled={this.state.disableBtn}
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Register);
