import { authReducer } from "./user";
import { combineReducers } from "redux";
import { userMultiAddressReducer } from "./userMultiAddressReducer";
import { filterProvinsiReducer } from "./filterProvinsiReducer";
import { filterKabkotaReducer } from "./filterKabkotaReducer";

export const Reducers = combineReducers({
  authReducer,
  userMultiAddressReducer,
  filterProvinsiReducer,
  filterKabkotaReducer,
});
