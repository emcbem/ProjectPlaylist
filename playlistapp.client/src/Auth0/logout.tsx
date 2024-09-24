import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="bg-gradient-to-b from-[#EDBD68] to-[#602B53] p-1 rounded-md">
      <button
        className="bg-white text-black font-bold h-full w-full focus:border-none border-none"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
