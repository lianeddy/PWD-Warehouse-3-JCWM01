import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";
import { connect } from "react-redux";
import "./auth.css";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      alertShow: "none",
      disableBtn: false,
    };
  }

  render() {
    return (
      <div className="intro">
        <div className="form-inner">
          <div
            className="alert alert-danger"
            style={{ display: this.state.alertShow }}
            role="alert"
          >
            Profil Saved
          </div>

          <h3>Input Personal Data</h3>

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
            onClick={this.submitPassword}
            // onClick={() => this.saveBtn(id_user)}
            // disabled={this.state.disableBtn}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Profile);
