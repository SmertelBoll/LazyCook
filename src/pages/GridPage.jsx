import { debounce, Grid, Grow, IconButton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  BoxBgBlue,
  BoxBgWhite,
  StyledContainer,
} from "../components/custom/customComponents";
import SearchBlock from "../components/custom/SearchBlock";
import NorthIcon from "@mui/icons-material/North";
import { useLocation } from "react-router-dom";
import InfinitePage from "../components/GridPage/InfinitePage";
import NormalPage from "../components/GridPage/NormalPage";
// import debounce from "lodash.debounce";

function GridPage() {
  const [searchText, setSearchText] = useState(""); // відповідає за відображення тексту в input
  const [searchValue, setSearchValue] = useState(""); // загружається кінцеве значення після debounce для запроса
  const [category, setCategory] = useState(false);
  const [component, setComponent] = useState(false); // в залежності від сторінки сайту відображення різне
  const [isInfinityScroll, setIsInfinityScroll] = useState(false);
  const [isScrollTopButton, setIsScrollTopButton] = useState(false); // кнопка скролу вверх

  const location = useLocation();

  // встановлення поточного посилання та наявності infinite scroll
  useEffect(() => {
    const currentComponent = location.pathname.split("/").pop();
    setComponent(currentComponent);

    if (currentComponent === "recipes" || currentComponent === "products")
      setIsInfinityScroll(true);
    else setIsInfinityScroll(false);

    setSearchText("");
    setSearchValue("");
    setCategory(false);
  }, [location]);

  // відстежування скролу
  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollTop > 400) setIsScrollTopButton(true);
    else setIsScrollTopButton(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // прокрутна вверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  // зміна категорії -> удаляємо ввід пошуку
  useEffect(() => {
    if (category) {
      setSearchText("");
      setSearchValue("");
    }
  }, [category]);

  return (
    <BoxBgWhite infinityScroll={isInfinityScroll}>
      {/* searchBlock */}
      <StyledContainer paddingY={true}>
        <SearchBlock
          searchText={searchText}
          onChangeInput={onChangeInput}
          category={category}
          setCategory={setCategory}
          component={component}
        />
      </StyledContainer>

      <BoxBgBlue infinityScroll={isInfinityScroll}>
        {/* Grid */}
        <StyledContainer paddingY={true}>
          <Grid
            container
            sx={{
              width: "100%",
              minHeight: "100%",
            }}
          >
            {isInfinityScroll ? (
              <InfinitePage
                component={component}
                searchValue={searchValue}
                category={category}
              />
            ) : (
              <NormalPage
                component={component}
                searchValue={searchValue}
                category={category}
              />
            )}
          </Grid>
        </StyledContainer>

        {/* scroll to top */}
        <StyledContainer
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Grow in={isScrollTopButton} timeout={500}>
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

export default GridPage;
