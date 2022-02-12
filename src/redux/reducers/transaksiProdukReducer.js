const INIT_STATE = {
  list: [],
  modalIsOpen: false,
  pagesNow: 0,
  maxPerPage: 10,
  total: 0,
  shippingCourier: [],
  paymentMethods: [],
  shippingMethods: [],
  checkoutData: {},
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
    case "PASS_ALL_CHECKOUT_DATAS":
      return { ...state, ...action.payload };
    // case "PASS_ONGKIR_ID-METODE-PENGIRIMAN":
    //   // console.log(action.payload);
    //   return { ...state, ...action.payload };
    // case "PASS_ID_METODE_PEMBAYARAN":
    //   let newdata = {};
    //   for (const [key, value] of Object.entries(action.payload)) {
    //     newdata[key] = { ...value, name: key };
    //   }
    //   return { ...state, payload: newdata };
    default:
      return state;
  }
};
