import { supabase } from "../supabase/supabaseClient";

export const getAllRecipes = async ({ pageParam = 0 }) => {
  const recipes = await supabase
    .from("recipes")
    .select("*")
    .range(pageParam, pageParam + 11);
  return { data: recipes.data, nextPage: pageParam + 12 };
};

export const searchRecipes = async ({ queryKey, pageParam = 0 }) => {
  const [_, recipeName] = queryKey
  const recipes = await supabase
    .from("recipes")
    .select("*")
    .textSearch('name', recipeName, {
      type: 'websearch',
      config: 'english',
    })
    .range(pageParam, pageParam + 11);
  return { data: recipes.data, nextPage: pageParam + 12 };
};

export const getRecipeById = async({queryKey})=>{
  const [_, id] = queryKey
  const { data } = await supabase
  .from('recipes')
  .select()
  .eq('id', id)
  return data[0]
}

export const getCategories = async()=> {
  const { data } = await supabase
  .from('all_category')
  .select("*")
  let resultArr = []
  for (let el of data) resultArr.push(el.category)
  return resultArr
}

export const getRecipesByCategory = async ({ queryKey, pageParam = 0 }) => {
  const [_, category] = queryKey
  const recipes = await supabase
    .from("recipes")
    .select("*")
    .eq('category', category)
    .range(pageParam, pageParam + 11);
  return { data: recipes.data, nextPage: pageParam + 12 };
};

