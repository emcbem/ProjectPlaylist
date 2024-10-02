import Navbar from "./individual_components/Navbar";
import HomePageNLI from "./page_components/HomePageNLI";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./page_components/SearchPage";
import HomePageLoggedIn from "./page_components/HomePageLoggedIn";
import { GameContextProvidor } from "./context/GameContext";
import { useAuth0 } from "@auth0/auth0-react";
import ViewGame from "./page_components/ViewGame";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <GameContextProvidor>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#EDBD68] to-[#602B53] p-2 z-50">
        <div className="dark:bg-black bg-white">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <HomePageLoggedIn /> : <HomePageNLI />}
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/view-game/:gameId" element={<ViewGame />} />
          </Routes>
        </div>
      </div>
    </GameContextProvidor>
  );
}

export default App;
