import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Desktop from './pages/Mainpage'
import Discover from './pages/Discover'
import DiscoverTest from './pages/DiscoverTest'
import Signup from './pages/SignupForm'
import Login from './pages/LoginForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover-test" element={<DiscoverTest />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;