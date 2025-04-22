const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const SPRING_SERVER_URL = "http://backend:8080";
// CORS 설정
app.use(
  cors({
    origin: "http://localhost:5173", // Vite 기본 포트
    credentials: true,
  })
);

// 스프링 서버로 프록시
app.use(
  "/api",
  createProxyMiddleware({
    target: SPRING_SERVER_URL, // Docker 서비스 이름 사용
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // '/api' 경로 제거
    },
  })
);

app.listen(8888, () => {
  console.log("API Gateway is running on port 8888");
});
