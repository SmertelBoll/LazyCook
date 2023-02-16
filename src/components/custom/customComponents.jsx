import { Button, Container, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) =>
  theme.unstable_sx({
    textTransform: "none",
  })
);

// without py
export const StyledContainer = styled(Container)(({ theme }) =>
  theme.unstable_sx({
    "@media (min-width: 1500px)": {
      maxWidth: "calc(100% - 380px)",
    },
  })
);

// with py
export const StyledContainerWithPadding = styled(Container)(({ theme }) =>
  theme.unstable_sx({
    "@media (min-width: 1500px)": {
      maxWidth: "calc(100% - 380px)",
    },
    py: { xs: 2, sm: "clamp(16px, calc(16px + 1vw), 32px)" },
  })
);
