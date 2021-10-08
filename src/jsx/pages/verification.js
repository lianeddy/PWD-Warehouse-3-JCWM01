import Axios from "axios";
import React from "react";
import { URL_API } from "../../helper";

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Loading.....",
    };
  }

  componentDidMount() {
    Axios.patch(
      `${URL_API}/users/verified`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.props.match.params.token}`,
        },
      }
    )
      .then((res) => {
        this.setState({ message: "Your Account Verified" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container p-5">
        <h1>{this.state.message}</h1>;
      </div>
    );
  }
}

export default Verification;
