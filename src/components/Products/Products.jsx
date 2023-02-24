import React, { useEffect, useState } from "react";
import GridSkeleton from "../custom/GridSkeleton";
import {
  getProductsIdByUser,
  updateProductsIdByUser,
} from "../../services/user-api";
import { useQuery } from "react-query";
import EmptyData from "../custom/EmptyData";
import { useAuth } from "../auth/Auth";
import { GridItem } from "../custom/customComponents";
import ProductsCard from "./ProductCard";

const emptyData = {
  title: "Unfortunately, we could not find any products.",
  text: "Try again later",
};

function Products({ products, isFetchingNextPage, isFetched, isFetching }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [previousProductsId, setPreviousProductsId] = useState([]);
  const [newProductsId, setNewProductsId] = useState([]);

  const { token } = useAuth();

  const {
    data: userProductsId,
    isFetching: isFetchingUserProductsId,
    isFetched: isFetcheduserProductsId,
  } = useQuery({
    queryKey: ["getProductsIdByUser", token?.user?.id],
    queryFn: getProductsIdByUser,
    enabled: Boolean(token),
    staleTime: 0,
  });

  useEffect(() => {
    if (isFetcheduserProductsId) {
      setPreviousProductsId(userProductsId); // зберігаємо актуальні рецепти користувача
    }
  }, [isFetcheduserProductsId, isFetchingUserProductsId]);
  // не впевнений як, але isFetchingUserProductsId покращує обновлення кнопок

  const { isSuccess: isSuccessUpdate } = useQuery({
    queryKey: ["updateProductsIdByUser", token?.user?.id, newProductsId],
    queryFn: updateProductsIdByUser,
    enabled: isUpdate,
    staleTime: 0,
  });

  useEffect(() => {
    if (isSuccessUpdate) {
      setIsUpdate(false);
      setPreviousProductsId(newProductsId);
    }
  }, [isSuccessUpdate]);

  return (
    <>
      {isFetching && !isFetchingNextPage ? ( // загружаються перший раз
        <GridSkeleton size={12} />
      ) : isFetched && // загрузка закінчена
        products?.pages[0]?.data && //масив існує
        products?.pages[0]?.data?.length !== 0 ? ( // загружено непустий масив
        <>
          {products.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((data, i) => (
                <GridItem key={`${data?.name}`}>
                  <ProductsCard
                    productsItem={data}
                    userProductsId={previousProductsId}
                    setIsUpdate={setIsUpdate}
                    setNewProductsId={setNewProductsId}
                  />
                </GridItem>
              ))}
            </React.Fragment>
          ))}
        </>
      ) : (
        <EmptyData title={emptyData.title} text={emptyData.text} />
      )}
    </>
  );
}

export default Products;
