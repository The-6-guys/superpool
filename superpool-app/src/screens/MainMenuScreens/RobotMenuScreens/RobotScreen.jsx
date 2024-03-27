import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AppContext from "../../../AppContext";

import topics from "../../../topics.json";

function RobotScreen() {
  const theme = useTheme();

  const { socket } = useContext(AppContext);

  const [robotData, setRobotData] = useState(null);

  useEffect(() => {
    console.log("In useEffect robot !");
    // Call backend to receive data when component mounts
    socket.emit(topics.robotScreen);

    // Handle receiving data
    socket.on(topics.robotScreenRequestData, ({ data }) => {
      setRobotData(data);
    });

    // Clean up on unmount or when component is removed
    return () => {
      socket.off(topics.robotScreenRequestData);
    };
  }, [socket]);

  console.log(robotData);

  return <div>Robot Screen</div>;
}

export default RobotScreen;
