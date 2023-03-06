import React, { useEffect, useState } from "react";
import ItemCard from "../custom/ItemCard";

function WhatToCookCard({
  recipeItem,
  userRecipesId,
  setNewRecipesId,
  setIsUpdate,
}) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (userRecipesId.includes(recipeItem.id)) {
      setIsAdded(true);
    }
  }, [userRecipesId]);

  const handleClick = () => {
    // додати рецепт до збережених
    if (!isAdded) {
      setNewRecipesId([...userRecipesId, recipeItem.id]);
      setIsUpdate(true);
    }
    // видалити рецепт із збережених
    else {
      setNewRecipesId(
        userRecipesId.filter(function (e) {
          return e !== recipeItem.id;
        })
      );
      setIsUpdate(true);
    }
    setIsAdded(!isAdded);
  };

  return (
    <ItemCard
      data={recipeItem}
      isAdded={isAdded}
      handleClick={handleClick}
      isLink={true}
    />
  );
}

export default WhatToCookCard;
