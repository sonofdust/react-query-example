import React, {createContext, useContext, useState, ReactNode} from "react";
import {ThemeProvider, createTheme} from "@mui/material";

// Define the type for the context state
type ThemeContextType = {
  toggleTheme: () => void;
  mode: "light" | "dark";
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

// Theme provider component
export const CustomThemeProvider = ({children}: {children: ReactNode}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeContext.Provider value={{toggleTheme, mode}}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
