import { Grid } from "@mui/material";
import React from "react";
import GridSkeleton from "../custom/GridSkeleton";
import RecipesCard from "../Recipes/RecipesCard";
import EmptyData from "./EmptyData";

function DataMap({ recipes, isFetchingNextPage, isFetched, isFetching }) {
  return (
    <>
      {isFetching && !isFetchingNextPage ? ( // загружаються перший раз
        <GridSkeleton size={12} />
      ) : isFetched && // загрузка закінчена
        recipes?.pages[0]?.data && //масив існує
        recipes?.pages[0]?.data?.length !== 0 ? ( // загружено непустий масив
        <>
          {recipes.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((obj, i) => (
                <Grid
                  sx={{ p: 2 }}
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
        <EmptyData boolButton={true} />
      )}
    </>
  );
}

export default DataMap;
