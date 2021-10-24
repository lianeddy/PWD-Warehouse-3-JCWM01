const INIT_STATE = {
  // id: 2,
  // password: "",
  id_user: 2,
  username: "",
  email: "",
  id_role: 2,
  id_warehouse: null,
  birth_date: "",
  gender: "",
  password: "",
  full_name: "",
  phone: 0,
  address: "",
  loading: false,
  error: "",
  isLogin: false,
};

export const authReducer = (state = INIT_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload, isLogin: true };
    case "API_USER_START":
      return { ...state, loading: true, isLogin: true };
    case "API_USER_FAILED":
      return { ...state, error: action.payload, loading: false };
    case "API_USER_SUCCESS":
      return { ...state, loading: false };
    case "LOGOUT_SUCCESS":
      return { ...INIT_STATE };
    default:
      return state;
  }
};
