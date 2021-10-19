const INIT_STATE = {
  // id: 2,
  // password: "",
  id_user: 3,
  username: "",
  email: "",
  id_role: 2,
  id_warehouse: 3,
  birth_date: "",
  gender: "",
  isLogin: false,
};

export const authReducer = (state = INIT_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
