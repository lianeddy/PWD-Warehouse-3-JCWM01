const INIT_STATE = {
  provinsiList: [],
  optionsFilter: {},
};

export const filterProvinsiReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_FILTER_PROVINSI":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
