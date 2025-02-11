"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "@/theme/mui";
import { store } from "@/store/store";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </Provider>
  );
}
