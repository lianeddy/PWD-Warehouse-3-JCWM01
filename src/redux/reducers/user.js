const INIT_STATE = {
  id_user: null,
  username: "",
  email: "",
  id_role: 0,
  id_warehouse: null,
  birth_data: "",
  gender: "",
};

export const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
