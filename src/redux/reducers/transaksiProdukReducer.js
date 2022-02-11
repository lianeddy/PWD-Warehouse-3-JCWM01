const INIT_STATE = {
  list: [],
  modalIsOpen: false,
  pagesNow: 0,
  maxPerPage: 10,
  total: 0,
  shippingCourier: [],
  paymentMethods: [],
  shippingMethods: [],
};

export const transaksiProdukReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_TRANSAKSI_PRODUK":
      return { ...state, ...action.payload };
    case "MODAL_IS_OPEN_TRANSAKSI_PRODUK":
      return { ...state, ...action.payload };
    case "SET_TOTAL_PAGE_TRANSAKSI_PRODUK":
      return { ...state, ...action.payload };
    case "GET_SHIPPING_COURIER":
      return { ...state, shippingCourier: [...action.payload] };
    case "GET_PAYMENT_METHODS":
      return { ...state, paymentMethods: [...action.payload] };
    case "GET_SHIPPING_METHODS":
      return { ...state, shippingMethods: [...action.payload] };
    default:
      return state;
  }
};
