import Navbar from "./individual_components/Navbar";
import HomePageNLI from "./page_components/HomePageNLI";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./page_components/SearchPage";
import HomePageLoggedIn from "./page_components/HomePageLoggedIn";
import { useAuth0 } from "@auth0/auth0-react"; import ViewGame from "./page_components/ViewGame";
import Account from "./page_components/Account";
import { GameContextProvidor } from "./contexts/GameContext";
import { UserGameContextProvidor } from "./contexts/UserGameContext";


function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <GameContextProvidor>
      <UserGameContextProvidor>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#EDBD68] to-[#602B53] p-2">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <HomePageLoggedIn /> : <HomePageNLI />}
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/view-game/:gameId" element={<ViewGame />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </UserGameContextProvidor>
    </GameContextProvidor>
  );
}

export default App;
