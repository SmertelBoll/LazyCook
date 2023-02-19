import { Box, Grid, Typography } from "@mui/material";
import React, { createRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
        <Typography variant="p">Try adding your own</Typography>
        {isButton && (
          <NavLink to="my-recipes">
            <StyledButton
              sx={{
                px: 4,
                mt: 3,
                border: "4px solid #000000",
                borderRadius: 7,
                maxWidth: "auto",
                color: "text.black",
                "&:hover": {
                  color: "text.white",
                  bgcolor: "buttonbg.black",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="p" sx={{ p: 0 }}>
                my recipes
              </Typography>
            </StyledButton>
          </NavLink>
        )}
      </Box>
    </>
  );
}

export default EmptyData;
