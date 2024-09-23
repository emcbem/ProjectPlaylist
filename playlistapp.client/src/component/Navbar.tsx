import React from "react";
import PPLogoLight from "../assets/PPLogoLight.svg";
import PPLogoDark from "../assets/PPLogoDark.svg";
import LoginButton from "../Auth0/login";
import Profile from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="bg-white dark:bg-black">
      <nav className="bg-white dark:bg-black w-full flex items-center px-8 pt-8 h-20 mb-2">
        <div className="flex-shrink-0">
          <a href="/">
            <img className="h-14 block dark:hidden" src={PPLogoLight} alt="PP Logo" />
            <img className="h-14 hidden dark:block" src={PPLogoDark} alt="PP Logo"  />
          </a>
        </div>

        <SearchBar />

        <div>{!isAuthenticated ? <LoginButton /> : <Profile />}</div>
      </nav>
    </div>
  );
};

export default Navbar;
