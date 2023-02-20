import { Box, Button, Container, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) =>
  theme.unstable_sx({
    textTransform: "none",
  })
);

// without py
export const StyledContainer = styled(Container)(({ theme }) =>
  theme.unstable_sx({
    maxWidth: { xl: "min(calc(100vw - 380px), 1540px)" },
  })
);

// with py
export const StyledContainerWithPadding = styled(StyledContainer)(({ theme }) =>
  theme.unstable_sx({
    py: { xs: 3, sm: "clamp(16px, calc(16px + 1.8vw), 40px)" },
  })
);

// white background
export function BoxBgWhite({
  paddingTop = false, // якщо є елемент без голубого фона, додатковий відступ не потрібен
  infinityScroll = true,
  children,
}) {
  return (
    <Box
      bgcolor="bg.white"
      sx={{
        height: "100%",
        pt: paddingTop ? { xs: 2, sm: 3 } : 0,
        pb: infinityScroll ? 0 : { xs: 2, sm: 3 },
      }}
    >
      {children}
    </Box>
  );
}

// blue background with borderRadius
export function BoxBgBlue({ infinityScroll = true, children }) {
  return (
    <Box
      bgcolor="bg.blue"
      sx={{
        minHeight: "100vh",
        mx: { xs: 2, sm: 3 },
        borderRadius: infinityScroll ? "28px 28px 0px 0px" : "28px", // якщо відсутній infinite scroll знизу повинено бути закруглення
      }}
    >
      {children}
    </Box>
  );
}
