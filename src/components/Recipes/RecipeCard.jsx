import React, { useEffect, useState } from "react";
import ItemCard from "../ItemsBlock/ItemCard";

function RecipeCard({
  recipeItem,
  userRecipesId,
  setNewRecipesId,
  setIsUpdate,
}) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (userRecipesId.includes(recipeItem.id)) {
      setIsAdded(true); // якщо якийсь рецепт у користувача є, то відображуємо його відповідно
    } else {
      setIsAdded(false);
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
    <ItemCard data={recipeItem} isAdded={isAdded} handleClick={handleClick} />
  );
}

export default RecipeCard;
