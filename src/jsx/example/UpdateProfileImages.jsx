import { connect } from "react-redux";
import UploadProfileUserComponent from "../components/UploadProfileUser/UploadProfileUserComponent";

const UpdateProfileImages = () => {
  return (
    <UploadProfileUserComponent
      title="Input Profile Images"
      isUpdate={true}
      idUser={0}
    ></UploadProfileUserComponent>
  );
};
const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfileImages);
