const INIT_STATE = {
  provinsiList: [],
  optionsFilter: [],
  isLoading: false,
  selected: null,
};

export const filterProvinsiReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_FILTER_PROVINSI":
      return { ...state, ...action.payload };
    case "SET_FILTER_PROVINSI_LOADING":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
