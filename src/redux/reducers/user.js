const INIT_STATE = {
  // id: 2,
  // password: "",
  id_user: 0,
  username: "",
  email: "",
  id_role: null,
  id_warehouse: null,
  birth_date: "",
  gender: "",
  password: "",
  full_name: "",
  phone: 0,
  address: "",
  // loading: false,
  error: "",
  isLogin: false,
  url_profile: "",
};

export const authReducer = (state = INIT_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload, isLogin: true };
    case "USER_CHECK_LOGIN":
      return { ...state, ...action.payload, isLogin: true };
    case "ADMIN_CHECK_LOGIN":
      return { ...state, ...action.payload, isLogin: true };
    case "USER_LOGOUT":
      return { ...INIT_STATE, isLogin: false };
    case "ADMIN_LOGOUT":
      return { ...INIT_STATE, isLogin: false };
    default:
      return state;
  }
};
