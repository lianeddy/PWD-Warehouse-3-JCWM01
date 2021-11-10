import { connect } from "react-redux";
import UploadProfileUserComponent from "../components/UploadProfileUser/UploadProfileUserComponent";

const AddProfileImages = (props) => {
  return (
    <UploadProfileUserComponent
      title="Input Profile Images"
      isAdd={true}
      idUser={props.userGlobal.id_user}
    ></UploadProfileUserComponent>
  );
};
const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddProfileImages);
