import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import SignBlock from "./SignBlock";

const bgImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/sign-up-bg.png";

function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { data, error } = await signUp({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      alert("veritify");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  }

  return <SignBlock bgImage={bgImage} handleSubmit={handleSubmit} />;
}

export default SignUp;
