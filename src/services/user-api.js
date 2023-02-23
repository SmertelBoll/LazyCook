import { supabase } from "../supabase/supabaseClient"

export const getRecipesByUser = async({queryKey})=>{
  const [_, userId] = queryKey
  const { data, error } = await supabase
  .from('userState')
  .select('recipes')
  .eq('user_id', userId)
  return data[0].recipes
}

export const updateRecipesByUser = async({queryKey})=>{
  const [_, userId, recipes] = queryKey  
  const { data: currentRecipes, error: errrror } = await supabase
  .from("userState")
  .update({ recipes: recipes })
  .eq("user_id", userId);
  return currentRecipes
}
