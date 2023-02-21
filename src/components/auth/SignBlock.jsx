import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { StyledButton, StyledContainer } from "../custom/customComponents";

function SignBlock({ bgImage = "", handleSubmit }) {
  const location = useLocation();
  const sign = location.pathname.split("-").pop();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <StyledContainer
        sx={{
          height: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            maxWidth: "500px",
            bgcolor: "bg.white",
            p: { xs: 4, md: 5, lg: 6 },
            textAlign: "center",
            borderRadius: 7,
            boxShadow: 3,
          }}
        >
          <Typography variant="h2" sx={{ color: "text.black" }}>
            {sign === "in" ? "welcome" : sign === "up" ? "sign up" : ""}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              sx: {
                color: "text.black",
                fontSize: (theme) => theme.typography.p.fontSize,
                fontWeight: (theme) => theme.typography.p.fontWeight,
                borderRadius: 7,
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: (theme) => theme.typography.p.fontSize,
                fontWeight: (theme) => theme.typography.p.fontWeight,
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              sx: {
                color: "text.black",
                fontSize: (theme) => theme.typography.p.fontSize,
                fontWeight: (theme) => theme.typography.p.fontWeight,
                borderRadius: 7,
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: (theme) => theme.typography.p.fontSize,
                fontWeight: (theme) => theme.typography.p.fontWeight,
              },
            }}
          />
          <StyledButton
            type="submit"
            fullWidth
            sx={{
              mt: { xs: 3, md: 4 },
              mb: { xs: 3, sm: 4, md: 5 },
              borderRadius: 7,
              bgcolor: "buttonbg.white",
              color: "text.grey",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "buttonbg.whiteBlue",
                color: "text.black",
              },
            }}
          >
            <Typography variant="p">sign in</Typography>
          </StyledButton>
          <Box
            sx={{ display: sign === "in" || sign === "up" ? "block" : "none" }}
          >
            <Typography variant="p" sx={{ color: "text.grey" }}>
              {sign === "in"
                ? "don't have an account?"
                : sign === "up"
                ? "already have an account?"
                : ""}{" "}
            </Typography>
            <NavLink
              to={sign === "in" ? "/sign-up" : sign === "up" ? "/sign-in" : ""}
            >
              <Typography
                variant="p"
                sx={{
                  fontWeight: 600,
                  color: "text.grey",
                  "&:hover": {
                    color: "text.black",
                  },
                }}
              >
                {sign === "in" ? "sign up" : sign === "up" ? "sign in" : ""}
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  );
}

export default SignBlock;
