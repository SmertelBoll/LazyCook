import { supabase } from "../supabase/supabaseClient"


//! this should happen on the backend, however I have not been able to implement this myself using SQL
export const whatToCook = async ({ queryKey}) => {
  const [_, availableIngredientsId] = queryKey

  const { data: allRecipes } = await supabase
  .from('recipes')
  .select('*')

  const {data: allIngredients} = await supabase
    .from('ingredients')
    .select('name, id')
  
  let availableIngredients = []

  for (let ing of allIngredients) {
    if (availableIngredientsId.includes(ing.id)) {
      availableIngredients.push(ing.name)
    }
  }

  let availableRecipes = []

  for (let res of allRecipes) {
    let recipeGood = true
    for (let ing of res.ingredients) {
      if (!availableIngredients.includes(ing)) {
        recipeGood = false
        break
      }
    }
    if (recipeGood) availableRecipes.push(res);
  }

  return availableRecipes
  
}