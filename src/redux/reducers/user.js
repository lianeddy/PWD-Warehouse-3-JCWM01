const INIT_STATE = {
  id_user: null,
  username: "",
  email: "",
  id_role: 0,
  id_warehouse: null,
  birth_data: "",
  gender: "",
  isLogin: false,
  error: "",
};

export const authReducer = (state = INIT_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload, isLogin: true };
    case "API_USER_START":
      return { ...state, ...action.payload, isLogin: true };
    case "API_USER_FAILED":
      return { ...state, error: action.payload, isLogin: false };
    case "USER_LOGOUT":
      return { ...INIT_STATE, isLogin: false };
    default:
      return state;
  }
};
