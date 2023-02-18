import { supabase } from "../supabase/supabaseClient";

export const getAllRecipes = async ({ pageParam = 0 }) => {
  const recipes = await supabase
    .from("testTable")
    .select("*")
    .range(pageParam, pageParam + 11);
  return { recipes, nextPage: pageParam + 12 };
};

