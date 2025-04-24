require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/postRoutes");
const { setupSwagger } = require("./swagger");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

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
  }
})();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
