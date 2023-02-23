import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../components/auth/Auth";
import {
  BoxBgBlue,
  BoxBgWhite,
  GridItem,
  StyledContainer,
} from "../components/custom/customComponents";
import GridSkeleton from "../components/custom/GridSkeleton";
import EmptyData from "../components/ItemsBlock/EmptyData";
import SearchBlock from "../components/ItemsBlock/SearchBlock";
import MyRecipeCard from "../components/Recipes/MyRecipeCard";
import {
  getRecipesByUser,
  getRecipesIdByUser,
  updateRecipesIdByUser,
} from "../services/user-api";

function MyRecipesPage() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousRecipesId, setPreviousRecipesId] = useState([]);
  const [newRecipesId, setNewRecipesId] = useState([]);

  const { isToken, token } = useAuth();

  // загрузка id рецептів конкретного користувача
  const {
    data: userRecipesId,
    isFetching: isFetchingUserRecipesId,
    isFetched: isFetchedUserRecipesId,
  } = useQuery({
    queryKey: ["getRecipesIdByUser", token?.user?.id],
    queryFn: getRecipesIdByUser,
    enabled: isToken,
    staleTime: 0,
  });

  // зберігаємо актуальні рецепти користувача
  useEffect(() => {
    if (isFetchedUserRecipesId) {
      setPreviousRecipesId(userRecipesId);
    }
  }, [isFetchedUserRecipesId, isFetchingUserRecipesId]);

  // загрузка списку об'єктів рецепту
  const { data: userRecipes, isFetched: isFetchedUserRecipes } = useQuery({
    queryKey: ["getRecipesByUser", userRecipesId],
    queryFn: getRecipesByUser,
    enabled: isFetchedUserRecipesId,
    staleTime: 0,
  });

  // видалення рецепту із збережених
  const { isSuccess: isSuccessUpdate } = useQuery({
    queryKey: ["updateRecipesIdByUser", token?.user?.id, newRecipesId],
    queryFn: updateRecipesIdByUser,
    enabled: isUpdate,
    staleTime: 0,
  });

  // після видалення оновлюємо актуальні рецепти користувача
  useEffect(() => {
    if (isSuccessUpdate) {
      setIsUpdate(false);
      setPreviousRecipesId(newRecipesId);
    }
  }, [isSuccessUpdate]);

  return (
    <BoxBgWhite>
      <StyledContainer paddingY={true}>
        <SearchBlock />
      </StyledContainer>
      <BoxBgBlue>
        <StyledContainer paddingY={true}>
          {/* Grid */}
          <Grid
            container
            sx={{
              width: "100%",
              minHeight: "100%",
            }}
          >
            {isFetchedUserRecipes && userRecipes[0] ? (
              <>
                {userRecipes.map((data) => (
                  <GridItem key={`${data?.name}`}>
                    <MyRecipeCard
                      recipeItem={data}
                      userRecipesId={previousRecipesId}
                      setNewRecipesId={setNewRecipesId}
                      setIsUpdate={setIsUpdate}
                    />
                  </GridItem>
                ))}
              </>
            ) : isFetchedUserRecipes ? (
              <EmptyData />
            ) : (
              <GridSkeleton size={12} />
            )}
          </Grid>
        </StyledContainer>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default MyRecipesPage;
