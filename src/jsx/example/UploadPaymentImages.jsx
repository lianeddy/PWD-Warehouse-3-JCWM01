import { connect } from "react-redux";
import UploadPaymentComponent from "../components/UploadProfileUser/UploadPaymentComponent";

const UploadPaymentImage = () => {
  return (
    <UploadPaymentComponent
      title="Input Payment Images"
      isAdd={true}
    ></UploadPaymentComponent>
  );
};
const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPaymentImage);
