import React from "react";
import { Box, Grid, useTheme } from "@mui/material";

import BottomNavBar from "../navigation/BottomNavBar";

const GeneralView = ({ screenComponent }) => {
  const theme = useTheme();

  return (
    <Grid container direction="column" style={{ minHeight: "100vh" }}>
      <Grid item style={{ flexGrow: 1 }}>
        <Box
          sx={{
            backgroundImage: `linear-gradient(to top, ${theme.palette.logoRevtechPrimary.main}, ${theme.palette.logoRevtechSecondary.main})`,
            minHeight: "calc(100vh - 62px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {screenComponent}
        </Box>
      </Grid>
      <Grid item>
        <BottomNavBar userName={"xxx555xxx"} />
      </Grid>
    </Grid>
  );
};

export default GeneralView;
