import {
  AppBar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { StyledButton, StyledContainer } from "../custom/customComponents";

const navigation = [
  { name: "home", link: "/" },
  { name: "recipes", link: "/recipes" },
  { name: "products", link: "/products" },
];

function Header() {
  const [activeNav, setActiveNav] = useState(navigation[0].name);
  const [isDrawer, setIsDrawer] = useState(false);

  const handleNavClick = (item) => {
    setActiveNav(item);
  };

  const handleDrawerOpen = () => {
    setIsDrawer(true);
  };

  const handleDrawerClose = () => {
    setIsDrawer(false);
  };

  return (
    <Box
      position="static"
      component="header"
      bgcolor="bg.main"
      sx={{
        py: 2,
        position: "relative",
        boxShadow: 0,
      }}
    >
      <StyledContainer
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Burger Menu */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            flexBasic: "33.33%",
            flexGrow: 1,
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="end"
            size="medium"
            onClick={handleDrawerOpen}
          >
            <MenuIcon
              style={{ color: "text.black" }}
              sx={{
                fontSize: "clamp(25px, calc(25px + 4vw), 45px)",
                color: "text.black",
              }}
            />
          </IconButton>

          <Drawer
            open={isDrawer}
            onClose={handleDrawerClose}
            PaperProps={{
              sx: { width: "300px" },
            }}
          >
            <List sx={{ p: 0, m: 5 }}>
              {navigation.map((nav) => (
                <Box key={nav.name} onClick={handleDrawerClose}>
                  <NavLink
                    to={nav.link}
                    style={{ textDecoration: "none" }}
                    onClick={() => handleNavClick(nav.name)}
                  >
                    <ListItemButton
                      sx={{
                        color: "text.grey",
                        borderRadius: 3,
                        textDecoration:
                          activeNav === nav.name ? "underline" : "none",
                        fontSize: (theme) =>
                          theme.typography.navDrawer.fontSize,
                        fontWeight: (theme) =>
                          theme.typography.navDrawer.fontWeight,
                        px: 2,
                        "&:hover": { color: "text.white", bgcolor: "bg.dark" },
                      }}
                    >
                      {/* <Typography variant="navDrawer">{nav.name}</Typography> */}
                      {nav.name}
                    </ListItemButton>
                  </NavLink>
                  <Divider />
                </Box>
              ))}
            </List>
          </Drawer>
        </Box>

        {/* logo */}
        <Typography
          variant="logo"
          sx={{
            flexBasis: "33.33%",
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            color: "text.black",
          }}
        >
          LC
        </Typography>

        {/* large menu */}
        <Box
          sx={{
            flexBasis: "33.33%",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            gap: "0px 16px",
          }}
        >
          {navigation.map((nav) => (
            <NavLink
              key={nav.name}
              to={nav.link}
              onClick={() => handleNavClick(nav.name)}
            >
              <StyledButton
                sx={{
                  color: "text.grey",
                  borderRadius: 3,
                  px: 2,
                  textDecoration: activeNav === nav.name ? "underline" : "none",
                  "&:hover": {
                    color: "text.white",
                    bgcolor: "buttonbg.grey",
                  },
                }}
              >
                <Typography variant="p">{nav.name}</Typography>
              </StyledButton>
            </NavLink>
          ))}
        </Box>

        {/* auth */}
        <Box
          variant="p"
          sx={{
            flexBasis: "33.33%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <NavLink to="/sign-in">
            <StyledButton
              onClick={() => handleNavClick("sign in")}
              sx={{
                color: "text.grey",
                borderRadius: 3,
                px: 2,
                "&:hover": {
                  color: "text.white",
                  bgcolor: "buttonbg.grey",
                },
              }}
            >
              <Typography variant="p">sign in</Typography>
            </StyledButton>
          </NavLink>
        </Box>
      </StyledContainer>
    </Box>
  );
}

export default Header;
