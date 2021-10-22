import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";
import { connect } from "react-redux";
import "./auth.css";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      alertShow: "none",
      // disableBtn: false,
      // currentPassword: "",
      // newPassword: "",
      // confirmPassword: "",
    };
  }

  // state = {
  //   currentPassword: "",
  //   newPassword: "",
  //   confirmPassword: "",
  // };

  // inputHandler = (event) => {
  //   const value = event.target.value;
  //   const name = event.target.name;

  //   this.setState({ [name]: value });
  // };

  saveBtn = () => {
    let currentPassword = this.currentPassword.value;
    let newPassword = this.newPassword.value;
    let confirmPassword = this.confirmPassword.value;

    // this.setState({ disableBtn: true });
    if ((currentPassword == "", newPassword == "", confirmPassword == "")) {
      alert("form can't be empty");
    } else if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "New password did not match!",
      });
    } else {
      Axios.patch(`${URL_API}/users/change-password/`, {
        currentPassword,
        confirmPassword,
        id_user: this.props.id_user,
      })
        .then((res) => {
          console.log(res.data.message);
          Swal.fire({ text: "Password change success!", icon: "success" });
          this.setState({
            alertShow: "block",
            redirect: true,
          });
        })
        .catch((err) => {
          Swal.fire({ text: "Current Password wrong", icon: "error" });
          console.log("Current Password Wrong");
        });
    }
  };

  render() {
    console.log(this.props.id_user);

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
            <label className="mt-3 my-1">Current Password</label>
            <input
              type="password"
              className="form-control "
              placeholder="Current Password"
              ref={(e) => (this.currentPassword = e)}
            />
          </div>

          <div className="form-group">
            <label className="mt-3 my-1">New Password</label>
            <input
              type="password"
              className="form-control 3"
              placeholder="New Password"
              ref={(e) => (this.newPassword = e)}
            />
          </div>

          <div className="form-group">
            <label className="mt-3">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password "
              ref={(e) => (this.confirmPassword = e)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary btn-block btn-save"
              onClick={this.saveBtn}
            >
              Save
            </button>
          </div>

          <div>
            <button type="submit" className="btn btn-secondary btn-cancel ">
              <Link className="text-light text-decoration-none" to="/">
                Cancel
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id_user: state.authReducer.id_user,
  };
};

export default connect(mapStateToProps, null)(ChangePassword);
