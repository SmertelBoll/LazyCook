import { supabase } from "../supabase/supabaseClient";

export const getAllProducts = async ({ pageParam = 0 }) => {
  const products = await supabase
    .from("ingredients")
    .select("*")
    .range(pageParam, pageParam + 11);
  return { data: products.data, nextPage: pageParam + 12 };
};

export const searchProducts = async ({ queryKey, pageParam = 0 }) => {
  const [_, productsName] = queryKey
  const products = await supabase
    .from("ingredients")
    .select("*")
    .textSearch('name', productsName, {
      type: 'websearch',
      config: 'english',
    })
    .range(pageParam, pageParam + 11);
  return { data: products.data, nextPage: pageParam + 12 };
};

export const getProductsById = async({queryKey})=>{
  const [_, id] = queryKey
  const { data, error } = await supabase
  .from('ingredients')
  .select('*')
  .eq('id', id)
  return data[0]
}

