import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./scss/tailwind.css";
import "./scss/index.scss";
import { BrowserRouter } from "react-router-dom";

const appRoot = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  appRoot
);
