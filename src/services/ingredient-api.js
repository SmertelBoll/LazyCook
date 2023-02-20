import { supabase } from "../supabase/supabaseClient"

export const getIngredientByName = async({queryKey})=>{
  const [_, name] = queryKey
  const { data, error } = await supabase
  .from('ingredients')
  .select('*')
  .eq('name', name)
  return data[0]
}