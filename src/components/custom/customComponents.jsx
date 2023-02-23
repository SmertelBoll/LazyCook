import { Box, Button, Container, Grid, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) =>
  theme.unstable_sx({
    textTransform: "none",
  })
);

// without py
export function StyledContainer({ paddingY = false, sx = {}, children }) {
  return (
    <Container
      sx={{
        maxWidth: { xl: "min(calc(100vw - 380px), 1540px)" },
        py: paddingY
          ? { xs: 3, sm: "clamp(16px, calc(16px + 1.8vw), 40px)" }
          : "auto",
        ...sx,
      }}
    >
      {children}
    </Container>
  );
}

// white background
export function BoxBgWhite({
  paddingTop = false, // якщо є елемент без голубого фона, додатковий відступ не потрібен
  infinityScroll = true,
  sx = {},
  children,
}) {
  return (
    <Box
      bgcolor="bg.white"
      sx={{
        height: "100%",
        pt: paddingTop ? { xs: 2, sm: 3 } : 0,
        pb: infinityScroll ? 0 : { xs: 2, sm: 3 },
        ...sx,
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

export function GridItem({ sx = {}, children }) {
  return (
    <Grid sx={{ p: { xs: 1, sm: 2 } }} item xs={12} sm={6} md={4} lg={3}>
      {children}
    </Grid>
  );
}
