import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { URL_API } from "../../helper";
import Axios from "axios";

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
      <div className="container rounded bg-light">
        {this.state.userNotFound ? (
          <div className="alert alert-danger mt-3">User not found</div>
        ) : (
          <div className="row">
            <div className="col-md-6 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">My Profile</h4>
                </div>

                <div className="form-group row">
                  <label
                    for="staticFullname"
                    className="col-md-3 col-form-label"
                  >
                    <h6>Full Name</h6>
                  </label>
                  <div className="col-md-5">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      value={this.state.userData.full_name}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="staticEmail" className="col-md-3 col-form-label">
                    <h6>Email</h6>
                  </label>
                  <div className="col-md-5">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      value={this.state.userData.email}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="staticGender" className="col-md-3 col-form-label">
                    <h6>Gender</h6>
                  </label>
                  <div className="col-md-5">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      value={this.state.userData.gender}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    for="staticBirthDate"
                    className="col-md-3 col-form-label"
                  >
                    <h6>Birth Date</h6>
                  </label>
                  <div className="col-md-5">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      value={this.state.userData.birth_date}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    for="staticAddress"
                    className="col-md-3 col-form-label"
                  >
                    <h6>Address</h6>
                  </label>
                  <div className="col-md-5">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      value={this.state.userData.address}
                    ></input>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="btn btn-secondary">
                    <a
                      href="/"
                      className="text-dark text-center"
                      style={{ textDecoration: "none" }}
                    >
                      Home
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <span>
                  <Link
                    to={`/profile-edit/${this.state.userData.id_user}`}
                    style={{ textDecoration: "none" }}
                    className="text-dark text-underline-hover"
                  >
                    Edit Profil
                  </Link>
                </span>
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
