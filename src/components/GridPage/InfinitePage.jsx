import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getAllProducts, searchProducts } from "../../services/products-api";
import {
  getAllRecipes,
  getRecipesByCategory,
  searchRecipes,
} from "../../services/recipes-api";
import InfiniteGrid from "./InfiniteGrid";

export default React.memo(function InfinitePage({
  component,
  searchValue,
  category,
}) {
  const [fetchNextData, setFetchNextData] = useState(false);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      450
    ) {
      setFetchNextData(true);
    } else setFetchNextData(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  //* useQuery
  // component Recipes
  const {
    data: allRecipes,
    fetchNextPage: fetchNextPageAllRecipes,
    isFetchingNextPage: isFetchingNextPageAllRecipes,
    isFetching: isFetchingAllRecipes,
    isFetched: isFetchedAllRecipes,
  } = useInfiniteQuery("AllRecipes", getAllRecipes, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
    enabled: Boolean(component === "recipes"),
  });

  const {
    data: recipesByName,
    fetchNextPage: fetchNextPageRecipesByName,
    isFetchingNextPage: isFetchingNextPageRecipesByName,
    isFetching: isFetchingRecipesByName,
    isFetched: isFetchedRecipesByName,
  } = useInfiniteQuery(["searchRecipes", `${searchValue}`], searchRecipes, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
    enabled: Boolean(component === "recipes"),
  });

  const {
    data: recipesByCategory,
    fetchNextPage: fetchNextPageRecipesByCategory,
    isFetchingNextPage: isFetchingNextPageRecipesByCategory,
    isFetching: isFetchingRecipesByCategory,
    isFetched: isFetchedRecipesByCategory,
  } = useInfiniteQuery(
    ["getRecipesByCategory", `${category}`],
    getRecipesByCategory,
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.nextPage;
      },
      enabled: Boolean(component === "recipes"),
    }
  );

  // component Products
  const {
    data: allProducts,
    fetchNextPage: fetchNextPageAllProducts,
    isFetchingNextPage: isFetchingNextPageAllProducts,
    isFetching: isFetchingAllProducts,
    isFetched: isFetchedAllProducts,
  } = useInfiniteQuery("AllProducts", getAllProducts, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
    enabled: Boolean(component === "products"),
  });

  const {
    data: productsByName,
    fetchNextPage: fetchNextPageProductsByName,
    isFetchingNextPage: isFetchingNextPageProductsByName,
    isFetching: isFetchingProductsByName,
    isFetched: isFetchedProductsByName,
  } = useInfiniteQuery(["searchProducts", `${searchValue}`], searchProducts, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
    enabled: Boolean(component === "products"),
  });

  // useEffect(() => {
  //   setFetchNextData(false);
  // }, [document.body.scrollHeight]);
  // Провірка чи потрібна нова загрузка даних для infinite scroll
  useEffect(() => {
    if (!fetchNextData) {
      // якщо непотрібно загружати нові дані
      return undefined;
    }
    if (component === "recipes") {
      if (
        // All
        searchValue === "" && // непотрібно загружати нові дані, якщо ми шукаємо по назві
        category === false && // непотрібно загружати нові дані, якщо ми шукаємо по категорії
        !isFetchingNextPageAllRecipes && // наступна група даних зараз не загружається
        allRecipes?.pages[allRecipes?.pages?.length - 1]?.data?.length !== 0 && // якщо повертаємий масив пустий, то даних більше немає
        allRecipes?.pages[0]?.data // якщо навіть перший елемент не загрузився, то не повторювати запроси
      ) {
        fetchNextPageAllRecipes();
        // setFetchNextData(false);
      } else if (
        // By Name
        searchValue !== "" && // зашружати тільки тоді коли щось вводиться
        !isFetchingNextPageRecipesByName && // наступна група даних зараз не загружається
        recipesByName?.pages[recipesByName?.pages?.length - 1]?.data?.length !==
          0 && // якщо повертаємий масив пустий, то даних більше немає
        recipesByName?.pages[0]?.data // якщо навіть перший елемент не загрузився, то не повторювати запроси
      ) {
        fetchNextPageRecipesByName();
        // setFetchNextData(false);
      } else if (
        // By Category
        searchValue === "" && // зашружати тільки тоді коли щось вводиться
        !isFetchingNextPageRecipesByCategory && // наступна група даних зараз не загружається
        recipesByCategory?.pages[recipesByCategory?.pages?.length - 1]?.data
          ?.length !== 0 && // якщо повертаємий масив пустий, то даних більше немає
        recipesByCategory?.pages[0]?.data // якщо навіть перший елемент не загрузився, то не повторювати запроси
      ) {
        fetchNextPageRecipesByCategory();
        // setFetchNextData(false);
      }
    } else if (component === "products") {
      if (
        // All
        searchValue === "" && // непотрібно загружати нові дані, якщо ми шукаємо по назві
        !isFetchingNextPageAllProducts && // наступна група даних зараз не загружається
        allProducts?.pages[allProducts?.pages?.length - 1]?.data?.length !==
          0 && // якщо повертаємий масив пустий, то даних більше немає
        allProducts?.pages[0]?.data // якщо навіть перший елемент не загрузився, то не повторювати запроси
      ) {
        fetchNextPageAllProducts();
        // setFetchNextData(false);
      }
      if (
        // By Name
        searchValue !== "" && // зашружати тільки тоді коли щось вводиться
        !isFetchingNextPageProductsByName && // наступна група даних зараз не загружається
        productsByName?.pages[productsByName?.pages?.length - 1]?.data
          ?.length !== 0 && // якщо повертаємий масив пустий, то даних більше немає
        productsByName?.pages[0]?.data // якщо навіть перший елемент не загрузився, то не повторювати запроси
      ) {
        fetchNextPageProductsByName();
        // setFetchNextData(false);
      }
    }
  }, [fetchNextData]);
  return (
    <>
      {component === "recipes" && (
        <>
          {searchValue ? (
            <InfiniteGrid
              items={recipesByName}
              isFetchingNextPage={isFetchingNextPageRecipesByName}
              isFetched={isFetchedRecipesByName}
              isFetching={isFetchingRecipesByName}
              component={component}
            />
          ) : category ? (
            <InfiniteGrid
              items={recipesByCategory}
              isFetchingNextPage={isFetchingNextPageRecipesByCategory}
              isFetched={isFetchedRecipesByCategory}
              isFetching={isFetchingRecipesByCategory}
              component={component}
            />
          ) : (
            <InfiniteGrid
              items={allRecipes}
              isFetchingNextPage={isFetchingNextPageAllRecipes}
              isFetched={isFetchedAllRecipes}
              isFetching={isFetchingAllRecipes}
              component={component}
            />
          )}
        </>
      )}
      {component === "products" && (
        <>
          {searchValue ? (
            <InfiniteGrid
              items={productsByName}
              isFetchingNextPage={isFetchingNextPageProductsByName}
              isFetched={isFetchedProductsByName}
              isFetching={isFetchingProductsByName}
              component={component}
            />
          ) : (
            <InfiniteGrid
              items={allProducts}
              isFetchingNextPage={isFetchingNextPageAllProducts}
              isFetched={isFetchedAllProducts}
              isFetching={isFetchingAllProducts}
              component={component}
            />
          )}
        </>
      )}
      {/* loading circle */}
      {(isFetchingNextPageAllRecipes ||
        isFetchingNextPageRecipesByName ||
        isFetchingNextPageRecipesByCategory ||
        isFetchingNextPageAllProducts ||
        isFetchingNextPageProductsByName) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 5,
            width: "100%",
          }}
        >
          <CircularProgress sx={{ color: "text.grey" }} />
        </Box>
      )}
    </>
  );
});
