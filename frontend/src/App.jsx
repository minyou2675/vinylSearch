import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Desktop from './pages/Mainpage'
import Discover from './pages/Discover'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;