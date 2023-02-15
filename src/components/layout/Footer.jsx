import { useTheme } from "@emotion/react";
import { Typography, Box } from "@mui/material";
import React from "react";
import { StyledContainer } from "../custom/customComponents";

function Footer() {
  const theme = useTheme();

  return (
    <Box
      position="static"
      component="footer"
      bgcolor={theme.palette.bg.main}
      sx={{
        py: 3,
      }}
    >
      <StyledContainer>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", color: "text.grey" }}
        >
          © 2023 LazyCook
        </Typography>
      </StyledContainer>
    </Box>
  );
}

export default Footer;
