import React from "react";
import { GridItem } from "../custom/customComponents";
import EmptyData from "../custom/EmptyData";
import GridSkeleton from "../custom/GridSkeleton";
import MyRecipeCard from "./MyRecipeCard";

const emptyData = {
  title: "Unfortunately, we could not find any recipes.",
  text: "Try adding one",
};

function MyRecipes({
  recipes,
  isFetched,
  userRecipesId,
  setNewRecipesId,
  setIsUpdate,
}) {
  return (
    <>
      {isFetched && recipes && recipes[0] ? (
        <>
          {recipes?.map((data) => (
            <GridItem key={`${data?.name}`}>
              <MyRecipeCard
                recipeItem={data}
                userRecipesId={userRecipesId}
                setNewRecipesId={setNewRecipesId}
                setIsUpdate={setIsUpdate}
              />
            </GridItem>
          ))}
        </>
      ) : isFetched && recipes ? (
        <EmptyData title={emptyData.title} text={emptyData.text} />
      ) : (
        <GridSkeleton size={12} />
      )}
    </>
  );
}

export default MyRecipes;
