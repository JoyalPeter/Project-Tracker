import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, createContext, useMemo } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ColorTheme({ children }) {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#f4976c",
                },
                secondary: {
                  main: "#303c6c",
                },
                accent: {
                  main: "#b4dfe5", 
                },
                background: {
                  default: "#fbe8a6",
                  paper: "#d2fdff", 
                },
                text: {
                  primary: "#303c6c", 
                  secondary: "#b4dfe5",
                },
                divider: "#b4dfe5", 
              }
            : {
                primary: {
                  main: "#00a6fb", 
                },
                secondary: {
                  main: "#0582ca", 
                },
                accent: {
                  main: "#006494", 
                },
                background: {
                  default: "#051923", 
                  paper: "#003554", 
                },
                text: {
                  primary: "#ced4da", 
                  secondary: "#90aead", 
                },
                divider: "#ced4da", 
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

ColorTheme.propTypes = { children: PropTypes.element };
