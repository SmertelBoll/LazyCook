import { Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { StyledButton } from "./customComponents";

function GreyButton({ link = null, sx = {}, ...props }) {
  return (
    <NavLink to={link}>
      <StyledButton
        onClick={props?.onClick}
        {...props}
        sx={{
          color: "text.grey",
          borderRadius: 3,
          px: { xs: 1, sm: 2 },
          py: 0,
          "&:hover": {
            color: "text.white",
            bgcolor: "buttonbg.grey",
          },
          ...sx,
        }}
      >
        <Typography variant="p" sx={{ display: "flex", alignItems: "center" }}>
          {props.children}
        </Typography>
      </StyledButton>
    </NavLink>
  );
}

export default GreyButton;
