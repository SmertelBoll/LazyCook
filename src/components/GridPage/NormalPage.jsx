import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getProductsByUser,
  getProductsIdByUser,
  getRecipesByUser,
  getRecipesIdByUser,
  getUserRecipesByCategory,
  searchProductsByUser,
  searchRecipesByUser,
  updateProductsIdByUser,
  updateRecipesIdByUser,
} from "../../services/user-api";
import { whatToCook } from "../../services/what-to-cook-api";
import { useAuth } from "../auth/Auth";
import NormalGrid from "./NormalGrid";

function NormalPage({ component, searchValue, category }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousItemsId, setPreviousItemsId] = useState([]);
  const [newItemsId, setNewItemsId] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    if (component === "my-products" || component === "what-to-cook")
      refetchUserProducts();
    if (component === "my-recipes" || component === "what-to-cook")
      refetchUserRecipes();
  }, [component]);

  // id продуктів користувача
  const {
    data: userProductsId,
    isFetching: isFetchingUserProductsId,
    isFetched: isFetchedUserProductsId,
    refetch: refetchUserProducts,
  } = useQuery({
    queryKey: ["getProductsIdByUser", token?.user?.id],
    queryFn: getProductsIdByUser,
    enabled:
      Boolean(token) &&
      Boolean(component === "my-products" || component === "what-to-cook"),
    staleTime: 0,
  });

  // id рецептів користувача
  const {
    data: userRecipesId,
    isFetching: isFetchingUserRecipesId,
    isFetched: isFetchedUserRecipesId,
    refetch: refetchUserRecipes,
  } = useQuery({
    queryKey: ["getRecipesIdByUser", token?.user?.id],
    queryFn: getRecipesIdByUser,
    enabled:
      Boolean(token) &&
      Boolean(component === "my-recipes" || component === "what-to-cook"),
    staleTime: 0,
  });

  useEffect(() => {
    if (isFetchedUserProductsId && component === "my-products") {
      setPreviousItemsId(userProductsId); // зберігаємо актуальні продукти користувача
    } else if (
      isFetchedUserRecipesId &&
      (component === "my-recipes" || component === "what-to-cook")
    ) {
      setPreviousItemsId(userRecipesId); // зберігаємо актуальні рецепти користувача
    }
  }, [isFetchingUserProductsId, isFetchingUserRecipesId]);

  //* My Recipes
  // загрузка списку рецепту
  const { data: userRecipes, isFetched: isFetchedUserRecipes } = useQuery({
    queryKey: ["getRecipesByUser", userRecipesId],
    queryFn: getRecipesByUser,
    enabled: isFetchedUserRecipesId && Boolean(component === "my-recipes"),
    staleTime: 0,
  });

  // загрузка рецептів по пошуку
  const { data: searchUserRecipes, isFetched: isFetchedSearchUserRecipes } =
    useQuery({
      queryKey: ["searchRecipesByUser", userRecipesId, `${searchValue}`],
      queryFn: searchRecipesByUser,
      enabled: isFetchedUserRecipesId && Boolean(component === "my-recipes"),
      staleTime: 0,
    });

  // загрузка рецептів по категоріям
  const {
    data: userRecipesByCategory,
    isFetched: isFetchedUserRecipesByCategory,
  } = useQuery({
    queryKey: ["getUserRecipesByCategory", userRecipesId, `${category}`],
    queryFn: getUserRecipesByCategory,
    enabled: isFetchedUserRecipesId && Boolean(component === "my-recipes"),
    staleTime: 0,
  });

  //* My Products
  // загрузка списку продуктів
  const { data: userProducts, isFetched: isFetchedUserProducts } = useQuery({
    queryKey: ["getProductsByUser", userProductsId],
    queryFn: getProductsByUser,
    enabled: isFetchedUserProductsId && Boolean(component === "my-products"),
    staleTime: 0,
  });

  // загрузка продуктів по пошуку
  const { data: searchUserProducts, isFetched: isFetchedSearchUserProducts } =
    useQuery({
      queryKey: ["searchProductsByUser", userProductsId, `${searchValue}`],
      queryFn: searchProductsByUser,
      enabled: isFetchedUserProductsId && Boolean(component === "my-products"),
      staleTime: 0,
    });

  //* What To Cook
  const { data: availableRecipes } = useQuery({
    queryKey: ["whatToCook", userProductsId],
    queryFn: whatToCook,
    enabled: isFetchedUserProductsId,
  });

  //* Update
  // Оновлення рецептів користувача
  const { isSuccess: isSuccessUpdateRecipes } = useQuery({
    queryKey: ["updateRecipesIdByUser", token?.user?.id, newItemsId],
    queryFn: updateRecipesIdByUser,
    enabled:
      isUpdate &&
      Boolean(component === "my-recipes" || component === "what-to-cook"),
    staleTime: 0,
  });

  // Оновлення продуктів користувача
  const { isSuccess: isSuccessUpdateProducts } = useQuery({
    queryKey: ["updateProductsIdByUser", token?.user?.id, newItemsId],
    queryFn: updateProductsIdByUser,
    enabled: isUpdate && Boolean(component === "my-products"),
    staleTime: 0,
  });

  useEffect(() => {
    if (isSuccessUpdateRecipes || isSuccessUpdateProducts) {
      setIsUpdate(false);
      setPreviousItemsId(newItemsId);
    }
  }, [isSuccessUpdateRecipes, isSuccessUpdateProducts]);
  return (
    <>
      {component === "my-recipes" && (
        <>
          {searchValue ? (
            <NormalGrid
              items={searchUserRecipes}
              isFetched={isFetchedSearchUserRecipes}
              userItemsId={previousItemsId}
              setNewItemsId={setNewItemsId}
              setIsUpdate={setIsUpdate}
              component={component}
            />
          ) : category ? (
            <NormalGrid
              items={userRecipesByCategory}
              isFetched={isFetchedUserRecipesByCategory}
              userItemsId={previousItemsId}
              setNewItemsId={setNewItemsId}
              setIsUpdate={setIsUpdate}
              component={component}
            />
          ) : (
            <NormalGrid
              items={userRecipes}
              isFetched={isFetchedUserRecipes}
              userItemsId={previousItemsId}
              setNewItemsId={setNewItemsId}
              setIsUpdate={setIsUpdate}
              component={component}
            />
          )}
        </>
      )}
      {component === "my-products" && (
        <>
          {searchValue ? (
            <NormalGrid
              items={searchUserProducts}
              isFetched={isFetchedUserProducts}
              userItemsId={previousItemsId}
              setNewItemsId={setNewItemsId}
              setIsUpdate={setIsUpdate}
              component={component}
            />
          ) : (
            <NormalGrid
              items={userProducts}
              isFetched={isFetchedSearchUserProducts}
              userItemsId={previousItemsId}
              setNewItemsId={setNewItemsId}
              setIsUpdate={setIsUpdate}
              component={component}
            />
          )}
        </>
      )}
      {component === "what-to-cook" && (
        <NormalGrid
          items={availableRecipes}
          isFetched={true}
          userItemsId={previousItemsId}
          setNewItemsId={setNewItemsId}
          setIsUpdate={setIsUpdate}
          component={component}
        />
      )}
    </>
  );
}

export default NormalPage;
