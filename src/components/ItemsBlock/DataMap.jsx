import { Box, Grid } from "@mui/material";
import React from "react";
import GridSkeleton from "../custom/GridSkeleton";
import RecipesCard from "./ItemCard";
import EmptyData from "./EmptyData";
import { GridItem } from "../custom/customComponents";

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
              {group.data.map((data, i) => (
                <GridItem key={`${data?.name}`}>
                  <RecipesCard data={data} />
                </GridItem>
              ))}
            </React.Fragment>
          ))}
        </>
      ) : (
        <EmptyData isButton={true} />
      )}
    </>
  );
}

export default DataMap;
