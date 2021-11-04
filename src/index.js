import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { positions,transitions,Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic'
import "./index.css";
import App from "./App";

const options = {
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.scale,
}

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
