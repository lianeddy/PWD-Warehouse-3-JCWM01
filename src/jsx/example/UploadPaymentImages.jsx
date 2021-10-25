import { connect } from "react-redux";
import UploadPaymentComponent from "../components/UploadProfileUser/UploadPaymentComponent";
import { Col, Container, Row, Card } from "react-bootstrap";

const UploadPaymentImage = () => {
  return (
    <div className="col-md-12 col-lg-12 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Secure Checkout</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2"></div>
        </div>
      </div>
      <Card body className="mb-3">
        <UploadPaymentComponent
          title="Input Payment Images"
          isAdd={true}
        ></UploadPaymentComponent>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPaymentImage);
