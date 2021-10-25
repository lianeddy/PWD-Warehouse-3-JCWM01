const INIT_STATE = [];

const carts = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case "GET_CART":
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default carts;
