import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { StyledButton, StyledContainer } from "../custom/customComponents";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function SignBlock({ bgImage = "", handleSubmit }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const sign = location.pathname.split("-").pop();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            maxWidth: "max(500px, 20vw)",
            bgcolor: "bg.white",
            p: { xs: 4, md: 5, lg: 6 },
            borderRadius: 7,
            boxShadow: 3,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",

              top: { xs: 4, sm: 6, md: 10 },
              left: { xs: -4, sm: -6, md: -10 },
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <StyledButton
              onClick={handleClickOpen}
              sx={{
                color: "text.grey",
                borderRadius: 7,
              }}
            >
              <Typography variant="p" sx={{ pr: 1 }}>
                test account
              </Typography>
              <InfoOutlinedIcon
                sx={{ fontSize: (theme) => theme.typography.p.fontSizeSx }}
              />
            </StyledButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle variant="p" id="alert-dialog-title">
                Test account
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant="p" id="alert-dialog-description">
                  email: sholop.lyubomyr@gmail.com
                </DialogContentText>
                <DialogContentText variant="p" id="alert-dialog-description">
                  password: 111111
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </Box>

          <Typography
            variant="h2"
            sx={{ color: "text.black", width: "100%", textAlign: "center" }}
          >
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
                fontSize: (theme) => theme.typography.p.fontSizeSx,
                fontWeight: (theme) => theme.typography.p.fontWeight,
                borderRadius: 7,
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: (theme) => theme.typography.p.fontSizeSx,
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
                fontSize: (theme) => theme.typography.p.fontSizeSx,
                fontWeight: (theme) => theme.typography.p.fontWeight,
                borderRadius: 7,
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: (theme) => theme.typography.p.fontSizeSx,
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
            <Typography variant="p">
              {sign === "in" ? "log in" : sign === "up" ? "sign up" : ""}
            </Typography>
          </StyledButton>
          <Box
            sx={{
              display: sign === "in" || sign === "up" ? "block" : "none",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography variant="p" sx={{ color: "text.grey" }}>
              {sign === "in"
                ? "don't have an account?"
                : sign === "up"
                ? "already have an account?"
                : ""}{" "}
            </Typography>
            <NavLink
              to={sign === "in" ? "/sign-up" : sign === "up" ? "/log-in" : ""}
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
                {sign === "in" ? "sign up" : sign === "up" ? "log in" : ""}
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  );
}

export default SignBlock;
