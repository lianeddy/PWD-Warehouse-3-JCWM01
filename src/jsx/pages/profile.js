import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";
import { connect } from "react-redux";
import "./auth.css";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class Profile extends React.Component {
  state = {
    address: "",
    phone_number: 0,
    full_name: "",
    gender: "",
    age: 0,
    role: "",
    status: "",
    profile_picture: "",

    purwadhika_project_akhir: [],
    selectedID: null,
  };

  render() {
    return (
      <div className="intro">
        <div className="form-inner">
          <h3>Your Profile</h3>

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

const mapStateToProps = (state) => {
  return {
    id_user: state.authReducer.id_user,
  };
};

export default connect(mapStateToProps, null)(Profile);
