import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

export default function SignupForm() {
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const text = await res.text();
      setMessage(text);
      
      if (res.ok) {
        // 회원가입 성공 시 MainPage로 이동
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("회원가입 실패:", err);
      setMessage("회원가입 실패");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
            <Logo />
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <input
        name="username"
        placeholder="아이디"
        value={form.username}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        가입하기
      </button>
      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
    </div>
  );
}
