import React, { useEffect, useState } from "react";
import ItemCard from "../ItemsBlock/ItemCard";

function RecipeCard({ recipeItem, userRecipes, setNewRecipes, setIsUpdate }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (userRecipes.includes(recipeItem.id)) {
      setIsAdded(true); // якщо якийсь рецепт у користувача є, то відображуємо його відповідно
    }
  }, [userRecipes]);

  const handleClick = () => {
    // додати рецепт до збережених
    if (!isAdded) {
      setNewRecipes([...userRecipes, recipeItem.id]);
      setIsUpdate(true);
    }
    // видалити рецепт із збережених
    else {
      setNewRecipes(
        userRecipes.filter(function (e) {
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
