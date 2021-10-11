import Axios from "axios";
import React from "react";
import { URL_API } from "../../helper";
import { Redirect } from "react-router";
import Swal from "sweetalert2";

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Loading.....",
      redirect: false,
    };
  }

  componentDidMount() {
    Axios.patch(
      `${URL_API}/users/verified`,
      {},
      {
        //get token from headers
        headers: {
          Authorization: `Bearer ${this.props.match.params.token}`,
        },
      }
    )
      .then((res) => {
        Swal.fire("Your account verified");
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default Verification;
