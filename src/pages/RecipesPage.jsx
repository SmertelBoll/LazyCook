import React, { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getAllRecipes, searchRecipes } from "../services/recipes-api";
import debounce from "lodash.debounce";
import ItemsBlock from "../components/ItemsBlock/ItemsBlock";

function RecipesPage() {
  const [scroll, setScroll] = useState(0);
  const [searchText, setSearchText] = useState(""); // відповідає за відображення тексту в input
  const [searchValue, setSearchValue] = useState(""); // загружається кінцеве значення після debounce для запроса

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

  // відстежування скролу
  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (
      // All
      searchText === "" && // непотрібно загружати нові дані, якщо ми шукаємо по назві
      window.scrollY >= document.body.scrollHeight - window.innerHeight - 450 && // скрол знизу
      !isFetchingNextPageAll && // наступна група даних зараз не загружається
      allRecipes?.pages[allRecipes?.pages?.length - 1]?.data?.length !== 0 && // якщо повертаємий масив пустий, то даних більше немає
      allRecipes?.pages[0]?.data // якщо навіть перший елемент не загрузився, то не повторювати запроси
    ) {
      fetchNextPageAll();
    }
    if (
      // By Name
      searchText !== "" && // зашружати тільки тоді коли щось вводиться
      window.scrollY >= document.body.scrollHeight - window.innerHeight - 450 && // скрол знизу
      !isFetchingNextPageByName && // наступна група даних зараз не загружається
      recipesByName?.pages[recipesByName?.pages?.length - 1]?.data?.length !==
        0 && // якщо повертаємий масив пустий, то даних більше немає
      recipesByName?.pages[0]?.data // якщо навіть перший елемент не загрузився, то не повторювати запроси
    ) {
      fetchNextPageByName();
    }
  }, [scroll]);

  // прокрутна вверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const {
    data: recipesByName,
    fetchNextPage: fetchNextPageByName,
    isFetchingNextPage: isFetchingNextPageByName,
    isFetching: isFetchingByName,
    isFetched: isFetchedByName,
  } = useInfiniteQuery(["searchRecipes", `${searchValue}`], searchRecipes, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });

  const {
    data: allRecipes,
    fetchNextPage: fetchNextPageAll,
    isFetchingNextPage: isFetchingNextPageAll,
    isFetching: isFetchingAll,
    isFetched: isFetchedAll,
  } = useInfiniteQuery("AllRecipes", getAllRecipes, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });

  return (
    <ItemsBlock
      searchText={searchText}
      onChangeInput={onChangeInput}
      scroll={scroll}
      scrollToTop={scrollToTop}
      searchValue={searchValue}
      isFetchingAll={isFetchingAll}
      isFetchedAll={isFetchedAll}
      allRecipes={allRecipes}
      isFetchingNextPageAll={isFetchingNextPageAll}
      isFetchingByName={isFetchingByName}
      isFetchedByName={isFetchedByName}
      recipesByName={recipesByName}
      isFetchingNextPageByName={isFetchingNextPageByName}
    />
  );
}

export default RecipesPage;
