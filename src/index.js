import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//redux configuration
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Reducers } from "./redux/reducers";
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// const storeReducer = createStore(Reducers);
const storeReducer = configureStore({
  reducer: Reducers,
  // middleware: applyMiddleware(ReduxThunk),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ReduxThunk),
});

ReactDOM.render(
  <Provider store={storeReducer}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
