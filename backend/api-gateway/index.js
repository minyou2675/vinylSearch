const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authenticate = require("./middleware/auth");
const swaggerUi = require("swagger-ui-express");
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

//Swagger UI 통합
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(undefined, {
  swaggerOptions: {
    urls: [
      {
        url: 'http://localhost:8888/v1/v3/api-docs',   // Spring Auth 서버 Swagger
        name: 'Search / Auth / Batch API (Spring)'
      },
      {
        url: 'http://localhost:8888/v2/api-docs',     // Node Board 서버 Swagger
        name: 'Board API (Node)'
      }
    ]
  }
}));

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
    onProxyReq: (proxyReq, req, res) => {
      console.log("🔥 onProxyReq 진입 확인");
      // 인증된 사용자 정보를 헤더에 추가
      if (req.user) {
        proxyReq.setHeader("x-user-id", req.user.id);
        proxyReq.setHeader("x-user-name", req.user.username);
        console.log("Proxy headers:", {
          // 디버깅용 로그
          "x-user-id": req.user.id,
          "x-user-name": req.user.username,
        });
      } else {
        console.warn(
          "Authenticate Middleware 에러 발생 ------------> req.user가 없습니다."
        );
      }
    },
  })
);

app.listen(8888, () => {
  console.log("API Gateway is running on port 8888");
});

// 테이블 동기화
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB 연결 성공");
    await sequelize.sync({ alter: true }); //테이블 자동 생성
    console.log("테이블 동기화 완료");
  } catch (error) {
    console.error("DB 연결 실패:", error);
  }
})();
