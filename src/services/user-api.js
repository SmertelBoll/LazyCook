import { supabase } from "../supabase/supabaseClient"

export const getRecipesIdByUser = async({queryKey}) => {
  const [_, userId] = queryKey
  const { data, error } = await supabase
  .from('userState')
  .select('recipes')
  .eq('user_id', userId)
  return data[0].recipes
}

export const updateRecipesIdByUser = async({queryKey}) => {
  const [_, userId, newRecipesId] = queryKey  
  const { data: currentRecipesId, error } = await supabase
  .from("userState")
  .update({ recipes: newRecipesId })
  .eq("user_id", userId);
  return currentRecipesId
}

export const getRecipesByUser = async({queryKey})=> {
  const [_, recipesId] = queryKey
  const { data, error } = await supabase
  .from("recipes")
  .select("*")
  .in('id', recipesId)
  return data
}

export const searchRecipesByUser = async({queryKey})=> {
  const [_, recipesId, recipeName] = queryKey
  const { data, error } = await supabase
  .from("recipes")
  .select("*")
  .in('id', recipesId)
  .textSearch('name', recipeName, {
    type: 'websearch',
    config: 'english',
  })
  return data
}



export const getProductsIdByUser = async({queryKey}) => {
  const [_, userId] = queryKey
  const { data, error } = await supabase
  .from('userState')
  .select('ingredients')
  .eq('user_id', userId)
  return data[0].ingredients
}

export const updateProductsIdByUser = async({queryKey}) => {
  const [_, userId, newProductsId] = queryKey  
  const { data: currentProductsId, error } = await supabase
  .from("userState")
  .update({ ingredients: newProductsId })
  .eq("user_id", userId);
  return currentProductsId
}

export const getProductsByUser = async({queryKey})=> {
  const [_, productsId] = queryKey
  const { data, error } = await supabase
  .from("ingredients")
  .select("*")
  .in('id', productsId)
  return data
}

export const searchProductsByUser = async({queryKey})=> {
  const [_, productssId, productName] = queryKey
  const { data, error } = await supabase
  .from("ingredients")
  .select("*")
  .in('id', productssId)
  .textSearch('name', productName, {
    type: 'websearch',
    config: 'english',
  })
  return data
}