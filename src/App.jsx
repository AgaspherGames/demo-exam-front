import { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import GamesPage from "./pages/GamesPage";
import Header from "./components/Header/Header";
import SigninPage from "./pages/SigninPage";
import { useStore } from "./services/store";
import localStorageService from "./services/localStorageService";
import GamePage from "./pages/GamePage";
import UserPage from "./pages/UserPage";
import ManagePage from "./pages/ManagePage";

function App() {
  const { setUser, user } = useStore((state) => state);
  useEffect(() => {
    setUser(localStorageService.loadUser());
    console.log(localStorageService.loadUser());
  }, []);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<GamesPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/users/:username" element={<UserPage />} />
        {user?.username && (
          <>
            <Route path="/games/:slug" element={<GamePage />} />
            <Route path="/games/:slug/manage" element={<ManagePage />} />
          </>
        )}
        <Route path="/*" element={<Navigate to={'/'} />} />
      </Routes>
    </div>
  );
}

export default App;
