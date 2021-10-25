import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { URL_API } from "../../helper";
import Axios from "axios";
import Swal from "sweetalert2";

class ProfileEdit extends React.Component {
  state = {
    userData: {},
    userNotFound: false,
    editUser: 0,
    edit_full_name: "",
    edit_email: "",
    edit_gender: "",
    edit_phone: "",
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
            edit_phone: result.data[0].phone,
            edit_birth_date: result.data[0].birth_date,
            edit_address: result.data[0].address,
          });
        } else {
          this.setState({ userNotFound: true });
        }
      })
      .catch(() => {
        alert(`Error get user profile`);
      });
  };

  btnSave = () => {
    Axios.patch(`${URL_API}/users/edit-profile/${this.state.editUser}`, {
      full_name: this.state.edit_full_name,
      email: this.state.edit_email,
      gender: this.state.edit_gender,
      birth_date: this.state.edit_birth_date,
      address: this.state.edit_address,
      phone: this.state.edit_phone,
    })
      .then(() => {
        Swal.fire({ text: "Update profile success!", icon: "success" });
        // alert("Update Profile Success!");
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
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
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
                      ></input>
                    </h5>
                    <h6 className="user-email">
                      <input
                        type="text"
                        readonly
                        className="form-control-plaintext text-center"
                        value={this.state.userData.email}
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
                    <h5 className="mb-2 text-primary">Edit Personal Details</h5>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="fullName">Full Name</label>
                      <input
                        onChange={this.inputHandler}
                        name="edit_full_name"
                        type="text"
                        className="form-control bg bg-white mb-3"
                        value={this.state.edit_full_name}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="eMail">Email</label>
                      <input
                        onChange={this.inputHandler}
                        name="edit_email"
                        type="text"
                        className="form-control"
                        value={this.state.edit_email}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="phone">Phone</label>
                      <input
                        onChange={this.inputHandler}
                        name="edit_phone"
                        type="number"
                        className="form-control bg bg-white mb-3"
                        value={this.state.edit_phone}
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="gender">Gender</label>
                      <select
                        onChange={this.inputHandler}
                        className="form-control bg bg-white mb-3"
                        name="edit_gender"
                        value={this.state.edit_gender}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="birth_date">Birth Date</label>
                      <input
                        onChange={this.inputHandler}
                        name="edit_birth_date"
                        type="date"
                        className="form-control bg bg-white mb-3"
                        value={this.state.edit_birth_date}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5 className="mt-3 mb-2 text-primary">Edit Address</h5>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="Street">Street</label>
                      <textarea
                        onChange={this.inputHandler}
                        name="edit_address"
                        type="text"
                        className="form-control bg bg-white mb-3"
                        value={this.state.edit_address}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="ciTy">City</label>
                      <textarea
                        onChange={this.inputHandler}
                        name="edit_address"
                        type="text"
                        className="form-control bg bg-white mb-3"
                        value={this.state.edit_address}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="sTate">State</label>
                      <textarea
                        onChange={this.inputHandler}
                        name="edit_address"
                        type="text"
                        className="form-control bg bg-white mb-3"
                        value={this.state.edit_address}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="zIp">Zip Code</label>
                      <input
                        onChange={this.inputHandler}
                        name="edit_address"
                        type="text"
                        className="form-control bg bg-white mb-3"
                        value={this.state.edit_address}
                      ></input>
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="text-right">
                      <Link
                        to={`/profile/${this.props.userGlobal.id_user}`}
                        style={{ textDecoration: "none" }}
                        className="btn btn-secondary text-white"
                      >
                        Cancel
                      </Link>

                      <button
                        onClick={this.btnSave}
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div className="container rounded bg-light">
      //   <div className="row">
      //     <div className="col-md-6 border-right">
      //       <div className="p-3 py-5">
      //         <div className="d-flex justify-content-between align-items-center mb-3">
      //           <h4 className="text-right">Edit Profil</h4>
      //         </div>
      //         <div className="form-group row">
      //           <label
      //             for="staticEmail"
      //             className="col-md-10 mt-3 col-form-label"
      //           >
      //             <h6>Full Name</h6>
      //           </label>
      //           <input
      //             onChange={this.inputHandler}
      //             name="edit_full_name"
      //             type="text"
      //             className="form-control"
      //             value={this.state.edit_full_name}
      //           />
      //         </div>
      //         <div className="form-group row">
      //           <label
      //             for="staticEmail"
      //             className="col-md-3 mt-3 col-form-label"
      //           >
      //             <h6>Email</h6>
      //           </label>
      //           <input
      //             onChange={this.inputHandler}
      //             name="edit_email"
      //             type="text"
      //             className="form-control"
      //             value={this.state.edit_email}
      //           />

      //           <div className="form-group row">
      //             <label
      //               for="staticEmail"
      //               className="col-md-3 mt-3 col-form-label"
      //             >
      //               <h6>Gender</h6>
      //             </label>
      //             <select
      //               onChange={this.inputHandler}
      //               className="form-select"
      //               name="edit_gender"
      //               value={this.state.edit_gender}
      //             >
      //               <option value="Male">Male</option>
      //               <option value="Female">Female</option>
      //             </select>
      //           </div>
      //           <div className="form-group row">
      //             <label
      //               for="staticEmail"
      //               className="col-md-3 mt-3 col-form-label"
      //             >
      //               <h6>Birth Date</h6>
      //             </label>
      //             <input
      //               onChange={this.inputHandler}
      //               name="edit_birth_date"
      //               type="date"
      //               className="form-control"
      //               value={this.state.edit_birth_date}
      //             />
      //           </div>
      //           <div className="form-group row">
      //             <label
      //               for="staticEmail"
      //               className="col-md-3 mt-3 col-form-label"
      //             >
      //               <h6>Address</h6>
      //             </label>
      //             <textarea
      //               onChange={this.inputHandler}
      //               name="edit_address"
      //               type="text"
      //               className="form-control"
      //               value={this.state.edit_address}
      //             ></textarea>
      //           </div>
      //         </div>
      //         <div className="mt-4 text-center">
      //           <button
      //             onClick={this.btnSave}
      //             className="btn btn-primary profile-button mx-2"
      //             type="button"
      //           >
      //             Simpan
      //           </button>
      //           <button className="btn btn-danger profile-button" type="button">
      //             <Link
      //               to={`/profile/${this.props.userGlobal.id_user}`}
      //               style={{ textDecoration: "none" }}
      //               className="text-white"
      //             >
      //               Cancel
      //             </Link>
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

export default connect(mapStateToProps)(ProfileEdit);
