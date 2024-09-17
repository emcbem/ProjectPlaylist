import { useAuth0 } from "@auth0/auth0-react";

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    user && (
      <div className="flex flex-row">
        <img src={user.picture} alt={user.name} className="rounded-full h-20"/>
        <span>Welcome, {user.name}</span>
      </div>
    )
  );
};

export default Profile;
