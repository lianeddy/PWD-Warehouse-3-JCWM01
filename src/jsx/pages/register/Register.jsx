import React from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { URL_API } from "../../../helper";
import { connect } from "react-redux";
import "./register.css";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

const eye = <FontAwesomeIcon icon={faEye} />;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      alertShow: "none",
      disableBtn: false,
      typePass: "password",
      typeConfirmPass: "password",
    };
  }

  onBtnRegister = () => {
    let username = this.inputUsername.value;
    let email = this.inputEmail.value;
    let password = this.inputPassword.value;
    let confirmPass = this.inputConfirmPassword.value;

    this.setState({ disableBtn: true });

    if (username === "" || email === "" || password === "") {
      Swal.fire("Fill in all the form");
    } else if (password !== confirmPass) {
      Swal.fire("password and confirm password field must be same");
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

  togglePassHandler = () => {
    this.state.typePass === "password"
      ? this.setState({ typePass: "text" })
      : this.setState({ typePass: "password" });
  };

  toggleConfirmPassHandler = () => {
    this.state.typeConfirmPass === "password"
      ? this.setState({ typeConfirmPass: "text" })
      : this.setState({ typeConfirmPass: "password" });
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

          <div className="form-group mb-2">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              ref={(e) => (this.inputUsername = e)}
            />
          </div>

          <div className="form-group mb-2">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              ref={(e) => (this.inputEmail = e)}
            />
          </div>

          <div className="form-group mb-2">
            <label>Password</label>
            <input
              type={this.state.typePass}
              className="form-control "
              placeholder="Enter password"
              ref={(e) => (this.inputPassword = e)}
            />
            <span toggle="#password-field" class="field-icon toggle-password">
              <i onClick={this.togglePassHandler}>{eye}</i>
            </span>
          </div>

          <div className="form-group mb-2">
            <label>Confirm Password</label>
            <input
              type={this.state.typeConfirmPass}
              className="form-control"
              placeholder="Enter confirm password"
              ref={(e) => (this.inputConfirmPassword = e)}
            />
            <span toggle="#password-field" class="field-icon toggle-password">
              <i onClick={this.toggleConfirmPassHandler}>{eye}</i>
            </span>
          </div>

          {/* <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Enter confirm password"
              ref={(e) => (this.inputPassword = e)}
            />
            <span toggle="#password-field" class="field-icon toggle-password">
              <i onClick={this.togglePassHandler}>{eye}</i>
            </span>
          </div> */}

          <button
            type="submit"
            className="btn btn-primary btn-block btn-register mt-3"
            onClick={this.onBtnRegister}
            disabled={this.state.disableBtn}
          >
            Sign Up
          </button>
          <p className="forgot-password text-right mt-2">
            Already registered <a href="/login">sign in?</a>
          </p>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Register);
