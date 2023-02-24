import {
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { StyledButton, StyledContainer } from "../custom/customComponents";
import GreyButton from "../custom/GreyButton";
import { useAuth } from "../auth/Auth";
import { SignOutAlert } from "../../services/alerts";

const navigation = [
  { name: "home", link: "/" },
  { name: "recipes", link: "/recipes" },
  { name: "products", link: "/products" },
];

function Header() {
  const [isDrawer, setIsDrawer] = useState(false);
  const [menuItem, setMenuItem] = useState(null);

  const handleDrawerOpen = () => {
    setIsDrawer(true);
  };
  const handleDrawerClose = () => {
    setIsDrawer(false);
  };

  // вихід з акаунта
  const { token, setToken, signOut } = useAuth();
  const navigate = useNavigate();

  const logOutFunc = () => {
    signOut();
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleLogOut = async () => {
    handleCloseMenu();
    SignOutAlert(logOutFunc);
  };

  // меню
  const openMenu = Boolean(menuItem);
  const handleClickMenu = (event) => {
    setMenuItem(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuItem(null);
  };

  return (
    <Box
      position="relative"
      component="header"
      bgcolor="bg.main"
      sx={{
        boxShadow: 0,
        py: { xs: 1, sm: 2 },
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
            sx={{ p: 0 }}
          >
            <MenuIcon
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
                        "&:hover": {
                          color: "text.white",
                          bgcolor: "buttonbg.grey",
                        },
                      }}
                    >
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
          {token ? (
            <Box>
              <GreyButton
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClickMenu}
              >
                {token.user.email.split("@")[0]}
                <AccountCircleIcon sx={{ ml: 1 }} />
              </GreyButton>

              <Menu
                id="basic-menu"
                anchorEl={menuItem}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={handleCloseMenu}
                  sx={{
                    fontSize: (theme) => theme.typography.menuItem.fontSize,
                    fontWeight: (theme) => theme.typography.menuItem.fontWeight,
                  }}
                >
                  <NavLink to="/profile" style={{ color: "inherit" }}>
                    Profile
                  </NavLink>
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: (theme) => theme.typography.menuItem.fontSize,
                    fontWeight: (theme) => theme.typography.menuItem.fontWeight,
                  }}
                  onClick={handleLogOut}
                >
                  Log out
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <GreyButton link="/sign-in">sign in</GreyButton>
          )}
        </Box>
      </StyledContainer>
    </Box>
  );
}

export default Header;
