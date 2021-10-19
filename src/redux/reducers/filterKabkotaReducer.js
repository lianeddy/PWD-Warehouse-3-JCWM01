const INIT_STATE = {
  kabkotaList: [],
  optionsFilter: [],
  isLoading: false,
  selected: null,
};

export const filterKabkotaReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_FILTER_KABKOTA":
      return { ...state, ...action.payload };
    case "SET_LOADING_FILTER_KABKOTA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
