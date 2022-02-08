const INIT_STATE = {
  cartList: [],
};

export const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CART":
      return { ...state, cartList: [...action.payload] };

    default:
      return state;
  }
};
