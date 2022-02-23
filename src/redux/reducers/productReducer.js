const INIT_STATE = {
  products: [],
  pagination: {
    currentPage: 1,
    previousPage: 0,
    nextPage: 0,
    maxPage: 1,
    productsCount: 0,
  },
  category: "",
  sort: "",
};

export const productReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SEARCH_PRODUCTS":
      return { ...state, products: [...action.payload] };
    default:
      return state;
  }
};
