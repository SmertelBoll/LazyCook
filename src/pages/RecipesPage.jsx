import { Box, Typography } from "@mui/material";
import React from "react";
import { StyledContainerWithPadding } from "../components/custom/customComponents";
import Search from "../components/Search";

function RecipesPage() {
  // const theme = useTheme();

  return (
    <Box bgcolor="bg.white" sx={{ height: "100%" }}>
      <StyledContainerWithPadding>
        <Search />
      </StyledContainerWithPadding>
      <Box
        bgcolor="bg.blue"
        sx={{
          minHeight: "100vh",
          mx: { xs: 2, sm: 3 },
          borderRadius: "28px 28px 0px 0px",
        }}
      >
        <StyledContainerWithPadding>123</StyledContainerWithPadding>
      </Box>
    </Box>
  );
}

export default RecipesPage;
