const INIT_STATE = {
  // id: 2,
  // password: "",
  id_user: null,
  username: "",
  email: "",
  id_role: 0,
  id_warehouse: 0,
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
      return { ...state };
    case "API_USER_FAILED":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
