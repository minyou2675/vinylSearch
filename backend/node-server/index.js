require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/postRoutes");
const { setupSwagger } = require("./swagger");
const { sequelize } = require("./models/post");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Body parser 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//라우터 연결
app.use("/api/posts", postRoutes);
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB 연결 성공");
    await sequelize.sync({ alter: true }); //테이블 자동 생성
    console.log("테이블 동기화 완료");
  } catch (error) {
    console.error("DB 연결 실패:", error);
    process.exit(1); // DB 연결 실패시 프로세스 종료
  }
})();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
