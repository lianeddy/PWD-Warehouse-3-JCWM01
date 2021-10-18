import { authReducer } from "./user";
import { combineReducers } from "redux";
import { userMultiAddressReducer } from "./userMultiAddressReducer";

export const Reducers = combineReducers({
  authReducer,
  userMultiAddressReducer,
});
