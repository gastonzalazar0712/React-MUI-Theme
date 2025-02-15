import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { AppBar, Toolbar, Typography, IconButton, Tabs, Tab } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Resizable } from "re-resizable";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(prefersDarkMode ? "dark" : "light");
  const [tabIndex, setTabIndex] = useState(0);

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
          primary: {
            main: mode === "light" ? "#4CAF50" : "#FF9800", // Light: Green, Dark: Orange
          },
          secondary: {
            main: mode === "light" ? "#FFA726" : "#03A9F4", // Light: Orange, Dark: Bright Blue
          },
          background: {
            default: mode === "light" ? "#F3E5AB" : "#121212", // Light: Warm Beige, Dark: Deep Black
            paper: mode === "light" ? "#FFF3E0" : "#1E1E1E", // Light: Light Orange, Dark: Dark Gray
          },
          text: {
            primary: mode === "light" ? "#37474F" : "#FFFFFF", // Light: Deep Blue, Dark: White
            secondary: mode === "light" ? "#FF7043" : "#81D4FA", // Light: Warm Orange, Dark: Light Blue
          },
        },
        typography: {
          fontFamily: "Arial, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Themed App
            </Typography>
            <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Resizable
          defaultSize={{ width: "100%", height: "300px" }}
          enable={{ top: false, right: false, bottom: true, left: false }}
          style={{ borderBottom: "1px solid", borderColor: theme.palette.divider }}
        >
          <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
          </Tabs>
        </Resizable>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
