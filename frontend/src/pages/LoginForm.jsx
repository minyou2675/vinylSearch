import React, { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 세션 쿠키 포함
      body: JSON.stringify(form),
    });

    const text = await res.text();
    setMessage(text);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
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
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
        로그인
      </button>
      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
    </div>
  );
}
