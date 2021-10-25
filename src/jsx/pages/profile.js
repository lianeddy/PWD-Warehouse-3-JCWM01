import React from "react";
import { connect } from "react-redux";
import { Link, Router, Switch, Route } from "react-router-dom";
import { URL_API } from "../../helper";
import Axios from "axios";
import "./profile.css";
import UploadProfileUserComponent from "../components/UploadProfileUser/UploadProfileUserComponent";

class Profile extends React.Component {
  state = {
    userData: {},
    userNotFound: false,
  };

  fetchUserProfile = () => {
    Axios.get(`${URL_API}/users/get-profile`, {
      params: {
        id_user: this.props.userGlobal.id_user,
      },
    })
      .then((result) => {
        this.setState({ userData: result.data[0] });
      })
      .catch(() => {
        alert(`get user failed`);
      });
  };

  componentDidMount() {
    this.fetchUserProfile();
  }

  render() {
    console.log(this.props.email);

    return (
      <div>
        {this.state.userNotFound ? (
          <div className="alert alert-danger mt-3">User not found</div>
        ) : (
          <div className="container">
            <div className="row gutters">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                {/* <UploadProfileUserComponent
              title="Input Profile Images"
              isAdd={true}
            ></UploadProfileUserComponent> */}
                <div className="card h-100">
                  <div className="card-body">
                    <div className="account-settings">
                      <div className="user-profile">
                        <div className="user-avatar">
                          <img
                            src="https://hardiagedcare.com.au/about-us/management-team/default-avatar-profile-icon-vector-18942381/"
                            alt="profile image"
                          />
                        </div>
                        <h5 className="user-name ">
                          <input
                            type="text"
                            readonly
                            className="form-control-plaintext text-center"
                            value={this.state.userData.username}
                            disabled="true"
                          ></input>
                        </h5>
                        <h6 className="user-email">
                          <input
                            type="text"
                            readonly
                            className="form-control-plaintext text-center"
                            value={this.state.userData.email}
                            disabled="true"
                          ></input>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h5 className="mb-3 text-primary">Personal Details</h5>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="fullName">Full Name</label>
                          <input
                            type="text"
                            readonly
                            className="form-control bg bg-white mb-3"
                            value={this.state.userData.full_name}
                            disabled="true"
                          ></input>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="eMail">Email</label>
                          <input
                            type="text"
                            readonly
                            className="form-control bg bg-white mb-3"
                            value={this.state.userData.email}
                            disabled="true"
                          ></input>{" "}
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="phone">Phone</label>
                          <input
                            type="number"
                            readonly
                            className="form-control bg bg-white mb-3"
                            disabled="true"
                            value={this.state.userData.phone}
                          ></input>{" "}
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="gender">Gender</label>
                          <input
                            type="text"
                            readonly
                            className="form-control bg bg-white mb-3"
                            disabled="true"
                            value={this.state.userData.gender}
                          ></input>{" "}
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="birth_date">Birth Date</label>
                          <input
                            type="text"
                            readonly
                            className="form-control bg bg-white mb-3"
                            disabled="true"
                            value={this.state.userData.birth_date}
                          ></input>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h5 className="mt-3 mb-3 text-primary">Address</h5>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="Street">Street</label>
                          <input
                            type="text area"
                            readonly
                            className="form-control bg bg-white mb-3"
                            disabled="true"
                            value={this.state.userData.address}
                          ></input>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="ciTy">City</label>
                          <input
                            type="text area"
                            readonly
                            className="form-control bg bg-white mb-3"
                            disabled="true"
                            value={this.state.userData.address}
                          ></input>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="sTate">State</label>
                          <input
                            type="text area"
                            readonly
                            disabled="true"
                            className="form-control bg bg-white mb-3"
                            value={this.state.userData.address}
                          ></input>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="zIp">Zip Code</label>
                          <input
                            type="text"
                            readonly
                            className="form-control bg bg-white mb-3"
                            disabled="true"
                            value={this.state.userData.address}
                          ></input>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row gutters mt-3 ">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right ">
                          <Link
                            to={`/profile-edit/${this.state.userData.id_user}`}
                            style={{ textDecoration: "none" }}
                            className="btn btn-primary btn-block "
                          >
                            Edit Profil
                          </Link>

                          <Link
                            to={`/change-password`}
                            change
                            pass
                            style={{ textDecoration: "none" }}
                            className="btn btn-secondary btn-block "
                          >
                            Change Password
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

export default connect(mapStateToProps, null)(Profile);
