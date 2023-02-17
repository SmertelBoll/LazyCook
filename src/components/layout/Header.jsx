import {
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
import { StyledContainer } from "../custom/customComponents";
import GreyButton from "../custom/GreyButton";

const navigation = [
  { name: "home", link: "/" },
  { name: "recipes", link: "/recipes" },
  { name: "products", link: "/products" },
];

function Header() {
  const [isDrawer, setIsDrawer] = useState(false);

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
        py: { sx: 0, sm: 2 },
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
              sx: { width: { xs: "80vw", sm: "300px" } },
            }}
          >
            <List sx={{ p: 0, m: 4 }}>
              {navigation.map((nav) => (
                <Box key={nav.name} onClick={handleDrawerClose}>
                  <NavLink to={nav.link} style={{ textDecoration: "none" }}>
                    <ListItemButton
                      sx={{
                        color: "text.grey",
                        borderRadius: 3,
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
            <GreyButton link={nav.link} key={nav.name}>
              {nav.name}
            </GreyButton>
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
          <GreyButton link="/sign-in">sign in</GreyButton>
        </Box>
      </StyledContainer>
    </Box>
  );
}

export default Header;
