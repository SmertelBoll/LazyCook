import { Typography } from "@mui/material";
import React from "react";
import {
  BoxBgBlue,
  BoxBgWhite,
  StyledContainer,
} from "../components/custom/customComponents";

function NotFound() {
  return (
    <BoxBgWhite infinityScroll={false} paddingTop={true}>
      <BoxBgBlue infinityScroll={false}>
        <StyledContainer
          paddingY={true}
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" color="text.black">
            Page not found...
          </Typography>
        </StyledContainer>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default NotFound;
