import { Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { StyledButton } from "./customComponents";

function GreyButton({ link, ...props }) {
  return (
    <NavLink to={link}>
      <StyledButton
        onClick={props?.onClick}
        sx={{
          color: "text.grey",
          borderRadius: 3,
          px: 2,
          py: 0,
          "&:hover": {
            color: "text.white",
            bgcolor: "buttonbg.grey",
          },
        }}
      >
        <Typography variant="p">{props.children}</Typography>
      </StyledButton>
    </NavLink>
  );
}

export default GreyButton;
