import Navbar from "./layout/Navbar";
import LandingPage from "./page_components/LandingPage";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./page_components/Search/ui/SearchPage";
import HomePageLoggedIn from "./page_components/HomePageLoggedIn";
import { useAuth0 } from "@auth0/auth0-react";
import Account from "./page_components/Account/Account";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { UserAccountContextProvider } from "./contexts/UserAccountContext";
import AchievementsPage from "./page_components/Achievements/Achievements";
import TestPage from "./page_components/TestPage";
import ViewGame from "./page_components/ViewGame/ViewGame";
import { Toaster } from "react-hot-toast";
import UserLibrary from "./page_components/UserLibrary/UserLibrary";
import Playlist from "./page_components/List/Playlist";
import { SearchBarProvider } from "./contexts/SearchBarContext";
import { ThemeProvider } from "@material-tailwind/react";
import { materialTheme } from "./lib/theme";
import Settings from "./page_components/Settings/Settings";
import ChooseProfileImg from "./page_components/Account/ChooseProfileImg";
import ViewAllGoals from "./page_components/Goals/ViewAllGoals";
import ViewLibraryGame from "./page_components/UserLibrary/ViewLibraryGame";
import SearchUsers from "./page_components/SearchUsers/SearchUsers";
import NotificationPage from "./page_components/Notifications/Notifications";
import AdminPage from "./page_components/Admin/Admin";
import { ColorModeProvider } from "./hooks/useDarkMode";
const queryClient = new QueryClient(); // stay OUTSIDE of App()

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <QueryClientProvider client={queryClient}>
      <UserAccountContextProvider>
        <ColorModeProvider>
          <SearchBarProvider>
            <ThemeProvider value={materialTheme}>
              <Toaster />
              <div className="w-full flex-grow flex min-h-screen flex-col rounded-lg">
                <div className="min-h-screen dark:bg-black flex-grow flex flex-col z-50 w-full">
                  <div className="dark:bg-black bg-white w-full relative">
                    <Navbar />
                    <Routes>
                      <Route
                        path="/"
                        element={
                          isAuthenticated ? (
                            <HomePageLoggedIn />
                          ) : (
                            <LandingPage />
                          )
                        }
                      />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/searchusers" element={<SearchUsers />} />
                      <Route
                        path="/notifications"
                        element={<NotificationPage />}
                      />
                      <Route path="/view-game/:gameId" element={<ViewGame />} />
                      <Route
                        path="/user-library-game/:gameId"
                        element={<ViewLibraryGame />}
                      />
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/library" element={<UserLibrary />} />
                      <Route path="/list/:listId" element={<Playlist />} />
                      <Route
                        path="/achievements/:gameId"
                        element={<AchievementsPage />}
                      />
                      <Route path="/test" element={<TestPage />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route
                        path="/settings/setprofileimage"
                        element={<ChooseProfileImg />}
                      />
                      <Route path="viewallgoals" element={<ViewAllGoals />} />
                      <Route path="user/:id" element={<Account />} />
                      <Route
                        path="user/:id/library"
                        element={<UserLibrary />}
                      />
                      <Route
                        path="user/:id/list/:listId"
                        element={<Playlist />}
                      />
                      <Route
                        path="user/:id/viewallgoals"
                        element={<ViewAllGoals />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            </ThemeProvider>
          </SearchBarProvider>
        </ColorModeProvider>
      </UserAccountContextProvider>
    </QueryClientProvider>
  );
}

export default App;
