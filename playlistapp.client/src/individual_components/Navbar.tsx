import React from "react";
import PPLogoLight from "../assets/PPLogoLight.svg";
import PPLogoDark from "../assets/PPLogoDark.svg";
import PPDiamond from "../assets/PPDiamond.svg";
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
              <img
                className="lg:h-14 md:h-12 sm:h-10 h-6 sm:block dark:hidden hidden"
                src={PPLogoLight}
                alt="PP Logo"
              />
              <img
                className="lg:h-14 md:h-12 sm:h-10 h-6 hidden sm:dark:block"
                src={PPLogoDark}
                alt="PP Logo"
              />
              <img
                className="lg:h-14 md:h-12 sm:h-10 h-14 sm:hidden block"
                src={PPDiamond}
                alt="PP Diamond"
              />
            </a>
          </div>

          <SearchBar />
          

        <div>{!isAuthenticated ? <LoginButton /> : <Profile />}</div>
      </nav>
    </div >
  );
};

export default Navbar;
