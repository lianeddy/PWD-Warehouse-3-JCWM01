const INIT_STATE = {
  permintaanProdukList: [],
  modalIsOpen: false,
  pagesNow: 0,
  maxPerPage: 10,
  total: 0,
};

export const permintaanProdukReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PERMINTAAN_BARANG":
      return { ...state, ...action.payload };
    case "ADD_PERMINTAAN_BARANG":
      return { ...state, ...action.payload };
    case "UPDATE_PERMINTAAN_BARANG":
      return { ...state, ...action.payload };
    case "DELETE_PERMINTAAN_BARANG":
      return { ...state, ...action.payload };
    case "MODAL_IS_OPEN_PERMINTAAN_BARANG":
      return { ...state, ...action.payload };
    case "SET_TOTAL_PAGE_PERMINTAAN_BARANG":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
