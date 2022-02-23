import { authReducer } from "./user";
import { combineReducers } from "redux";
import { userMultiAddressReducer } from "./userMultiAddressReducer";
import { filterProvinsiReducer } from "./filterProvinsiReducer";
import { filterKabkotaReducer } from "./filterKabkotaReducer";
import { menuReducer } from "./menuReducer";
import { permintaanProdukReducer } from "./permintaanProdukReducer";
import { filterWarehouseReducer } from "./filterWarehouseReducer";
import { filterMasterProdukReducer } from "./filterMasterProdukReducer";
import { historyProdukReducer } from "./historyProdukReducer";
import { transaksiProdukReducer } from "./transaksiProdukReducer";
import { cartReducer } from "./cartReducers";
import { productReducer } from "./productReducer";

export const Reducers = combineReducers({
  authReducer,
  userMultiAddressReducer,
  filterProvinsiReducer,
  filterKabkotaReducer,
  menuReducer,
  permintaanProdukReducer,
  filterWarehouseReducer,
  filterMasterProdukReducer,
  historyProdukReducer,
  transaksiProdukReducer,
  cartReducer,
  productReducer,
});
