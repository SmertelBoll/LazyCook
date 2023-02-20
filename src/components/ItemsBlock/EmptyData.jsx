import { Box, Grid, Typography } from "@mui/material";
import React, { createRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import BlackButton from "../custom/BlackButton";
import { StyledButton } from "../custom/customComponents";

function EmptyData({ isButton }) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "text.black",
        }}
      >
        <Typography variant="h2">Oh..</Typography>
        <Typography variant="p">
          Unfortunately, we could not find any recipes.
        </Typography>
        <Typography variant="p" sx={{ mb: 3 }}>
          Try adding your own
        </Typography>
        {isButton && (
          <BlackButton link="/recipes/my-recipes">my recipes</BlackButton>
        )}
      </Box>
    </>
  );
}

export default EmptyData;
