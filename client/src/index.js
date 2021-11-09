import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { API_URL } from "./configs";
import "./index.css";

axios.defaults.baseURL = API_URL;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
