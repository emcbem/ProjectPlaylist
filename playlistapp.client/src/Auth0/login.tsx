import { useAuth0 } from "@auth0/auth0-react";
import UserPFPLight from "../assets/user.svg";
import UserPFPDark from "../assets/userInverted.svg";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button
        className="border border-black dark:border-white dark:text-white p-2 px-8 lg:w-[213.69px] w-11 sm:h-fit h-11 text-2xl rounded-lg hidden lg:block relative z-20"
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
      <img
        src={UserPFPDark}
        alt="PFP"
        className="w-14 rounded-full dark:block dark:lg:hidden hidden"
        onClick={() => loginWithRedirect()}
      />
      <img
        src={UserPFPLight}
        alt="PFP"
        className="w-14 rounded-full block lg:hidden dark:hidden"
        onClick={() => loginWithRedirect()}
      />
    </>
  );
};

export default LoginButton;
