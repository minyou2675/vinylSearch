import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getToken() {
    const useMock = import.meta.env.VITE_USE_MOCK_AUTH === "true";
  
    if (useMock) {
      return "MOCK_TOKEN_FOR_TEST"; // 실제 토큰은 스프링에서 발급받은 마스터 토큰으로 대체 가능
    }

    return localStorage.getItem("token");
}