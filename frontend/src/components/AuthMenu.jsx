import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AuthMenu() {
  const [authStatus, setAuthStatus] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthStatus("인증되지 않음");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const text = await res.text();
      setAuthStatus(text);
    } catch (err) {
      console.error("인증 확인 실패:", err);
      setAuthStatus("인증되지 않음");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthStatus("인증되지 않음");
    navigate("/");
  };

  useEffect(() => {
    checkAuth();
    // 1초마다 인증 상태를 확인
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-4 right-4">
      {authStatus === "인증됨" ? (
        <div className="flex gap-4">
          <Link
            to="/mypage"
            className="text-lg font-medium text-gray-700 hover:text-gray-900"
          >
            MyPage
          </Link>
          <button
            onClick={handleLogout}
            className="text-lg font-medium text-gray-700 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          state={{ from: location }}
          className="text-lg font-medium text-gray-700 hover:text-gray-900"
        >
          Login
        </Link>
      )}
    </div>
  );
} 