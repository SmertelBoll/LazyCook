import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { isValidElement, useState } from "react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "home", link: "/" },
  { name: "recipes", link: "/recipes" },
  { name: "products", link: "/products" },
];

function Header() {
  const [activeMenu, setActiveMenu] = useState(navigation[0].name);

  return (
    <Container
      sx={{
        display: "flex",
      }}
    >
      {/* logo */}
      <Typography
        sx={{
          flexBasis: "33.33%",
          display: "flex",
          justifyContent: "flex-start",
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
          gap: "20px",
        }}
      >
        {navigation.map((nav) => (
          <NavLink key={nav.name} to={nav.link}>
            {nav.name}
          </NavLink>
        ))}
      </Box>

      {/* auth */}
      <Box
        sx={{
          flexBasis: "33.33%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <NavLink>sing in</NavLink>
      </Box>
    </Container>
  );
}

export default Header;
