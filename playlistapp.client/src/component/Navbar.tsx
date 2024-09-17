import React from "react";
import PPLogoLight from "../assets/PPLogoLight.svg";
import UserPFP from "../assets/user.svg";
import LoginButton from "../Auth0/login";
import LogoutButton from "../Auth0/logout";
import Profile from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="bg-white w-full flex items-center px-8 pt-8 h-20">
      <div className="flex-shrink-0">
        <a href="/">
          <img className="h-14" src={PPLogoLight} alt="PP Logo" />
        </a>
      </div>

      <div className="flex-grow mx-8 flex justify-center">
        <input
          type="text"
          placeholder="Start your search"
          className="w-1/2 py-2 px-4 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {!isAuthenticated && (
        <div className="flex-shrink-0">
          <a href="/">
            <img width="50" height="50" src={UserPFP} alt="User Icon" />
          </a>
        </div>
      )}

      {/* <div>{isAuthenticated ? <Profile /> : <LoginButton />}</div> */}

      <div>
        {!isAuthenticated ? (
          <LoginButton />
        ) : (
          <div className="flex flex-row">
            <Profile />
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
