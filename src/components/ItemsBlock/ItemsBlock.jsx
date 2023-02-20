import { Box, CircularProgress, Grid, Grow, IconButton } from "@mui/material";
import React from "react";
import NorthIcon from "@mui/icons-material/North";
import {
  StyledContainer,
  StyledContainerWithPadding,
} from "../custom/customComponents";
import SearchBlock from "./SearchBlock";
import DataMap from "./DataMap";

function ItemsBlock({
  searchText,
  onChangeInput,
  scroll,
  scrollToTop,
  searchValue,
  isFetchingAll,
  isFetchedAll,
  allRecipes,
  isFetchingNextPageAll,
  isFetchingByName,
  isFetchedByName,
  recipesByName,
  isFetchingNextPageByName,
}) {
  return (
    <Box bgcolor="bg.white" sx={{ height: "100%" }}>
      {/* searchBlock */}
      <StyledContainerWithPadding>
        <SearchBlock searchText={searchText} onChangeInput={onChangeInput} />
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
          <Grid
            container
            sx={{
              width: "100%",
              minHeight: "100%",
              // gap: 0,
              // display: "grid",
              // gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {searchValue ? (
              <DataMap
                recipes={recipesByName}
                isFetchingNextPage={isFetchingNextPageByName}
                isFetched={isFetchedByName}
                isFetching={isFetchingByName}
              />
            ) : (
              <DataMap
                recipes={allRecipes}
                isFetchingNextPage={isFetchingNextPageAll}
                isFetched={isFetchedAll}
                isFetching={isFetchingAll}
              />
            )}
          </Grid>

          {/* loading circle */}
          {(isFetchingNextPageAll || isFetchingNextPageByName) && (
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
          <Grow in={scroll > 400} timeout={500}>
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

export default ItemsBlock;
