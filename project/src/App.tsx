import { useSignInMutation, useSignUpMutation } from "../store/authApi";
import SuperTokens from "supertokens-website";

SuperTokens.init({
  apiDomain: "http://localhost:3567",
  apiBasePath: "/api",
});

export default function App() {
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();

  const values = {
    email: "test.email18471874@email.com",
    password: "Password123!",
  };

  const handleSignUp = async () => {
    const result = await signUp(values).unwrap();
    console.log(result);
  };

  const handleSignIn = async () => {
    const result = await signIn(values).unwrap();
    console.log(result);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 25,
        width: "25vw",
      }}
    >
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
