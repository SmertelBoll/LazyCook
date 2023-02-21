import { Box, CircularProgress, Grid, Grow, IconButton } from "@mui/material";
import React from "react";
import NorthIcon from "@mui/icons-material/North";
import { StyledContainer } from "../custom/customComponents";
import { BoxBgWhite, BoxBgBlue } from "../custom/customComponents";

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
    <BoxBgWhite>
      {/* searchBlock */}
      <StyledContainer paddingY={true}>
        <SearchBlock searchText={searchText} onChangeInput={onChangeInput} />
      </StyledContainer>

      <BoxBgBlue>
        {/* Grid */}
        <StyledContainer paddingY={true} sx={{ position: "relative" }}>
          <Grid
            container
            sx={{
              width: "100%",
              minHeight: "100%",
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
        </StyledContainer>

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
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default ItemsBlock;
