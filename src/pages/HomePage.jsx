import React from "react";
import { Box, Typography } from "@mui/material";
import {
  StyledButton,
  StyledContainer,
} from "../components/custom/customComponents";
import { NavLink } from "react-router-dom";
import BlackButton from "../components/custom/BlackButton";
import { useAuth } from "../components/auth/Auth";
import { alreadyRegisteredAlert } from "../services/alerts";

const bgImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/bg-home.png";
const noteImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/notebook-features.png";

function HomePage() {
  const refScroll = React.createRef();
  const scrollNext = () => {
    refScroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const { token } = useAuth();

  const handleClick = () => {
    if (token) {
      alreadyRegisteredAlert();
    }
  };

  return (
    <>
      {/* first block */}
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <StyledContainer
          paddingY={true}
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: { xs: 4, sm: "auto" },
          }}
        >
          <Box
            sx={{
              maxWidth: "max(667px, 20vw)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h1"
              sx={{ color: "text.black", mb: 2 }}
            >
              LazyCook
            </Typography>

            <Typography
              variant="p"
              sx={{ color: "text.black", mb: { xs: 5, md: 6 } }}
            >
              Find out what to cook at home when your fridge is empty
            </Typography>
            <BlackButton onClick={scrollNext}>see more</BlackButton>
          </Box>
        </StyledContainer>
      </Box>

      {/* second block */}
      <Box
        ref={refScroll}
        sx={{
          minHeight: { xs: "100%", sm: "100vh" },
          background: (theme) => theme.palette.gradient.bgblue,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component={"img"}
          src={noteImage}
          sx={{
            position: "absolute",
            left: 0,
            bottom: 0,
            zIndex: 0,
            display: { xs: "none", lg: "block" },
            maxWidth: { lg: "30vw", xl: "50vw" },
            maxHeight: "100vh",
            aspectRatio: "1",
          }}
        />
        <StyledContainer
          paddingY={true}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ flexBasis: { xs: "100%", lg: "75%", xl: "50%" }, zIndex: 10 }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{ color: "text.black", mb: 4 }}
            >
              our features
            </Typography>
            <Typography variant="p" component="p" sx={{ color: "text.black" }}>
              Every day we ask ourselves the question: what to cook today. We
              will help you to solve it. Write down what products you have in
              stock and get a list of dishes that you can prepare right now!
            </Typography>
            <br />
            <Typography variant="p" component="p" sx={{ color: "text.black" }}>
              If you want to cook something specific, you can find many recipes
              with us and we will tell you exactly what you need for this.
            </Typography>
            <NavLink to={token ? "/" : "/log-in"}>
              <StyledButton
                onClick={handleClick}
                sx={{
                  mt: 4,
                  px: 5,
                  borderRadius: 7,
                  bgcolor: "buttonbg.whiteGrey",
                  boxShadow: 2,
                  "&:hover": {
                    bgcolor: "buttonbg.whiteBlue",
                  },
                }}
              >
                <Typography variant="p" sx={{ color: "text.black" }}>
                  log in
                </Typography>
              </StyledButton>
            </NavLink>
          </Box>
        </StyledContainer>
      </Box>
    </>
  );
}

export default HomePage;
