import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../components/auth/Auth";
import {
  BoxBgBlue,
  BoxBgWhite,
  GridItem,
  StyledContainer,
} from "../components/custom/customComponents";
import GridSkeleton from "../components/custom/GridSkeleton";
import EmptyData from "../components/custom/EmptyData";
import SearchBlock from "../components/custom/SearchBlock";
import MyProductCard from "../components/Products/MyProductCard";
import {
  getProductsByUser,
  getProductsIdByUser,
  updateProductsIdByUser,
} from "../services/user-api";

const emptyData = {
  title: "Unfortunately, we could not find any products.",
  text: "Try adding a product",
};

const buttonsSearch = [
  {
    name: "all products",
    link: "/products",
  },
  {
    name: "my products",
    link: "/products/my-products",
  },
];

function MyProductsPage() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousProductsId, setPreviousProductsId] = useState([]);
  const [newProductsId, setNewProductsId] = useState([]);

  const { isToken, token } = useAuth();

  // загрузка id рецептів конкретного користувача
  const {
    data: userProductsId,
    isFetching: isFetchingUserProductsId,
    isFetched: isFetchedUserProductsId,
  } = useQuery({
    queryKey: ["getProductsIdByUser", token?.user?.id],
    queryFn: getProductsIdByUser,
    enabled: isToken,
    staleTime: 0,
  });

  // зберігаємо актуальні рецепти користувача
  useEffect(() => {
    if (isFetchedUserProductsId) {
      setPreviousProductsId(userProductsId);
    }
  }, [isFetchedUserProductsId, isFetchingUserProductsId]);

  // загрузка списку об'єктів рецепту
  const { data: userProducts, isFetched: isFetchedUserProducts } = useQuery({
    queryKey: ["getProductsByUser", userProductsId],
    queryFn: getProductsByUser,
    enabled: isFetchedUserProductsId,
    staleTime: 0,
  });

  // видалення рецепту із збережених
  const { isSuccess: isSuccessUpdate } = useQuery({
    queryKey: ["updateProductsIdByUser", token?.user?.id, newProductsId],
    queryFn: updateProductsIdByUser,
    enabled: isUpdate,
    staleTime: 0,
  });

  // після видалення оновлюємо актуальні рецепти користувача
  useEffect(() => {
    if (isSuccessUpdate) {
      setIsUpdate(false);
      setPreviousProductsId(newProductsId);
    }
  }, [isSuccessUpdate]);

  return (
    <BoxBgWhite>
      <StyledContainer paddingY={true}>
        <SearchBlock buttons={buttonsSearch} />
      </StyledContainer>
      <BoxBgBlue>
        <StyledContainer paddingY={true}>
          {/* Grid */}
          <Grid
            container
            sx={{
              width: "100%",
              minHeight: "100%",
            }}
          >
            {isFetchedUserProducts && userProducts[0] ? (
              <>
                {userProducts.map((data) => (
                  <GridItem key={`${data?.name}`}>
                    <MyProductCard
                      productItem={data}
                      userProductsId={previousProductsId}
                      setNewProductsId={setNewProductsId}
                      setIsUpdate={setIsUpdate}
                    />
                  </GridItem>
                ))}
              </>
            ) : isFetchedUserProducts ? (
              <EmptyData title={emptyData.title} text={emptyData.text} />
            ) : (
              <GridSkeleton size={12} />
            )}
          </Grid>
        </StyledContainer>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default MyProductsPage;
