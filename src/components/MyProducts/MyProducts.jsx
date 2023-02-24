import React from "react";
import { GridItem } from "../custom/customComponents";
import EmptyData from "../custom/EmptyData";
import GridSkeleton from "../custom/GridSkeleton";
import MyProductCard from "./MyProductCard";

const emptyData = {
  title: "Unfortunately, we could not find any products.",
  text: "Try adding one",
};

function MyProducts({
  products,
  isFetched,
  userProductsId,
  setNewProductsId,
  setIsUpdate,
}) {
  return (
    <>
      {isFetched && products && products[0] ? (
        <>
          {products?.map((data) => (
            <GridItem key={`${data?.name}`}>
              <MyProductCard
                productItem={data}
                userProductsId={userProductsId}
                setNewProductsId={setNewProductsId}
                setIsUpdate={setIsUpdate}
              />
            </GridItem>
          ))}
        </>
      ) : isFetched && products ? (
        <EmptyData title={emptyData.title} text={emptyData.text} />
      ) : (
        <GridSkeleton size={12} />
      )}
    </>
  );
}

export default MyProducts;
