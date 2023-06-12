import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import "./styles/index.css";
import { theme } from "./theme/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter basename="https://smertelboll.github.io/LazyCook/">
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
