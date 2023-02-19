import { Typography, Box } from "@mui/material";
import React from "react";
import { StyledContainer } from "../custom/customComponents";

function Footer() {
  return (
    <Box
      position="relative"
      component="footer"
      bgcolor="bg.main"
      sx={{
        py: { xs: 2, sm: 3 },
        textAlign: "center",
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
