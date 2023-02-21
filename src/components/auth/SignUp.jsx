import React from "react";
import { supabase } from "../../supabase/supabaseClient";
import SignBlock from "./SignBlock";

const bgImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/sign-up-bg.png";

function SignUp() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      alert("veritify");
    } catch (error) {
      alert(error);
    }
  }

  return <SignBlock bgImage={bgImage} handleSubmit={handleSubmit} />;
}

export default SignUp;
