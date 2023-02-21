import React from "react";
import SignBlock from "./SignBlock";

const bgImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/sign-up-bg.png";

function SignUp() {
  return <SignBlock bgImage={bgImage} />;
}

export default SignUp;
