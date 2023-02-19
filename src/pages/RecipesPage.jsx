import {
  Box,
  CircularProgress,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import NorthIcon from "@mui/icons-material/North";
import SearchIcon from "@mui/icons-material/Search";
import { useInfiniteQuery, useQuery } from "react-query";
import GridSkeleton from "../components/custom/GridSkeleton";
import {
  StyledContainer,
  StyledContainerWithPadding,
} from "../components/custom/customComponents";
import RecipesCard from "../components/Recipes/RecipesCard";
import GreyButton from "../components/custom/GreyButton";
import { getAllRecipes, searchRecipes } from "../services/recipes-api";
import debounce from "lodash.debounce";

function RecipesPage() {
  const [scroll, setScroll] = useState(0);
  const [searchText, setSearchText] = useState(""); // відповідає за відображення тексту в input
  const [searchValue, setSearchValue] = useState(""); // загружається кінцеве значення після debounce для запроса

  // робота з пошуком
  const updateSearchValue = useCallback(
    debounce((str) => {
      console.log(str);
      setSearchValue(str);
    }, 500),
    []
  );
  const onChangeInput = (e) => {
    setSearchText(e.target.value);
    updateSearchValue(e.target.value);
  };

  // відстежування скролу
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
      allRecipes?.pages[allRecipes?.pages.length - 1]?.recipes?.data.length !==
        0 && // якщо повертаємий масив пустий, то даних більше немає
      searchText === "" // непотрібно загружати нові дані, якщо ми шукаємо по назві
    ) {
      fetchNextPage();
    }
  }, [scroll]);

  // прокрутна вверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { data: recipesByName, isFetched: isFetchedByName } = useQuery({
    queryKey: ["searchRecipes", searchValue],
    queryFn: searchRecipes,
  });

  const {
    data: allRecipes,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isFetched: isFetchedAll,
  } = useInfiniteQuery("AllRecipes", getAllRecipes, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });

  return (
    <Box bgcolor="bg.white" sx={{ height: "100%" }}>
      {/* searchBlock */}
      <StyledContainerWithPadding>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "auto", sm: "center" },
            justifyContent: { xs: "auto", sm: "space-between" },
            gap: { xs: 2, sm: "none" },
          }}
        >
          <TextField
            variant="standard"
            placeholder="search"
            value={searchText}
            onChange={onChangeInput}
            sx={{ width: { sx: "100%", sm: "40%" }, order: { xs: 2, sm: 1 } }}
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: (theme) => theme.typography.p.fontSize,
                fontWeight: (theme) => theme.typography.p.fontWeight,
                bgcolor: "bg.main",
                color: "text.black",
                boxShadow: 2,
                borderRadius: 7,
                py: 1,
                pl: 3,
                pr: 2,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="large" />
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2 },
              justifyContent: "center",
              order: { xs: 1, sm: 2 },
            }}
          >
            <GreyButton link="/recipes">all recipes</GreyButton>
            <GreyButton link="/recipes/my-recipes">my recipes</GreyButton>
          </Box>
        </Box>
      </StyledContainerWithPadding>

      {/* Grid and scroll */}
      <Box
        bgcolor="bg.blue"
        sx={{
          minHeight: "100vh",
          mx: { xs: 2, sm: 3 },
          borderRadius: "28px 28px 0px 0px",
        }}
      >
        {/* Grid */}
        <StyledContainerWithPadding sx={{ position: "relative" }}>
          <Grid container spacing={4}>
            {!isFetchedAll || !isFetchedByName ? (
              <GridSkeleton size={12} />
            ) : isFetchedAll && searchText === "" ? (
              <>
                {allRecipes.pages.map((group, i) => (
                  <React.Fragment key={i}>
                    {group.recipes.data.map((obj, i) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={`${obj?.id}_${obj?.name}`}
                      >
                        <RecipesCard name={obj?.name} url={obj?.url} />
                      </Grid>
                    ))}
                  </React.Fragment>
                ))}
              </>
            ) : (
              isFetchedByName && (
                <>
                  {recipesByName.data.map((obj, i) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={`${obj?.id}_${obj?.name}`}
                    >
                      <RecipesCard name={obj?.name} url={obj?.url} />
                    </Grid>
                  ))}
                </>
              )
            )}
          </Grid>

          {/* loading circle */}
          {isFetchingNextPage && (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
              <CircularProgress sx={{ color: "text.grey" }} />
            </Box>
          )}
        </StyledContainerWithPadding>

        {/* scroll to top */}
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
                bottom: { xs: 65, sm: 80, md: 90, lg: 100 },
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
