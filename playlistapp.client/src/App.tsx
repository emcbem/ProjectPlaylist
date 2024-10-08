import Navbar from "./individual_components/Navbar";
import HomePageNLI from "./page_components/HomePageNLI";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./page_components/SearchPage";
import HomePageLoggedIn from "./page_components/HomePageLoggedIn";
import { useAuth0 } from "@auth0/auth0-react";
import ViewGame from "./page_components/ViewGame";
import Account from "./page_components/Account";
import { GameContextProvidor } from "./contexts/GameContext";
import ShineBorder from "./components/ui/shine-border";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const { isAuthenticated } = useAuth0();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GameContextProvidor>
          <ShineBorder
            className="w-full flex-grow flex min-h-screen flex-col rounded-lg border"
            color={["#EDBD68", "#DE5152", "#A43845", "#602B53"]}
            borderWidth={6}
            duration={14}
          >
            <div className="min-h-screen flex-grow flex flex-col p-2 z-50 w-full">
              <div className="dark:bg-black bg-white w-full">
                <Navbar />
                <Routes>
                  <Route
                    path="/"
                    element={
                      isAuthenticated ? <HomePageLoggedIn /> : <HomePageNLI />
                    }
                  />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/view-game/:gameId" element={<ViewGame />} />
                  <Route path="/account" element={<Account />} />
                </Routes>
              </div>
            </div>
          </ShineBorder>
      </GameContextProvidor>
    </QueryClientProvider>
  );
}

export default App;

<span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
  Shine Border
</span>;
