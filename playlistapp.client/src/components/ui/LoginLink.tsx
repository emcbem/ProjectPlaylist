import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";

// component used to redirect unauthenticated users to the login page
// for example, you need to log in to leave a review

const LoginLink = ({ children }: { children: ReactNode }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <span
      onClick={() => loginWithRedirect()}
      className="underline cursor-pointer"
    >
      {children}
    </span>
  );
};

export default LoginLink;
