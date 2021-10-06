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

  onBtnRegister = () => {
    let username = this.inputUsername.value;
    let email = this.inputEmail.value;
    let password = this.inputPassword.value;

    if (username == "" || email == "" || password == "") {
      alert("Fill in all the form");
    } else {
      Axios.post(`${URL_API}/users/register`, {
        username,
        email,
        password,
      })
        .then((res) => console.log(res.data.message))
        .catch((err) => console.log(err));
    }
  };

  render() {
    // if (this.state.redirect) {
    //   // this.setState({})
    //   return <Redirect to="/" />;
    // }

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
            className="btn btn-primary btn-block"
            onClick={this.onBtnRegister}
          >
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
