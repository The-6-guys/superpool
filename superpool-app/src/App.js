import React, { useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { darken, lighten } from "@mui/system";

import ScreensList from "./screensList";
import AppContext from "./AppContext";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(101, 138, 163)",
    },
    primaryDarken: {
      main: darken("rgb(101, 138, 163)", 0.3),
    },
    primaryLighten: {
      main: lighten("rgb(101, 138, 163)", 0.5),
    },
    logoRevtechPrimary: {
      main: "rgb(16, 61, 105)",
    },
    logoRevtechSecondary: {
      main: "rgb(138, 151, 161)",
    },

    black: {
      main: "rgb(0, 0, 0)",
    },
    blue: {
      main: "rgb(90, 200, 250)",
    },
    orange: {
      main: "rgb(240, 150, 40)",
    },
    gray: {
      main: "rgb(170, 170, 170)",
    },
    green: {
      main: "rgb(65, 210, 60)",
    },
    red: {
      main: "rgb(220, 20, 20)",
    },
    yellow: {
      main: "rgb(240, 240, 25)",
    },
  },
  typography: {
    body1: {
      fontSize: "1rem",
      fontWeight: "bold",
      verticalAlign: "middle",
      color: "rgb(0, 0, 0)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ...props }) => ({
          borderRadius: "12px",
          textTransform: "none",
          background: theme.palette.primary.main,
          color: "black",
          fontWeight: "bold",
          width: "200px",
          fontSize: "1.2rem",
          transition: "background-color 0.3s",
          "&:hover": {
            background:
              props.sx && props.sx.backgroundColor
                ? darken(props.sx.backgroundColor, 0.3)
                : theme.palette.primaryDarken.main,
          },
        }),
      },
    },
  },
});

function App() {
  const [machineState, setMachineState] = useState("Automatique");
  const securityLightIndicator = false;
  const robotLightIndicator = false;
  const productionLightIndicator = false;

  return (
    <div style={{ width: "100%" }}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            machineState,
            setMachineState,
            securityLightIndicator,
            robotLightIndicator,
            productionLightIndicator,
            socket,
          }}
        >
          <Router>
            <ScreensList />
            {/*<BottomNavBar userName={"xxx555xxx"} />*/}
          </Router>
        </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
