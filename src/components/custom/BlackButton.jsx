import { Typography } from "@mui/material";
import React from "react";
import { StyledButton } from "./customComponents";
import WestIcon from "@mui/icons-material/West";
import { NavLink } from "react-router-dom";

function BlackButton({
  link = "",
  onClick = () => {},
  backArrow = false,
  sx = {},
  children,
}) {
  return (
    <NavLink to={link} style={{ width: "auto" }}>
      <StyledButton
        onClick={onClick}
        sx={{
          px: 4,
          border: {
            xs: "2px solid #000000",
            sm: "3px solid #000000",
            md: "4px solid #000000",
          },
          borderRadius: 7,
          color: "text.black",
          "&:hover": {
            color: "text.white",
            bgcolor: "buttonbg.black",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...sx,
        }}
      >
        {backArrow && <WestIcon sx={{ mr: 1 }} />}
        <Typography variant="p" sx={{ p: 0 }}>
          {children}
        </Typography>
      </StyledButton>
    </NavLink>
  );
}

export default BlackButton;
