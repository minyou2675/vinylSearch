import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import Discover from "./pages/AlbumLayout/Discover";
import DiscoverTest from "./pages/AlbumLayout/DiscoverTest";
import Signup from "./pages/AuthLayout/SignupForm";
import Login from "./pages/AuthLayout/LoginForm";
import MyPage from "./pages/AuthLayout/MyPage";
import Favorite from "./pages/AlbumLayout/Favorite";
import BoardPost from "./pages/BoardLayout/BoardPost";
import BoardPostWrite from "./pages/BoardLayout/BoardPostWrite";
import BoardPostView from "./pages/BoardLayout/BoardPostView";
import BatchDashboard from "./pages/BatchLayout/BatchDashBoard";
import BatchLogs from "./pages/BatchLayout/BatchLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover-test" element={<DiscoverTest />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/board" element={<BoardPost />} />
        <Route path="/board/write" element={<BoardPostWrite />} />
        <Route path="/board/:id" element={<BoardPostView />} />
        <Route path="/batch" element={<BatchDashboard />} />
        <Route path="/batch/:jobName/logs" element={<BatchLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
