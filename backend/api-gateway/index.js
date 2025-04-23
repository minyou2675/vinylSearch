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
  "/",
  createProxyMiddleware({
    target: SPRING_SERVER_URL, // Docker 서비스 이름 사용
    changeOrigin: true,
  })
);

app.use(
  ["/v3/api-docs", "/swagger-ui", "/swagger-ui/index.html"],
  createProxyMiddleware({
    target: SPRING_SERVER_URL,
    changeOrigin: true,
  })
);

app.listen(8888, () => {
  console.log("API Gateway is running on port 8888");
});
