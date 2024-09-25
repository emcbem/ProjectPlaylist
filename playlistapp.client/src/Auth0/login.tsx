import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="border border-black dark:border-white dark:text-white p-2 px-8 text-xl rounded-lg" onClick={() => loginWithRedirect()}>
      Login
    </button>
  );
};

export default LoginButton;
