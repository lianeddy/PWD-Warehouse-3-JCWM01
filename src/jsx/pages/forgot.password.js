import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";
import { connect } from "react-redux";
import "./auth.css";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      alertShow: "none",
      disableBtn: false,
    };
  }

  submitBtn = () => {
    let email = this.email.value;
    this.setState({ disableBtn: true });

    if (email == "") {
      alert("Form can't be empty");
    } else {
      Axios.post(`${URL_API}/users/forgot-password/`, {
        email,
      })
        .then((res) => {
          console.log(res.data.message);
          Swal.fire("Reset Password success, please check your email");
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
            Change Password success
          </div>

          <h3>Reset Password</h3>

          <div className="form-group">
            <label>Your Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              ref={(e) => (this.email = e)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-auth"
            onClick={this.submitBtn}
            disabled={this.state.disableBtn}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ResetPassword);
