import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Mainpage from "./pages/MainPage";
import Discover from "./pages/Discover";
import DiscoverTest from "./pages/DiscoverTest";
import Signup from "./pages/SignupForm";
import Login from "./pages/LoginForm";
import MyPage from "./pages/MyPage";
import Favorite from "./pages/Favorite";
import BoardPost from "./pages/BoardPost";
import BoardPostWrite from "./pages/BoardPostWrite";
import BoardPostView from "./pages/BoardPostView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover-test" element={<DiscoverTest />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/board" element={<BoardPost />} />
        <Route path="/board/write" element={<BoardPostWrite />} />
        <Route path="/board/:id" element={<BoardPostView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
