import { Box, CircularProgress, Grid, Grow, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import GridSkeleton from "../components/custom/GridSkeleton";
import {
  StyledContainer,
  StyledContainerWithPadding,
} from "../components/custom/customComponents";
import RecipesCard from "../components/RecipesCard";
import Search from "../components/Search";
import { getAllRecipes } from "../services/recipes-api";
import NorthIcon from "@mui/icons-material/North";

function RecipesPage() {
  const [scroll, setScroll] = useState(0.0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (
      window.scrollY >= document.body.scrollHeight - window.innerHeight - 450 && // скрол знизу
      hasNextPage && // наступна група даних існує
      !isFetchingNextPage && // наступна група даних зараз не загружається
      data?.pages[data?.pages.length - 1]?.recipes?.data.length !== 0 // якщо повертаємий масив пустий, то даних більше немає
    ) {
      fetchNextPage();
    }
  }, [scroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("AllRecipes", getAllRecipes, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });

  return (
    <Box bgcolor="bg.white" sx={{ height: "100%" }}>
      <StyledContainerWithPadding>
        <Search />
      </StyledContainerWithPadding>
      <Box
        bgcolor="bg.blue"
        sx={{
          minHeight: "100vh",
          mx: { xs: 2, sm: 3 },
          borderRadius: "28px 28px 0px 0px",
        }}
      >
        <StyledContainerWithPadding sx={{ position: "relative" }}>
          <Grid container spacing={4}>
            {status === "loading" ? (
              <GridSkeleton size={12} />
            ) : status === "error" ? (
              <p>Ошибка: {error}</p>
            ) : (
              <>
                {data.pages.map((group, i) => (
                  <React.Fragment key={i}>
                    {group.recipes.data.map((data, i) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={`${data.id}_${data.name}`}
                      >
                        <RecipesCard name={data?.name} url={data?.url} />
                      </Grid>
                    ))}
                  </React.Fragment>
                ))}
              </>
            )}
          </Grid>
          {isFetchingNextPage && (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
              <CircularProgress sx={{ color: "text.grey" }} />
            </Box>
          )}
        </StyledContainerWithPadding>
        <StyledContainer
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Grow in={scroll > 300} timeout={500}>
            <IconButton
              onClick={scrollToTop}
              sx={{
                borderRadius: 5,
                border: "4px solid #000000",
                color: "text.black",
                position: "fixed",
                bottom: { xs: 65, sm: 90, md: 100, lg: 110 },
                "&:hover": {
                  color: "text.white",
                  bgcolor: "buttonbg.black",
                },
              }}
            >
              <NorthIcon fontSize="large" />
            </IconButton>
          </Grow>
        </StyledContainer>
      </Box>
    </Box>
  );
}

export default RecipesPage;
