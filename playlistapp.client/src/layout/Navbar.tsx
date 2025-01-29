import React from "react";
import PPLogoLight from "../assets/PPLogoLight.svg";
import PPLogoDark from "../assets/PPLogoDark.svg";
import PPDiamond from "../assets/PPDiamond.svg";
import LoginButton from "../Auth0/login";
import Profile from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../individual_components/SearchBar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Contour from "./maze2.svg";
const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  const backgroundImage = `url(${Contour})`;

  return (
    <>
      <div
        className="z-20 flex justify-center pb-4"
        style={{
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <nav className="flex max-w-[1264px] w-full justify-center items-center sm:px-4 sm:pt-8 h-20 mb-2 z-20">
          <div className="flex-shrink-0 z-20">
            <a href="/">
              <img
                className="lg:h-14 md:h-12 sm:h-10 h-6 lg:block dark:hidden hidden"
                src={PPLogoLight}
                alt="PP Logo"
              />
              <img
                className="lg:h-14 md:h-12 sm:h-10 h-6 hidden lg:dark:block"
                src={PPLogoDark}
                alt="PP Logo"
              />
              <img
                className="sm:h-14 h-8 lg:hidden block"
                src={PPDiamond}
                alt="PP Diamond"
              />
            </a>
          </div>

          <SearchBar />

          <div>{!isAuthenticated ? <LoginButton /> : <Profile />}</div>
        </nav>
      </div>
      <ScrollProgress className="top-[65px]" />
    </>
  );
};

export default Navbar;
