const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { sequelize } = require("../node-server/models/post");
const app = express();
const SPRING_SERVER_URL = "http://backend-core:8080";
const NODE_SERVER_URL = "http://backend-board:3001";

// CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // react 기본 포트
    credentials: true,
  })
);

// 스웨거 프록시
app.use(
  ["/v3/api-docs", "/swagger-ui", "/swagger-ui/index.html"],
  createProxyMiddleware({
    target: SPRING_SERVER_URL,
    changeOrigin: true,
  })
);

// 스프링 서버로 프록시
app.use(
  "/v1",
  createProxyMiddleware({
    target: SPRING_SERVER_URL, // Docker 서비스 이름 사용
    changeOrigin: true,
    pathRewrite: {
      "^/v1": "",
    },
  })
);

// 노드 서버로 프록시
app.use(
  "/v2",
  authenticate,
  createProxyMiddleware({
    target: NODE_SERVER_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/v2": "",
    },
  })
);


app.listen(8888, () => {
  console.log("API Gateway is running on port 8888");
});


// 테이블 동기화
(async () => {
    try{
        await sequelize.authenticate();
        console.log('DB 연결 성공');
        await sequelize.sync({alter: true}); //테이블 자동 생성
        console.log('테이블 동기화 완료');
    } catch (error) {
        console.error('DB 연결 실패:', error);
    }
})();

