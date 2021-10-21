import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { URL_API } from "../../helper";
import Axios from "axios";

class ProfileEdit extends React.Component {
  state = {
    userData: {},
    userNotFound: false,
    editUser: 0,
    edit_full_name: "",
    edit_email: "",
    edit_gender: "",
    edit_birth_date: "",
    edit_address: "",
    edit_success: false,
  };
  fetchUserProfile = () => {
    Axios.get(`${URL_API}/users/get-profile`, {
      params: {
        id_user: this.props.userGlobal.id_user,
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({
            userData: result.data[0],
            editUser: result.data[0].id_user,
            edit_full_name: result.data[0].full_name,
            edit_email: result.data[0].email,
            edit_gender: result.data[0].gender,
            edit_birth_date: result.data[0].birth_date,
            edit_address: result.data[0].address,
          });
        } else {
          this.setState({ userNotFound: true });
        }
      })
      .catch(() => {
        alert(`Kesalahan saat mengambil data user`);
      });
  };

  btnSave = () => {
    Axios.patch(`${URL_API}/users/edit-profile`, {
      full_name: this.state.edit_full_name,
      email: this.state.edit_email,
      gender: this.state.edit_gender,
      birth_date: this.state.edit_birth_date,
      edit_address: this.state.edit_address,
    })
      .then(() => {
        alert("Update Profile Success!");
        this.setState({ edit_success: true });
      })
      .catch((err) => {
        console.log(err);
        alert("Update Failed");
      });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.fetchUserProfile();
  }

  render() {
    if (this.state.edit_success === true) {
      return <Redirect to={`/profile`} />;
    }
    return (
      <div className="container rounded bg-light">
        <div className="row">
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Edit Profil</h4>
              </div>

              <div className="form-group row">
                <label
                  for="staticEmail"
                  className="col-md-10 mt-3 col-form-label"
                >
                  <h6>Full Name</h6>
                </label>
                <input
                  onChange={this.inputHandler}
                  name="edit_full_name"
                  type="text"
                  className="form-control"
                  value={this.state.edit_full_name}
                />
              </div>
              <div className="form-group row">
                <label
                  for="staticEmail"
                  className="col-md-3 mt-3 col-form-label"
                >
                  <h6>Email</h6>
                </label>
                <input
                  onChange={this.inputHandler}
                  name="edit_email"
                  type="text"
                  className="form-control"
                  value={this.state.edit_email}
                />

                <div className="form-group row">
                  <label
                    for="staticEmail"
                    className="col-md-3 mt-3 col-form-label"
                  >
                    <h6>Gender</h6>
                  </label>
                  <select
                    onChange={this.inputHandler}
                    className="form-select"
                    name="edit_gender"
                    value={this.state.edit_gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group row">
                  <label
                    for="staticEmail"
                    className="col-md-3 mt-3 col-form-label"
                  >
                    <h6>Birth Date</h6>
                  </label>
                  <input
                    onChange={this.inputHandler}
                    name="edit_birth_date"
                    type="date"
                    className="form-control"
                    value={this.state.edit_birth_date}
                  />
                </div>
                <div className="form-group row">
                  <label
                    for="staticEmail"
                    className="col-md-3 mt-3 col-form-label"
                  >
                    <h6>Address</h6>
                  </label>
                  <textarea
                    onChange={this.inputHandler}
                    name="edit_address"
                    type="text"
                    className="form-control"
                    value={this.state.edit_address}
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={this.btnSave}
                  className="btn btn-primary profile-button mx-2"
                  type="button"
                >
                  Simpan
                </button>
                <button className="btn btn-danger profile-button" type="button">
                  <Link
                    to={`/profile/${this.props.userGlobal.id_user}`}
                    style={{ textDecoration: "none" }}
                    className="text-white"
                  >
                    Cancel
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

export default connect(mapStateToProps)(ProfileEdit);
