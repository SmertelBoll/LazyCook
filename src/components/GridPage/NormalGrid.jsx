import React from "react";
import { GridItem } from "../custom/customComponents";
import EmptyData from "../custom/EmptyData";
import GridSkeleton from "../custom/GridSkeleton";
import ItemCard from "./ItemCard";

const emptyData = {
  "my-recipes": {
    title: "Unfortunately, we could not find any recipes.",
    text: "Try adding one",
  },
  "my-products": {
    title: "Unfortunately, we could not find any products.",
    text: "Try adding one",
  },
  "what-to-cook": {
    title: "Unfortunately, we could not find any recipes.",
    text: "You need more products",
  },
};

function NormalGrid({
  items,
  isFetched,
  userItemsId,
  setNewItemsId,
  setIsUpdate,
  component,
}) {
  return (
    <>
      {isFetched && items && items[0] ? (
        <>
          {items?.map((data) => (
            <GridItem key={`${data?.name}`}>
              <ItemCard
                item={data}
                userItemsId={userItemsId}
                setIsUpdate={setIsUpdate}
                setNewItemsId={setNewItemsId}
                component={component}
              />
            </GridItem>
          ))}
        </>
      ) : isFetched && items ? (
        <EmptyData
          title={emptyData[component].title}
          text={emptyData[component].text}
        />
      ) : (
        <GridSkeleton size={12} />
      )}
    </>
  );
}

export default NormalGrid;
