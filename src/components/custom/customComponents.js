import styled from "@emotion/styled";
import { Button, Container } from "@mui/material";

export const StyledButton = styled(Button)(`
  text-transform: none;
`);

export const StyledContainer = styled(Container)(`
  @media (min-width: 1500px) {
    max-width: calc(100% - 380px)
  }
`);