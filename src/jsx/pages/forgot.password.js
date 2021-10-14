import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";
import { connect } from "react-redux";
import "./auth.css";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      disableBtn: false,
    };
  }

  submitEmail = () => {
    let email = this.email.value;
    this.setState({ disableBtn: true });

    if (email == "") {
      alert("Email can't be empty");
    } else {
      Axios.post(`${URL_API}/users/forgot-password/`, {
        email,
      })
        .then((res) => {
          if (res.data.message) {
            Swal.fire(res.data.message);
          } else {
            Swal.fire({
              title: "Reset Password Request success!",
              text: "check your email to continue",
              icon: "success",
            });
          }

          this.setState({
            redirect: true,
          });
        })
        .catch(() => {
          Swal.fire({ text: "Email not registered", icon: "error" });
          console.log("Email not registered");
        });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="intro">
        <div className="form-inner">
          <h3>Reset Password</h3>

          <div className="form-group">
            <label>Type your email</label>
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
            onClick={this.submitEmail}
          >
            Submit
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

export default connect(mapStateToProps, null)(ForgotPassword);
