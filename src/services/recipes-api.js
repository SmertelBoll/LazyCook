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

