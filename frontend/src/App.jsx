import React, {useEffect} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import LoginPage from "./pages/Authentication/LoginPage.jsx";
import SignUpPage from "./pages/Authentication/SignUpPage.jsx";
import {Toaster} from "react-hot-toast";
import {useAuthStore} from "./stores/useAuthStore";
import {Loader} from "lucide-react";
import Layout from "./layout/Layout";
import AddProblem from "./pages/Problem/AddProblem.jsx";
import ProblemPage from "./pages/Problem/ProblemPage.jsx";
import ProblemsList from "./pages/Problem/ProblemsList.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import AdminPage from "./pages/Admin/AdminPage.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import PlaylistPage from "./pages/Playlist/PlaylistPage.jsx";
import ViewPlaylistPage from "./pages/Playlist/ViewPlaylistPage.jsx";
import PageNotFound from "./pages/404/PageNotFound.jsx";

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Toaster />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={!authUser ? <HomePage /> : <Navigate to={"/dashboard"} />}
          />

          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/" />}
          />

          <Route
            path="/dashboard"
            element={authUser ? <DashboardPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/problems"
            element={authUser ? <ProblemsList /> : <LoginPage />}
          />

          <Route
            path="/profile"
            element={authUser ? <Profile /> : <LoginPage />}
          />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/admin"
            element={authUser ? <AdminPage /> : <LoginPage />}
          />
          <Route
            path="/problem/:id"
            element={authUser ? <ProblemPage /> : <LoginPage />}
          />
          <Route
            path="/playlists"
            element={authUser ? <PlaylistPage /> : <LoginPage />}
          />
          <Route
            path="/playlists/:id"
            element={authUser ? <ViewPlaylistPage /> : <LoginPage />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
