import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container } from "@mui/material";

import SideNavButton from "../../components/SideNavButton";
import LogoRevtech from "../../static/LogoRevtech.png";

function MainMenuScreen() {
  const [firstMenuActiveItem, setFirstMenuActiveItem] = useState(null);

  const handleToggleFirstMenu = (itemName) => {
    setFirstMenuActiveItem(itemName === firstMenuActiveItem ? null : itemName);
  };

  return (
    <Container
      disableGutters
      sx={{ display: "flex", flexDirection: "row", flex: 1, m: 0 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundImage: "linear-gradient(white, lightgray)",
          width: "max-content", // Width fits the content
          borderRight: "1px solid darkgray",
        }}
      >
        <img
          src={LogoRevtech}
          alt="Logo"
          style={{
            height: "100px",
            margin: "10px",
          }}
        ></img>

        <SideNavButton
          active={firstMenuActiveItem === "Général"}
          onClick={() => handleToggleFirstMenu("Général")}
        >
          Général
        </SideNavButton>

        <Link to="/security">
          <SideNavButton>Sécurité</SideNavButton>
        </Link>

        <SideNavButton
          active={firstMenuActiveItem === "Robot"}
          onClick={() => handleToggleFirstMenu("Robot")}
        >
          Robot
        </SideNavButton>

        <Link to="/alarms">
          <SideNavButton>Alarmes</SideNavButton>
        </Link>

        <Link to="/machineStateUN">
          <SideNavButton sx={{ borderBottom: "1px solid darkgray" }}>
            État machine
          </SideNavButton>
        </Link>
      </Box>

      {firstMenuActiveItem && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundImage: "linear-gradient(white, lightgray)",
            width: "max-content", // Width fits the content
            borderRight: "1px solid darkgray",
            borderTop: "1px solid darkgray",
            marginTop: "120px",
          }}
        >
          {firstMenuActiveItem === "Général" && (
            <>
              <Link to="/production">
                <SideNavButton sx={{ borderTop: "0px" }}>
                  Production
                </SideNavButton>
              </Link>

              <Link to="/parameters">
                <SideNavButton>Paramètres</SideNavButton>
              </Link>

              <Link to="/ioList">
                <SideNavButton sx={{ borderBottom: "1px solid darkgray" }}>
                  Liste IO
                </SideNavButton>
              </Link>
            </>
          )}
          {firstMenuActiveItem === "Robot" && (
            <>
              <Link to="/robot">
                <SideNavButton
                  sx={{ borderTop: "0px", borderBottom: "1px solid darkgray" }}
                >
                  Robot #1
                </SideNavButton>
              </Link>
            </>
          )}
        </Box>
      )}
    </Container>
  );
}

export default MainMenuScreen;
