import Navbar from "./individual_components/Navbar";
import HomePageNLI from "./page_components/HomePageNLI";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./page_components/SearchPage";
import HomePageLoggedIn from "./page_components/HomePageLoggedIn";
import { GameContextProvidor } from "./context/GameContext";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <GameContextProvidor>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#EDBD68] to-[#602B53] p-2">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <HomePageLoggedIn /> : <HomePageNLI />}
          />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </GameContextProvidor>
  );
}

export default App;
