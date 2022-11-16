import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import "bootstrap/dist/css/bootstrap.min.css";
import footer from "../src/helper/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
