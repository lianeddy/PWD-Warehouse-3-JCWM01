import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";
import "./auth.css";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class ForgotPasswordUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      // disableBtn: false,
    };
  }

  submitPassword = () => {
    // console.log(window.location.href);
    // console.log(this.props.match.params.token);
    let newPassword = this.newPassword.value;
    let confirmPassword = this.confirmPassword.value;
    this.setState({ disableBtn: true });

    if ((newPassword == "", confirmPassword == "")) {
      Swal.fire("Form can't be empty");
    } else if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "New password did not match!",
      });
    } else {
      Axios.patch(
        `${URL_API}/users/forgot-password-update/`,
        {
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.match.params.token}`,
          },
        }
      )

        .then((res) => {
          console.log(res.data.message);
          Swal.fire({
            icon: "success",
            title: "Password change success!",
            text: "you can now use your new password to login to your account!",
          });
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
          <h3>Input New Password</h3>

          <div className="form-group">
            <label className="mt-3 my-1">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              ref={(e) => (this.newPassword = e)}
            />
          </div>

          <div className="form-group">
            <label className="mt-3 my-1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              ref={(e) => (this.confirmPassword = e)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-save"
            onClick={this.submitPassword}
            // disabled={this.state.disableBtn}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordUpdate;
