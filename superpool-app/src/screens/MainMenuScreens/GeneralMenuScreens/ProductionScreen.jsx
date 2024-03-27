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

function ProductionScreen() {
  const theme = useTheme();
  const {
    machineState,
    securityLightIndicator,
    robotLightIndicator,
    productionLightIndicator,
    socket,
  } = useContext(AppContext);

  const [productionData, setProductionData] = useState(null);

  useEffect(() => {
    console.log("In useEffect production !");
    // Call backend to receive data when component mounts
    socket.emit(topics.productionScreen);

    // Handle receiving data
    socket.on(topics.productionScreenRequestData, ({ data }) => {
      setProductionData(data);
    });

    // Clean up on unmount or when component is removed
    return () => {
      socket.off(topics.productionScreenRequestData);
    };
  }, [socket]);

  const HandleMachineState = (state) => {
    socket.emit(topics.productionScreenChangesFromFrontend, { state });
  };

  console.log(productionData);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
      }}
    >
      {productionData === null ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <TextField
            placeholder="Enter a title or project number here"
            sx={{
              backgroundColor: "white",
              width: "75%",
            }}
          />

          <Box
            sx={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end", // Align items to the right
              paddingRight: "10px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ textAlign: "right" }}>Sécurité</Typography>
              <IconButton disabled sx={{ padding: 0 }}>
                <FiberManualRecordIcon
                  fontSize="large"
                  sx={{
                    color: securityLightIndicator
                      ? theme.palette.green.main
                      : theme.palette.gray.main,
                  }}
                />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ textAlign: "right" }}>Robot</Typography>
              <IconButton disabled sx={{ padding: 0 }}>
                <FiberManualRecordIcon
                  fontSize="large"
                  sx={{
                    color: robotLightIndicator
                      ? theme.palette.green.main
                      : theme.palette.gray.main,
                  }}
                />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ textAlign: "right" }}>Production</Typography>
              <IconButton disabled sx={{ padding: 0 }}>
                <FiberManualRecordIcon
                  fontSize="large"
                  sx={{
                    color: productionLightIndicator
                      ? theme.palette.green.main
                      : theme.palette.gray.main,
                  }}
                />
              </IconButton>
            </Box>

            <Box
              sx={{
                backgroundColor: theme.palette.yellow.main,
                border: "2px solid black",
                marginTop: "10px",
                display: "flex", // Add display flex
                flexDirection: "column", // Align content vertically
                alignItems: "center", // Center align items vertically
                padding: "5px",
                width: "186px",
              }}
            >
              <Typography variant="body1">
                État de la machine : <br />
                <br />
              </Typography>
              <Typography variant="body2">{machineState}</Typography>
            </Box>

            <Button
              sx={{
                marginTop: "10px",
                backgroundColor: theme.palette.green.main,
              }}
              onClick={() => {
                HandleMachineState("start");
              }}
            >
              Départ
            </Button>
            <Button
              sx={{
                marginTop: "10px",
                backgroundColor: theme.palette.red.main,
              }}
              onClick={() => {
                HandleMachineState("stop");
              }}
            >
              Arrêt
            </Button>
            <Button
              sx={{
                marginTop: "10px",
                backgroundColor: theme.palette.yellow.main,
              }}
              onClick={() => {
                HandleMachineState("pause");
              }}
            >
              Pause
            </Button>
            <Button
              sx={{
                marginTop: "10px",
                backgroundColor: theme.palette.blue.main,
              }}
              onClick={() => {
                HandleMachineState("reset");
              }}
            >
              Reset
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}

export default ProductionScreen;
