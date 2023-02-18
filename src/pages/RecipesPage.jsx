import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { StyledContainerWithPadding } from "../components/custom/customComponents";
import GreyButton from "../components/custom/GreyButton";
import RecipesCard from "../components/RecipesCard";
import Search from "../components/Search";
import { getAllRecipes } from "../services/recipes-api";

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
      window.scrollY >= document.body.scrollHeight - window.innerHeight - 450 &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [scroll]);

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
        <StyledContainerWithPadding>
          {status === "loading" ? (
            <p>Загрузка...</p>
          ) : status === "error" ? (
            <p>Ошибка: {error}</p>
          ) : (
            <>
              <Grid container spacing={4}>
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
              </Grid>

              {data.pages[data.pages.length - 1].recipes.data.length === 0 ? (
                <GreyButton>123456</GreyButton>
              ) : (
                <></>
              )}
            </>
          )}

          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Загрузка дополнительных данных..."
                : hasNextPage
                ? "Загрузить еще"
                : "Больше нечего загружать"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage ? "Выполнение запроса..." : null}
          </div>
        </StyledContainerWithPadding>
      </Box>
    </Box>
  );
}

export default RecipesPage;
