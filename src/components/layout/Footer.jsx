import { Typography, Box } from "@mui/material";
import React from "react";
import { StyledContainer } from "../custom/customComponents";

function Footer() {
  return (
    <Box
      position="static"
      component="footer"
      bgcolor="bg.main"
      sx={{
        py: 3,
        textAlign: "center",
        position: "relative",
        boxShadow: 1,
      }}
    >
      <StyledContainer>
        <Typography variant="p" sx={{ color: "text.grey" }}>
          © 2023 LazyCook
        </Typography>
      </StyledContainer>
    </Box>
  );
}

export default Footer;
