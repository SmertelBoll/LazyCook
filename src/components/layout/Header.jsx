import { AppBar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { StyledButton, StyledContainer } from "../custom/customComponents";

const navigation = [
  { name: "home", link: "/" },
  { name: "recipes", link: "/recipes" },
  { name: "products", link: "/products" },
];

function Header() {
  const [activeMenu, setActiveMenu] = useState(navigation[0].name);

  return (
    <AppBar sx={{ bgcolor: "bg.main" }}>
      <StyledContainer
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* logo */}
        <Typography
          variant="logo"
          sx={{
            flexBasis: "33.33%",
            display: "flex",
            justifyContent: "flex-start",
            color: "text.black",
          }}
        >
          LC
        </Typography>

        {/* large menu */}
        <Box
          sx={{
            flexBasis: "33.33%",
            display: "flex",
            justifyContent: "center",
            gap: "0px 16px",
          }}
        >
          {navigation.map((nav) => (
            <NavLink key={nav.name} to={nav.link}>
              <StyledButton>
                <Typography variant="h3">{nav.name}</Typography>
              </StyledButton>
            </NavLink>
          ))}
        </Box>

        {/* auth */}
        <Box
          variant="h3"
          sx={{
            flexBasis: "33.33%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <NavLink>
            <StyledButton>
              <Typography variant="h3">sing in</Typography>
            </StyledButton>
          </NavLink>
        </Box>
      </StyledContainer>
    </AppBar>
  );
}

export default Header;
