import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { AppBar, Toolbar, Typography, IconButton, Tabs, Tab, Button, Card, CardContent } from "@mui/material";
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
            main: mode === "light" ? "#3C91E6" : "#9B5DE5", // Light: Bright Blue, Dark: Vibrant Purple
          },
          secondary: {
            main: mode === "light" ? "#FF7F11" : "#F15BB5", // Light: Warm Orange, Dark: Hot Pink
          },
          background: {
            default: mode === "light" ? "#F5F1ED" : "#000000", // Light: Soft Warm Beige, Dark: Deep Black
            paper: mode === "light" ? "#FAE3D9" : "#1A1A1A", // Light: Pale Orange, Dark: Dark Grey
          },
          text: {
            primary: mode === "light" ? "#232323" : "#FFFFFF", // Light: Dark Grey, Dark: White
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
        <Card sx={{ m: 2, p: 2, backgroundColor: "background.paper" }}>
          <CardContent>
            <Typography variant="h6" color="primary">Primary Color Example</Typography>
            <Typography variant="body1" color="secondary">Secondary Color Example</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Primary Button
            </Button>
            <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
              Secondary Button
            </Button>
          </CardContent>
        </Card>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;