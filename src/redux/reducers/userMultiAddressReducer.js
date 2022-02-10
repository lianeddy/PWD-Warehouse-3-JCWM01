const INIT_STATE = {
  multiAddressList: [],
  modalIsOpen: false,
  datapropinsi: [],
  datakabkota: [],
  pagesNow: 0,
  maxPerPage: 10,
  total: 0,
};

export const userMultiAddressReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_MULTI_ADDRESS":
      return { ...state, ...action.payload };
    case "ADD_MULTI_ADDRESS":
      return { ...state, ...action.payload };
    case "UPDATE_MULTI_ADDRESS":
      return { ...state, ...action.payload };
    case "DELETE_MULTI_ADDRESS":
      return { ...state, ...action.payload };
    case "MODAL_IS_OPEN":
      return { ...state, ...action.payload };
    case "SET_TOTAL_PAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
