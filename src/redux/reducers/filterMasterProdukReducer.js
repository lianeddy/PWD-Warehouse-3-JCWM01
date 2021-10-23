const INIT_STATE = {
  optionsFilter: [],
  isLoading: false,
  selected: null,
};

export const filterMasterProdukReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_FILTER_MASTER_PRODUK":
      return { ...state, ...action.payload };
    case "SET_LOADING_FILTER_MASTER_PRODUK":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
