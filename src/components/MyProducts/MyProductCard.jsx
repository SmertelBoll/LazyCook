import React, { useState } from "react";
import ItemCard from "../custom/ItemCard";

function MyProductCard({
  productItem,
  userProductsId,
  setNewProductsId,
  setIsUpdate,
}) {
  const [isAdded, setIsAdded] = useState(true);

  const handleClick = () => {
    // додати рецепт до збережених, якщо випадкового його видалив
    if (!isAdded) {
      setNewProductsId([...userProductsId, productItem.id]);
      setIsUpdate(true);
    }
    // видалити рецепт із збережених
    else {
      setNewProductsId(
        userProductsId.filter(function (e) {
          return e !== productItem.id;
        })
      );
      setIsUpdate(true);
    }
    setIsAdded(!isAdded);
  };

  return (
    <ItemCard data={productItem} isAdded={isAdded} handleClick={handleClick} />
  );
}

export default MyProductCard;
