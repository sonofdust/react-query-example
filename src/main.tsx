import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

//import {createTheme } from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {CustomThemeProvider} from "./context/ThemeContext";
const rootElement = document.getElementById("root");
if (rootElement) {
  const queryClient = new QueryClient();

  // const theme = createTheme({
  //   palette: {
  //     mode: "dark",
  //   },
  // });

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
          <CssBaseline />
          <App />
        </CustomThemeProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
