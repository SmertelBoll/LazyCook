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
      maxWidth: "calc(100vw - 380px)",
    },
  })
);

// with py
export const StyledContainerWithPadding = styled(StyledContainer)(({ theme }) =>
  theme.unstable_sx({
    py: { xs: 3, sm: "clamp(16px, calc(16px + 1.8vw), 40px)" },
  })
);