import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorAuthAlert, verificationAuthAlert } from "../../services/alerts";
import { useAuth } from "./Auth";
import SignBlock from "./SignBlock";

const bgImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/sign-up-bg.png";

function SignUp() {
  const navigate = useNavigate();
  const { token, signUp } = useAuth();

  useEffect(() => {
    if (token) navigate("/");
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { error } = await signUp({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      if (error) throw error;

      verificationAuthAlert();
      navigate("/sign-in");
    } catch (error) {
      errorAuthAlert(error.message);
    }
  }

  return <SignBlock bgImage={bgImage} handleSubmit={handleSubmit} />;
}

export default SignUp;
