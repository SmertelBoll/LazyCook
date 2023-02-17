import { Box, Grid } from "@mui/material";
import React from "react";
import { StyledContainerWithPadding } from "../components/custom/customComponents";
import RecipesCard from "../components/RecipesCard";
import Search from "../components/Search";

function RecipesPage() {
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
        <StyledContainerWithPadding>
          <Grid container spacing={4}>
            {Array(12)
              .fill(0)
              .map((name, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <RecipesCard>xs=8</RecipesCard>
                </Grid>
              ))}
          </Grid>
        </StyledContainerWithPadding>
      </Box>
    </Box>
  );
}

export default RecipesPage;
