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
  getProductsByUser,
  getProductsIdByUser,
  searchProductsByUser,
  updateProductsIdByUser,
} from "../services/user-api";
import debounce from "lodash.debounce";
import MyProducts from "../components/MyProducts/MyProducts";

function MyProductsPage() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousProductsId, setPreviousProductsId] = useState([]);
  const [newProductsId, setNewProductsId] = useState([]);

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

  // загрузка id продуктів конкретного користувача
  const {
    data: userProductsId,
    isFetching: isFetchingUserProductsId,
    isFetched: isFetchedUserProductsId,
  } = useQuery({
    queryKey: ["getProductsIdByUser", token?.user?.id],
    queryFn: getProductsIdByUser,
    enabled: Boolean(token),
    staleTime: 0,
  });

  // зберігаємо актуальні продукти користувача
  useEffect(() => {
    if (isFetchedUserProductsId) {
      setPreviousProductsId(userProductsId);
    }
  }, [isFetchedUserProductsId, isFetchingUserProductsId]);
  // не впевнений як, але isFetchingUserProductsId покращує обновлення кнопок

  // загрузка списку продуктів
  const { data: userProducts, isFetched: isFetchedUserProducts } = useQuery({
    queryKey: ["getProductsByUser", userProductsId],
    queryFn: getProductsByUser,
    enabled: isFetchedUserProductsId,
    staleTime: 0,
  });

  // загрузка продуктів по пошуку
  const { data: searchUserProducts, isFetched: isFetchedSearchUserProducts } =
    useQuery({
      queryKey: ["searchProductsByUser", userProductsId, `${searchValue}`],
      queryFn: searchProductsByUser,
      enabled: isFetchedUserProductsId,
      staleTime: 0,
    });

  // видалення продукта із збережених
  const { isSuccess: isSuccessUpdate } = useQuery({
    queryKey: ["updateProductsIdByUser", token?.user?.id, newProductsId],
    queryFn: updateProductsIdByUser,
    enabled: isUpdate,
    staleTime: 0,
  });

  // після видалення оновлюємо актуальні продукти користувача
  useEffect(() => {
    if (isSuccessUpdate) {
      setIsUpdate(false);
      setPreviousProductsId(newProductsId);
    }
  }, [isSuccessUpdate]);

  return (
    <BoxBgWhite infinityScroll={false}>
      <StyledContainer paddingY={true}>
        <SearchBlock
          searchText={searchText}
          onChangeInput={onChangeInput}
          component="MyProducts"
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
            {/* {isFetchedUserProducts ? ( //&& userProducts[0]
              <> */}
            {searchValue ? (
              <MyProducts
                products={searchUserProducts}
                isFetched={isFetchedUserProducts}
                userProductsId={previousProductsId}
                setNewProductsId={setNewProductsId}
                setIsUpdate={setIsUpdate}
              />
            ) : (
              <MyProducts
                products={userProducts}
                isFetched={isFetchedSearchUserProducts}
                userProductsId={previousProductsId}
                setNewProductsId={setNewProductsId}
                setIsUpdate={setIsUpdate}
              />
            )}
            {/* </>
            ) : isFetchedUserProducts ? (
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

export default MyProductsPage;
