import React from "react";
import ReactDOM from "react-dom/client";
import { MainApp } from "./MainApp";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/_styles_sass.scss";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
