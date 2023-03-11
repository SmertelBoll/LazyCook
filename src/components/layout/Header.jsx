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
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StyledContainer } from "../custom/customComponents";
import GreyButton from "../custom/GreyButton";
import { useAuth } from "../auth/Auth";
import { SignOutAlert } from "../../services/alerts";
import { useQuery } from "react-query";
import { getAvatar, getUserName } from "../../services/user-profile-api";

const CDNURL =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/";

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
  const { token, setToken, signOut, image, userName, setUserName } = useAuth();
  const navigate = useNavigate();

  const logOutFunc = () => {
    signOut();
    setToken(false);
    localStorage.removeItem("token");
    localStorage.removeItem("password");
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

  // аватар
  const {
    data: avatar,
    isFetched: isFetchedAvatar,
    refetch: refetchAvatar,
  } = useQuery({
    queryKey: ["getAvatar", token?.user?.id],
    queryFn: getAvatar,
    enabled: Boolean(token),
  });

  useEffect(() => {
    refetchAvatar();
  }, [image]);

  // username
  const { data: userNameData, isFetched: isFetchedUserName } = useQuery({
    queryKey: ["getUserName", token?.user?.id], // повторяти запрос, коли міняється token
    queryFn: getUserName,
    enabled: Boolean(token),
  });

  useEffect(() => {
    if (isFetchedUserName) setUserName(userNameData);
  }, [isFetchedUserName]);

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
                sx={{
                  pr: { xs: 0, sm: 2 },
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography
                    variant="p"
                    sx={{
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "17vw",
                    }}
                  >
                    {userName ? userName : token.user.email.split("@")[0]}
                  </Typography>
                </Box>
                {avatar && isFetchedAvatar ? (
                  <Avatar
                    src={CDNURL + token?.user?.id + "/" + avatar?.name}
                    sx={{
                      width: "36px",
                      height: "36px",
                      ml: { xs: 0, sm: 1 },
                      bgcolor: "text.grey",
                    }}
                  />
                ) : (
                  <AccountCircleIcon
                    sx={{ ml: { xs: 0, sm: 1 }, fontSize: "36px" }}
                  />
                )}
              </GreyButton>

              <Menu
                id="basic-menu"
                anchorEl={menuItem}
                open={openMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <NavLink to="/profile">
                  <MenuItem
                    onClick={handleCloseMenu}
                    sx={{
                      fontSize: (theme) => theme.typography.menuItem.fontSize,
                      fontWeight: (theme) =>
                        theme.typography.menuItem.fontWeight,
                      color: "text.grey",
                    }}
                  >
                    Profile
                  </MenuItem>
                </NavLink>

                <MenuItem
                  sx={{
                    fontSize: (theme) => theme.typography.menuItem.fontSize,
                    fontWeight: (theme) => theme.typography.menuItem.fontWeight,
                    color: "text.grey",
                  }}
                  onClick={handleLogOut}
                >
                  Log out
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <GreyButton link="/log-in">log in</GreyButton>
          )}
        </Box>
      </StyledContainer>
    </Box>
  );
}

export default Header;
