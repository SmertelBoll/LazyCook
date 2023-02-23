import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import GridSkeleton from "../custom/GridSkeleton";
import { getRecipesByUser, updateRecipesByUser } from "../../services/user-api";
import { useQuery } from "react-query";
import ItemCard from "../ItemsBlock/ItemCard";
import EmptyData from "../ItemsBlock/EmptyData";
import { useAuth } from "../auth/Auth";
import RecipeCard from "./RecipeCard";

function Recipes({ recipes, isFetchingNextPage, isFetched, isFetching }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousRecipes, setPreviousRecipes] = useState([]);
  const [newRecipes, setNewRecipes] = useState([]);
  const [isToken, setIsToken] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    if (token) setIsToken(true);
    else setIsToken(false);
  }, [token]);

  const {
    data: userRecipes,
    isFetching: isFetchingUserRecipes,
    isFetched: isFetchedUserRecipes,
  } = useQuery({
    queryKey: ["getRecipesByUser", token?.user?.id],
    queryFn: getRecipesByUser,
    enabled: isToken,
    staleTime: 0,
  });

  useEffect(() => {
    if (isFetchedUserRecipes) {
      setPreviousRecipes(userRecipes); // зберігаємо актуальні рецепти користувача
    }
  }, [isFetchedUserRecipes, isFetchingUserRecipes]);

  const { isSuccess: isSuccessUpdate } = useQuery({
    queryKey: ["updateRecipesByUser", token?.user?.id, newRecipes],
    queryFn: updateRecipesByUser,
    enabled: isUpdate,
    staleTime: 0,
  });

  useEffect(() => {
    if (isSuccessUpdate) {
      // setIsAdded(!isAdded);
      setIsUpdate(false);
      setPreviousRecipes(newRecipes);
    }
  }, [isSuccessUpdate]);

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
                <Grid
                  sx={{ p: { xs: 1, sm: 2 } }}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={`${data?.name}`}
                >
                  <RecipeCard
                    recipeItem={data}
                    userRecipes={previousRecipes}
                    setIsUpdate={setIsUpdate}
                    setNewRecipes={setNewRecipes}
                  />
                </Grid>
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

export default Recipes;
