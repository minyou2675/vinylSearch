import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Desktop from "./pages/MainPage";
import Discover from "./pages/Discover";
import DiscoverTest from "./pages/DiscoverTest";
import Signup from "./pages/SignupForm";
import Login from "./pages/LoginForm";
import MyPage from "./pages/MyPage";
import Favorite from "./pages/Favorite";
import BoardPage from "./pages/BoardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover-test" element={<DiscoverTest />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
