import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#8b75ff",
      main: "#5549cd",
      dark: "#0a209b"
    },
    secondary: {
      light: "#f495ff",
      main: "#bf64f5",
      dark: "#8b33c1"
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
