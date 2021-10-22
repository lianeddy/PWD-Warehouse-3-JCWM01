const INIT_STATE = {
  list: [],
  modalIsOpen: false,
  pagesNow: 0,
  maxPerPage: 10,
  total: 0,
};

export const transaksiProdukReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_TRANSAKSI_PRODUK":
      return { ...state, ...action.payload };
    case "MODAL_IS_OPEN_TRANSAKSI_PRODUK":
      return { ...state, ...action.payload };
    case "SET_TOTAL_PAGE_TRANSAKSI_PRODUK":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
