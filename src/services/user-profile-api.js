import { supabase } from "../supabase/supabaseClient";

export const getAvatar = async({queryKey})=> {
  const [_, userId] = queryKey
  const { data } = await supabase.storage
      .from("profiles")
      .list(userId, {
        limit: 100,
        offset: 0,
        search: "avatar",
      });
  return data[0]
}

export const getUserName = async () => {
  const { data, error } = await supabase
  .from('userProfile')
  .select('username')
  return data[0].username
}

export const updateUserName = async ({queryKey}) => {
  const [_, userId, userName] = queryKey
  const { data, error } = await supabase
  .from('userProfile')
  .update({ username: userName })
  .eq('id', userId)
}

export const updatePassword = async ({queryKey}) => {
  const [_, currentPassword, newPassword] = queryKey
  const { data, error } = await supabase.rpc('change_user_password', 
    { current_plain_password: currentPassword, new_plain_password: newPassword})
  return {data, error}
}
