const INIT_STATE = {
  id: 2,
  username: "",
  password: "",
  role: "",
};

export const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
