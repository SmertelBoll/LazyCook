import React, { useEffect, useState } from "react";
import GridSkeleton from "../custom/GridSkeleton";
import {
  getRecipesIdByUser,
  updateRecipesIdByUser,
} from "../../services/user-api";
import { useQuery } from "react-query";
import EmptyData from "../custom/EmptyData";
import { useAuth } from "../auth/Auth";
import RecipeCard from "./RecipeCard";
import { GridItem } from "../custom/customComponents";

const emptyData = {
  title: "Unfortunately, we could not find any recipes.",
  text: "Try again later",
};

function Recipes({ recipes, isFetchingNextPage, isFetched, isFetching }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousRecipesId, setPreviousRecipesId] = useState([]);
  const [newRecipesId, setNewRecipesId] = useState([]);

  const { token } = useAuth();

  const {
    data: userRecipesId,
    isFetching: isFetchingUserRecipesId,
    isFetched: isFetcheduserRecipesId,
  } = useQuery({
    queryKey: ["getRecipesIdByUser", token?.user?.id],
    queryFn: getRecipesIdByUser,
    enabled: Boolean(token),
    staleTime: 0,
  });

  useEffect(() => {
    if (isFetcheduserRecipesId) {
      setPreviousRecipesId(userRecipesId); // зберігаємо актуальні рецепти користувача
    }
  }, [isFetcheduserRecipesId, isFetchingUserRecipesId]);
  // не впевнений як, але isFetchingUserRecipesId покращує обновлення кнопок

  const { isSuccess: isSuccessUpdate } = useQuery({
    queryKey: ["updateRecipesIdByUser", token?.user?.id, newRecipesId],
    queryFn: updateRecipesIdByUser,
    enabled: isUpdate,
    staleTime: 0,
  });

  useEffect(() => {
    if (isSuccessUpdate) {
      setIsUpdate(false);
      setPreviousRecipesId(newRecipesId);
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
                <GridItem key={`${data?.name}`}>
                  <RecipeCard
                    recipeItem={data}
                    userRecipesId={previousRecipesId}
                    setIsUpdate={setIsUpdate}
                    setNewRecipesId={setNewRecipesId}
                  />
                </GridItem>
              ))}
            </React.Fragment>
          ))}
        </>
      ) : (
        <EmptyData title={emptyData.title} text={emptyData.text} />
      )}
    </>
  );
}

export default Recipes;
