import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserInfoFromToken } from "@/lib/utils";

export default function AuthMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const user = getUserInfoFromToken(token);
    if (!user || !user.userId) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      return;
    }

    // JWT가 만료되었는지 확인
    const currentTime = Date.now() / 1000;
    if (user.exp && user.exp < currentTime) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      return;
    }

    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    checkAuth();
    // 1분마다 토큰 유효성 체크 
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-4 right-4">
      {isAuthenticated ? (
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