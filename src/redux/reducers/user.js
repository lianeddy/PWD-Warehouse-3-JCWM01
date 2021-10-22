const INIT_STATE = {
  id_user: null,
  username: "",
  email: "",
  id_role: 0,
  id_warehouse: null,
  birth_date: "",
  gender: "",
  password: "",
  full_name: "",
  phone: 0,
  address: "",
  loading: false,
  error: "",
};

export const authReducer = (state = INIT_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload };
    case "API_USER_START":
      return { ...state, loading: true };
    case "API_USER_FAILED":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
