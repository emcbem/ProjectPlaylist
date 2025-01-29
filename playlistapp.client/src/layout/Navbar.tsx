import React from "react";
import PPLogoLight from "../assets/PPLogoLight.svg";
import PPLogoDark from "../assets/PPLogoDark.svg";
import PPDiamond from "../assets/PPDiamond.svg";
import SearchBar from "../individual_components/SearchBar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Abstract from "./maze.svg";
import LightAbstract from "./mazelight.svg";
import { useTheme } from "@/hooks/useDarkMode";
import Profile from "@/Auth0/profile";
const Navbar: React.FC = () => {
  const { theme } = useTheme();

  const backgroundImage =
    theme === "dark" ? `url(${Abstract})` : `url(${LightAbstract})`;

  return (
    <div className="sticky top-0 dark:bg-black bg-white z-[1000]">
      <div
        className="z-20 flex justify-center pb-4"
        style={{
          backgroundImage,
          backgroundSize: "750px",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      >
        <nav className="flex max-w-[1264px] desk:w-[1264px] avg:w-[800px] w-[500px] justify-center items-center px-4 pt-8 h-20 mb-2 z-20">
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
                className="sm:h-14 h-11 lg:hidden block"
                src={PPDiamond}
                alt="PP Diamond"
              />
            </a>
          </div>

          <SearchBar />

          <Profile />
        </nav>
      </div>
      <ScrollProgress className="top-[65px]" />
    </div>
  );
};

export default Navbar;
