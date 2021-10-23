const INIT_STATE = {
  optionsFilterPengirim: [],
  optionsFilterPenerima: [],
  isLoadingPengirim: false,
  isLoadingPenerima: false,
  selected: null,
};

export const filterWarehouseReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_FILTER_WAREHOUSE":
      return { ...state, ...action.payload };
    case "SET_LOADING_FILTER_WAREHOUSE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
