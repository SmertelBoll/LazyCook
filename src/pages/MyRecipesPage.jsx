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
  searchRecipesByUser,
  updateRecipesIdByUser,
} from "../services/user-api";
import debounce from "lodash.debounce";
import MyRecipes from "../components/MyRecipes/MyRecipes";

const buttonsSearch = [
  {
    name: "all recipes",
    link: "/recipes",
    notAuth: "/recipes",
  },
  {
    name: "my recipes",
    link: "/recipes/my-recipes",
    notAuth: "/sign-in",
  },
];

function MyRecipesPage() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousRecipesId, setPreviousRecipesId] = useState([]);
  const [newRecipesId, setNewRecipesId] = useState([]);

  const [searchText, setSearchText] = useState(""); // відповідає за відображення тексту в input
  const [searchValue, setSearchValue] = useState(""); // загружається кінцеве значення після debounce для запроса

  const { token } = useAuth();

  // робота з пошуком
  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
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
          buttons={buttonsSearch}
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
            ) : (
              <MyRecipes
                recipes={userRecipes}
                isFetched={isFetchedUserRecipes}
                userRecipesId={previousRecipesId}
                setNewRecipesId={setNewRecipesId}
                setIsUpdate={setIsUpdate}
              />
            )}
            {/* {isFetchedUserRecipes && userRecipes[0] ? (
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
              <EmptyData title={emptyData.title} text={emptyData.text} />
            ) : (
              <GridSkeleton size={12} />
            )} */}
          </Grid>
        </StyledContainer>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default MyRecipesPage;
