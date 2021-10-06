import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#085AF6"
    },
    secondary: {
      main: "#E81212"
    }
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  rootElement
);
