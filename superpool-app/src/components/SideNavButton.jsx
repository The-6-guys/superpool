import React from "react";
import { Button, useTheme } from "@mui/material";

const SideNavButton = ({ active, children, onClick, sx }) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        borderRadius: "0px",
        textTransform: "none",
        color: "black",
        fontWeight: "bold",
        fontSize: "1.2rem",
        borderTop: "1px solid darkgray",
        width: "220px",
        background: active ? theme.palette.primary.main : "transparent",
        "&:hover": {
          background: theme.palette.primaryLighten.main,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SideNavButton;
