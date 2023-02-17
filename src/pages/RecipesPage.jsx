import { Box } from "@mui/material";
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
        <StyledContainerWithPadding
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          {Array(10)
            .fill(0)
            .map((name) => (
              <RecipesCard />
            ))}
        </StyledContainerWithPadding>
      </Box>
    </Box>
  );
}

export default RecipesPage;
