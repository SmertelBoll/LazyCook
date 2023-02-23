import React, { useEffect, useState } from "react";
import ItemCard from "../custom/ItemCard";

function ProductsCard({
  productsItem,
  userProductsId,
  setNewProductsId,
  setIsUpdate,
}) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (userProductsId?.includes(productsItem.id)) {
      setIsAdded(true); // якщо якийсь рецепт у користувача є, то відображуємо його відповідно
    } else {
      setIsAdded(false);
    }
  }, [userProductsId]);

  const handleClick = () => {
    // додати рецепт до збережених
    if (!isAdded) {
      setNewProductsId([...userProductsId, productsItem.id]);
      setIsUpdate(true);
    }
    // видалити рецепт із збережених
    else {
      setNewProductsId(
        userProductsId.filter(function (e) {
          return e !== productsItem.id;
        })
      );
      setIsUpdate(true);
    }
    setIsAdded(!isAdded);
  };

  return (
    <ItemCard data={productsItem} isAdded={isAdded} handleClick={handleClick} />
  );
}

export default ProductsCard;
