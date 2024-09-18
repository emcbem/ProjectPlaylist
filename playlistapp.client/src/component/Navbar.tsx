import React from "react";
import PPLogoLight from "../assets/PPLogoLight.svg";
import LoginButton from "../Auth0/login";
import Profile from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="bg-white">
      <nav className="bg-white w-full flex items-center px-8 pt-8 h-20 mb-2">
        <div className="flex-shrink-0">
          <a href="/">
            <img className="h-14" src={PPLogoLight} alt="PP Logo" />
          </a>
        </div>

        <SearchBar />

        <div>{!isAuthenticated ? <LoginButton /> : <Profile />}</div>
      </nav>
    </div>
  );
};

export default Navbar;
