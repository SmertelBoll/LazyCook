import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import SignBlock from "./SignBlock";

const bgImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/sign-in-bg.png";

function SignIn() {
  const { setToken, signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { data, error } = await signIn({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      if (error) throw error;
      setToken(data);
      navigate(-1);
    } catch (error) {
      alert(error);
    }
  }

  return <SignBlock bgImage={bgImage} handleSubmit={handleSubmit} />;
}

export default SignIn;
