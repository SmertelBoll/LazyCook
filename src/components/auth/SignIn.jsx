import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import SignBlock from "./SignBlock";
import { errorSignInAlert, successSignInAlert } from "../../services/alerts";

const bgImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/sign-in-bg.png";

function SignIn() {
  const { token, setToken, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, []);

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
      localStorage.setItem(
        "password",
        JSON.stringify(formData.get("password"))
      );
      navigate(-1);
      successSignInAlert();
    } catch (error) {
      errorSignInAlert(error.message);
    }
  }

  return <SignBlock bgImage={bgImage} handleSubmit={handleSubmit} />;
}

export default SignIn;
