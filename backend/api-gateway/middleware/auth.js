const axios = require("axios");

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Spring 서버로 토큰 검증 요청
    const response = await axios.post("http://localhost:8080/api/auth/validate", { token });
    const user = response.data;

    // 사용자 정보 헤더에 세팅해서 Node 서버로 전달
    req.headers["x-user-id"] = user.id;
    req.headers["x-user-name"] = user.username;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", detail: err.message });
  }
}

module.exports = authenticate;
