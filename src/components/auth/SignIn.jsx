import React from "react";
import SignBlock from "./SignBlock";

const bgImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/sign-in-bg.png";

function SignIn() {
  return <SignBlock bgImage={bgImage} />;
}

export default SignIn;
