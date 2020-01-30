import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import "./App.css";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

const theme = {
  black: "#2b2b2b",
  primary: "#011C27",
  accent: "#F26430",
  notWhite: "#a9a9a9",
  blue: "#41555d",
  blueHover: "#011c27",
  red: "#940300",
  sidebarSelected: "#042532"
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
