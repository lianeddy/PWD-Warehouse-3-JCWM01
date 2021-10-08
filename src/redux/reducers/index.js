import { combineReducers } from "redux";
import { authReducer } from "./loginReducer";
import { userMultiAddressReducer } from "./userMultiAddressReducer";

export const Reducers = combineReducers({
  authReducer,
  userMultiAddressReducer,
});
