import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getProductsIdByUser,
  getRecipesIdByUser,
  updateProductsIdByUser,
  updateRecipesIdByUser,
} from "../../services/user-api";
import { useAuth } from "../auth/Auth";
import { GridItem } from "../custom/customComponents";
import EmptyData from "../custom/EmptyData";
import GridSkeleton from "../custom/GridSkeleton";
import ItemCard from "./ItemCard";

const emptyData = {
  recipes: {
    title: "Unfortunately, we could not find any recipes.",
    text: "Try again later",
  },
  products: {
    title: "Unfortunately, we could not find any products.",
    text: "Try again later",
  },
};

export default (function InfiniteGrid({
  items,
  isFetchingNextPage,
  isFetched,
  isFetching,
  component,
}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousItemsId, setPreviousItemsId] = useState([]);
  const [newItemsId, setNewItemsId] = useState([]);

  const { token } = useAuth();

  // id продуктів користувача
  const {
    data: userProductsId,
    isFetching: isFetchingUserProductsId,
    isFetched: isFetchedUserProductsId,
  } = useQuery({
    queryKey: ["getProductsIdByUser", token?.user?.id],
    queryFn: getProductsIdByUser,
    enabled:
      Boolean(token) &&
      Boolean(component === "products" || component === "my-products"),
    staleTime: 0,
  });

  // id рецептів користувача
  const {
    data: userRecipesId,
    isFetching: isFetchingUserRecipesId,
    isFetched: isFetchedUserRecipesId,
  } = useQuery({
    queryKey: ["getRecipesIdByUser", token?.user?.id],
    queryFn: getRecipesIdByUser,
    enabled:
      Boolean(token) &&
      Boolean(component === "my-recipes" || component === "recipes"),
    staleTime: 0,
  });

  useEffect(() => {
    if (
      isFetchedUserProductsId &&
      (component === "products" || component === "my-products")
    ) {
      setPreviousItemsId(userProductsId); // зберігаємо актуальні рецепти користувача
    } else if (
      isFetchedUserRecipesId &&
      (component === "my-recipes" || component === "recipes")
    ) {
      setPreviousItemsId(userRecipesId); // зберігаємо актуальні продукти користувача
    }
  }, [isFetchingUserProductsId, isFetchingUserRecipesId]);

  // Оновлення рецептів користувача
  const { isSuccess: isSuccessUpdateRecipes } = useQuery({
    queryKey: ["updateRecipesIdByUser", token?.user?.id, newItemsId],
    queryFn: updateRecipesIdByUser,
    enabled: isUpdate && Boolean(component === "recipes"),
  });

  // Оновлення продуктів користувача
  const { isSuccess: isSuccessUpdateProducts } = useQuery({
    queryKey: ["updateProductsIdByUser", token?.user?.id, newItemsId],
    queryFn: updateProductsIdByUser,
    enabled: isUpdate && Boolean(component === "products"),
  });

  useEffect(() => {
    if (isSuccessUpdateRecipes || isSuccessUpdateProducts) {
      setIsUpdate(false);
      setPreviousItemsId(newItemsId);
    }
  }, [isSuccessUpdateRecipes, isSuccessUpdateProducts]);

  return (
    <>
      {isFetching && !isFetchingNextPage ? ( // загружаються перший раз
        <GridSkeleton size={12} />
      ) : isFetched && // загрузка закінчена
        items?.pages[0]?.data && //масив існує
        items?.pages[0]?.data?.length !== 0 ? ( // загружено непустий масив
        <>
          {items.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((data, i) => (
                <GridItem key={`${data?.name}`}>
                  <ItemCard
                    item={data}
                    userItemsId={previousItemsId}
                    setIsUpdate={setIsUpdate}
                    setNewItemsId={setNewItemsId}
                    component={component}
                  />
                </GridItem>
              ))}
            </React.Fragment>
          ))}
        </>
      ) : (
        <EmptyData
          title={emptyData[component].title}
          text={emptyData[component].text}
        />
      )}
    </>
  );
});
