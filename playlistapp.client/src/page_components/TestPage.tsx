import { useAuth0 } from "@auth0/auth0-react";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();


  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
      </div>
    )
  );
};

export default TestPage;
