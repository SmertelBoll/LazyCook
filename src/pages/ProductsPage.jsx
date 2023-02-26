import React, { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getAllProducts, searchProducts } from "../services/products-api";
import debounce from "lodash.debounce";
import Products from "../components/Products/Products";
import NorthIcon from "@mui/icons-material/North";
import {
  BoxBgBlue,
  BoxBgWhite,
  StyledContainer,
} from "../components/custom/customComponents";
import SearchBlock from "../components/custom/SearchBlock";
import { Box, CircularProgress, Grid, Grow, IconButton } from "@mui/material";

function ProductsPage() {
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
      allProducts?.pages[allProducts?.pages?.length - 1]?.data?.length !== 0 && // якщо повертаємий масив пустий, то даних більше немає
      allProducts?.pages[0]?.data // якщо навіть перший елемент не загрузився, то не повторювати запроси
    ) {
      fetchNextPageAll();
    }
    if (
      // By Name
      searchText !== "" && // зашружати тільки тоді коли щось вводиться
      window.scrollY >= document.body.scrollHeight - window.innerHeight - 450 && // скрол знизу
      !isFetchingNextPageByName && // наступна група даних зараз не загружається
      productsByName?.pages[productsByName?.pages?.length - 1]?.data?.length !==
        0 && // якщо повертаємий масив пустий, то даних більше немає
      productsByName?.pages[0]?.data // якщо навіть перший елемент не загрузився, то не повторювати запроси
    ) {
      fetchNextPageByName();
    }
  }, [scroll]);

  // прокрутна вверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const {
    data: productsByName,
    fetchNextPage: fetchNextPageByName,
    isFetchingNextPage: isFetchingNextPageByName,
    isFetching: isFetchingByName,
    isFetched: isFetchedByName,
  } = useInfiniteQuery(["searchProducts", `${searchValue}`], searchProducts, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });

  const {
    data: allProducts,
    fetchNextPage: fetchNextPageAll,
    isFetchingNextPage: isFetchingNextPageAll,
    isFetching: isFetchingAll,
    isFetched: isFetchedAll,
  } = useInfiniteQuery("AllProducts", getAllProducts, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });

  return (
    <BoxBgWhite>
      {/* searchBlock */}
      <StyledContainer paddingY={true}>
        <SearchBlock
          searchText={searchText}
          onChangeInput={onChangeInput}
          component="Products"
        />
      </StyledContainer>

      <BoxBgBlue>
        {/* Grid */}
        <StyledContainer paddingY={true}>
          <Grid
            container
            sx={{
              width: "100%",
              minHeight: "100%",
            }}
          >
            {searchValue ? (
              <Products
                products={productsByName}
                isFetchingNextPage={isFetchingNextPageByName}
                isFetched={isFetchedByName}
                isFetching={isFetchingByName}
              />
            ) : (
              <Products
                products={allProducts}
                isFetchingNextPage={isFetchingNextPageAll}
                isFetched={isFetchedAll}
                isFetching={isFetchingAll}
              />
            )}
          </Grid>

          {/* loading circle */}
          {(isFetchingNextPageAll || isFetchingNextPageByName) && (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
              <CircularProgress sx={{ color: "text.grey" }} />
            </Box>
          )}
        </StyledContainer>

        {/* scroll to top */}
        <StyledContainer
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Grow in={scroll > 400} timeout={500}>
            <IconButton
              onClick={scrollToTop}
              sx={{
                borderRadius: 5,
                border: {
                  xs: "3px solid #000000",
                  md: "4px solid #000000",
                },
                color: "text.black",
                position: "fixed",
                bottom: { xs: 65, sm: 80, md: 90, lg: 100 },
                "&:hover": {
                  color: "text.white",
                  bgcolor: "buttonbg.black",
                },
              }}
            >
              <NorthIcon fontSize="large" />
            </IconButton>
          </Grow>
        </StyledContainer>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default ProductsPage;
