import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

import AppContext from "../AppContext";
import topics from "../topics.json";

import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import WarningIcon from "@mui/icons-material/Warning";

function BottomNavBar({ userName }) {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  const { machineMode, setMachineMode, socket } = useContext(AppContext);

  const [bottomBarData, setBottomBarData] = useState(null);

  useEffect(() => {
    console.log("In useEffect bottomBar !");
    // Call backend to receive data when component mounts
    socket.emit(topics.bottomBarScreen);

    // Handle receiving data
    socket.on(topics.bottomBarScreenRequestData, ({ data }) => {
      setBottomBarData(data);
    });

    // Clean up on unmount or when component is removed
    return () => {
      socket.off(topics.bottomBarScreenRequestData);
    };
  }, [socket]);

  console.log(bottomBarData);

  const GetColorMachineMode = (value) => {
    if (value === "Automatique") {
      return theme.palette.green.main;
    } else if (value === "Manuel") {
      return theme.palette.yellow.main;
    } else if (value === "Maintenance") {
      return theme.palette.orange.main;
    } else {
      return theme.palette.gray.main;
    }
  };

  const ChangeMachineMode = () => {
    if (machineMode === "Automatique") {
      setMachineMode("Manuel");
    } else if (machineMode === "Manuel") {
      setMachineMode("Maintenance");
    } else if (machineMode === "Maintenance") {
      setMachineMode("Automatique");
    }
    socket.emit(topics.bottomBarScreenChangesFromFrontend, { machineMode });
  };

  // Update current time
  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup
    return () => clearInterval(timerID);
  }, []);

  const menuStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "linear-gradient(white, lightgray, white)",
    borderTop: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "5px",
  };

  return (
    <Box sx={menuStyle}>
      <Link to="/">
        <Button variant="contained" sx={{ marginLeft: "5px" }}>
          Menu
        </Button>
      </Link>

      <Link to="/production">
        <IconButton aria-label="Home" sx={{ color: theme.palette.black.main }}>
          <HouseRoundedIcon fontSize="large" />
        </IconButton>{" "}
      </Link>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link to="/user">
          <IconButton
            aria-label="User"
            sx={{ color: theme.palette.black.main }}
          >
            <PersonIcon fontSize="large" />
          </IconButton>
        </Link>

        <Typography># {userName}</Typography>
      </Box>

      <Link to="/parameters">
        <IconButton
          aria-label="parameters"
          sx={{ color: theme.palette.black.main }}
        >
          <SettingsIcon fontSize="large" />
        </IconButton>
      </Link>

      <Button
        variant="contained"
        onClick={ChangeMachineMode}
        sx={{
          backgroundColor: GetColorMachineMode(machineMode),
        }}
      >
        {machineMode}
      </Button>

      <Link to="/alarms">
        <IconButton
          aria-label="Warning"
          sx={{ color: theme.palette.black.main }}
        >
          <WarningIcon fontSize="large" />
        </IconButton>
      </Link>

      <Typography
        sx={{
          textAlign: "center",
          marginRight: "5px",
        }}
      >
        {currentTime.toLocaleDateString()}
        <br />
        {currentTime.toLocaleTimeString()}
      </Typography>
    </Box>
  );
}

export default BottomNavBar;
