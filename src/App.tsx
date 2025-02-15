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
            main: mode === "light" ? "#1976d2" : "#90caf9", // Adjustable
          },
          background: {
            default: mode === "light" ? "#ffffff" : "#121212",
            paper: mode === "light" ? "#f5f5f5" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "#000000" : "#ffffff",
          },
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
              My Themed App
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
            <Tab label="Tab 3" />
          </Tabs>
        </Resizable>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
