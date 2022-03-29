import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { lightTheme, BlackTheme } from "./theme";
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
