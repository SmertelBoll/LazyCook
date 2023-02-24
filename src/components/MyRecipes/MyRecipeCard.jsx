import React, { useState } from "react";
import ItemCard from "../custom/ItemCard";

function MyRecipeCard({
  recipeItem,
  userRecipesId,
  setNewRecipesId,
  setIsUpdate,
}) {
  const [isAdded, setIsAdded] = useState(true);

  const handleClick = () => {
    // додати рецепт до збережених, якщо випадкового його видалив
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

export default MyRecipeCard;
