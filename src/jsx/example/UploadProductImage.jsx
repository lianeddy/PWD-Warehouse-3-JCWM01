import { connect } from "react-redux";
import UploadProductComponent from "../components/UploadProfileUser/UploadProductComponent";

const UploadProductImage = () => {
  return (
    <UploadProductComponent
      title="Input Profile Images"
      isAdd={true}
    ></UploadProductComponent>
  );
};
const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProductImage);
