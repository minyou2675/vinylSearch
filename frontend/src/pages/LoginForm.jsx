import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const token = await res.text();
      
      if (res.ok) {
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("token", token);
        // 로그인 성공 시 이전 페이지로 이동
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setMessage("로그인 실패");
      }
    } catch (err) {
      console.error("로그인 실패:", err);
      setMessage("로그인 실패");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <input
        name="username"
        placeholder="아이디"
        value={form.username}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="border p-2 w-full mb-2"
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
        로그인
      </button>
      {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
    </div>
  );
}
