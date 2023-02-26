import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../components/auth/Auth";
import {
  BoxBgBlue,
  BoxBgWhite,
  StyledContainer,
} from "../components/custom/customComponents";
import SearchBlock from "../components/custom/SearchBlock";
import {
  getRecipesByUser,
  getRecipesIdByUser,
  getUserRecipesByCategory,
  searchRecipesByUser,
  updateRecipesIdByUser,
} from "../services/user-api";
import debounce from "lodash.debounce";
import MyRecipes from "../components/MyRecipes/MyRecipes";

function MyRecipesPage() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousRecipesId, setPreviousRecipesId] = useState([]);
  const [newRecipesId, setNewRecipesId] = useState([]);

  const [searchText, setSearchText] = useState(""); // відповідає за відображення тексту в input
  const [searchValue, setSearchValue] = useState(""); // загружається кінцеве значення після debounce для запроса
  const [category, setCategory] = useState(false);

  const { token } = useAuth();

  // робота з пошуком
  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
      setCategory(false);
    }, 500),
    []
  );
  const onChangeInput = (e, empty = false) => {
    if (empty) {
      // затираємо значення
      setSearchText("");
      updateSearchValue("");
    } else {
      setSearchText(e.target.value);
      updateSearchValue(e.target.value);
    }
  };

  // зміна категорії
  useEffect(() => {
    if (category) {
      setSearchText("");
      setSearchValue("");
    }
  }, [category]);

  // загрузка id рецептів конкретного користувача
  const {
    data: userRecipesId,
    isFetching: isFetchingUserRecipesId,
    isFetched: isFetchedUserRecipesId,
  } = useQuery({
    queryKey: ["getRecipesIdByUser", token?.user?.id],
    queryFn: getRecipesIdByUser,
    enabled: Boolean(token),
    staleTime: 0,
  });

  // зберігаємо актуальні рецепти користувача
  useEffect(() => {
    if (isFetchedUserRecipesId) {
      setPreviousRecipesId(userRecipesId);
    }
  }, [isFetchedUserRecipesId, isFetchingUserRecipesId]);
  // не впевнений як, але isFetchingUserRecipesId покращує обновлення кнопок

  // загрузка списку рецепту
  const { data: userRecipes, isFetched: isFetchedUserRecipes } = useQuery({
    queryKey: ["getRecipesByUser", userRecipesId],
    queryFn: getRecipesByUser,
    enabled: isFetchedUserRecipesId,
    staleTime: 0,
  });

  // загрузка продуктів по пошуку
  const { data: searchUserRecipes, isFetched: isFetchedSearchUserRecipes } =
    useQuery({
      queryKey: ["searchRecipesByUser", userRecipesId, `${searchValue}`],
      queryFn: searchRecipesByUser,
      enabled: isFetchedUserRecipesId,
      staleTime: 0,
    });

  // загрузка продуктів по категоріям
  const {
    data: userRecipesByCategory,
    isFetched: isFetchedUserRecipesByCategory,
  } = useQuery({
    queryKey: ["getUserRecipesByCategory", userRecipesId, `${category}`],
    queryFn: getUserRecipesByCategory,
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
    <BoxBgWhite infinityScroll={false}>
      <StyledContainer paddingY={true}>
        <SearchBlock
          searchText={searchText}
          onChangeInput={onChangeInput}
          component="MyRecipes"
          category={category}
          setCategory={setCategory}
        />
      </StyledContainer>
      <BoxBgBlue infinityScroll={false}>
        <StyledContainer paddingY={true}>
          {/* Grid */}
          <Grid
            container
            sx={{
              width: "100%",
              minHeight: "100%",
            }}
          >
            {searchValue ? (
              <MyRecipes
                recipes={searchUserRecipes}
                isFetched={isFetchedSearchUserRecipes}
                userRecipesId={previousRecipesId}
                setNewRecipesId={setNewRecipesId}
                setIsUpdate={setIsUpdate}
              />
            ) : category ? (
              <MyRecipes
                recipes={userRecipesByCategory}
                isFetched={isFetchedUserRecipesByCategory}
                userRecipesId={previousRecipesId}
                setNewRecipesId={setNewRecipesId}
                setIsUpdate={setIsUpdate}
              />
            ) : (
              <MyRecipes
                recipes={userRecipes}
                isFetched={isFetchedUserRecipes}
                userRecipesId={previousRecipesId}
                setNewRecipesId={setNewRecipesId}
                setIsUpdate={setIsUpdate}
              />
            )}
          </Grid>
        </StyledContainer>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default MyRecipesPage;
