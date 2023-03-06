import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getProductsIdByUser,
  getRecipesIdByUser,
  updateRecipesIdByUser,
} from "../../services/user-api";
import { whatToCook } from "../../services/what-to-cook-api";
import { useAuth } from "../auth/Auth";
import {
  BoxBgBlue,
  BoxBgWhite,
  StyledContainer,
} from "../custom/customComponents";
import SearchBlock from "../custom/SearchBlock";
import WhatToCook from "./WhatToCook";

function WhatToCookPage() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousRecipesId, setPreviousRecipesId] = useState([]);
  const [newRecipesId, setNewRecipesId] = useState([]);

  const { token } = useAuth();

  const { data: userProductsId, isFetched: isFetchedUserProductsId } = useQuery(
    {
      queryKey: ["getProductsIdByUser", token?.user?.id],
      queryFn: getProductsIdByUser,
      enabled: Boolean(token),
    }
  );

  const {
    data: availableRecipes,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ["whatToCook", userProductsId],
    queryFn: whatToCook,
    enabled: isFetchedUserProductsId,
  });

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

  // зберігаємо актуальні рецепти користувача
  useEffect(() => {
    if (isFetched) {
      setPreviousRecipesId(availableRecipes);
    }
  }, [isFetched, isFetching]);
  // не впевнений як, але isFetchingUserRecipesId покращує обновлення кнопок

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
    <BoxBgWhite infinityScroll={false}>
      <StyledContainer paddingY={true}>
        <SearchBlock component="WhatToCook" />
      </StyledContainer>
      <BoxBgBlue infinityScroll={false}>
        <StyledContainer paddingY={true} sx={{ color: "text.black" }}>
          <Grid
            container
            sx={{
              width: "100%",
              minHeight: "100%",
            }}
          >
            <WhatToCook
              recipes={availableRecipes}
              isFetched={isFetched}
              userRecipesId={previousRecipesId}
              setNewRecipesId={setNewRecipesId}
              setIsUpdate={setIsUpdate}
            />
          </Grid>
        </StyledContainer>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default WhatToCookPage;
