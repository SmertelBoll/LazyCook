import React from "react";
import { supabase } from "../../supabase/supabaseClient";
import SignBlock from "./SignBlock";

const bgImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/sign-in-bg.png";

function SignIn({ setToken }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      if (error) throw error;
      setToken(data);
    } catch (error) {
      alert(error);
    }
  }

  return <SignBlock bgImage={bgImage} handleSubmit={handleSubmit} />;
}

export default SignIn;
