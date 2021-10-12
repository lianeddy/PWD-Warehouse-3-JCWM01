import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";
import { connect } from "react-redux";
import "./auth.css";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      alertShow: "none",
      // disableBtn: false,
    };
  }

  saveBtn = () => {
    let currentPassword = this.currentPassword.value;
    let newPassword = this.newPassword.value;
    let confirmPassword = this.confirmPassword.value;

    // this.setState({ disableBtn: true });
    if ((currentPassword == "", newPassword == "", confirmPassword == "")) {
      alert("form can't be empty'");
    } else if (newPassword !== confirmPassword) {
      alert("New password did not match");
    } else {
      Axios.patch(`${URL_API}/users/change-password/`, {
        currentPassword,
        confirmPassword,
      })
        .then((res) => {
          console.log(res.data.message);
          Swal.fire("Password change success");
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

          <h3>Change Password</h3>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Current Password"
              ref={(e) => (this.currentPassword = e)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              ref={(e) => (this.newPassword = e)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              ref={(e) => (this.confirmPassword = e)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-auth"
            onClick={this.saveBtn}
            // disabled={this.state.disableBtn}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ChangePassword);
