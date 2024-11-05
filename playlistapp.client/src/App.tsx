import Navbar from "./individual_components/Navbar";
import HomePageNLI from "./page_components/HomePageNLI";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./page_components/SearchPage";
import HomePageLoggedIn from "./page_components/HomePageLoggedIn";
import { useAuth0 } from "@auth0/auth0-react";
import Account from "./page_components/Account/Account";
import ShineBorder from "./components/ui/shine-border";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { UserAccountContextProvider } from "./contexts/UserAccountContext";
import AchievementsPage from "./page_components/Achievements";
import TestPage from "./page_components/TestPage";
import UserViewGame from "./page_components/UserViewGame";
import { Toaster } from "react-hot-toast";
import MyLibrary from "./page_components/MyLibrary/MyLibrary";
import Playlist from "./page_components/List/Playlist";
import { SearchBarProvider } from "./contexts/SearchBarContext";
import { ThemeProvider } from "@material-tailwind/react";
import { materialTheme } from "./lib/theme";
const queryClient = new QueryClient(); // stay OUTSIDE of App()

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <QueryClientProvider client={queryClient}>
      <UserAccountContextProvider>
        <SearchBarProvider>
          <ThemeProvider value={materialTheme}>
            <Toaster />
            <ShineBorder
              className="w-full flex-grow flex min-h-screen flex-col rounded-lg border"
              color={["#EDBD68", "#DE5152", "#A43845", "#602B53"]}
              borderWidth={6}
              duration={30}
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
                    <Route
                      path="/view-game/:gameId"
                      element={<UserViewGame />}
                    />
                    <Route
                      path="/user-view-game/:gameId"
                      element={<UserViewGame />}
                    />
                    <Route path="/account" element={<Account />} />
                    <Route path="/library" element={<MyLibrary />} />
                    <Route path="/list/:listId" element={<Playlist />} />
                    <Route
                      path="/achievements/:gameId"
                      element={<AchievementsPage />}
                    />
                    <Route
                      path="/test"
                      element={<TestPage />}
                    />
                  </Routes>
                </div>
              </div>
            </ShineBorder>
          </ThemeProvider>
        </SearchBarProvider>
      </UserAccountContextProvider>
    </QueryClientProvider>
  );
}

export default App;

<span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
  Shine Border
</span>;
