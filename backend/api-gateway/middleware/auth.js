const axios = require("axios");
const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // JWT 토큰에서 직접 사용자 정보 추출
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.userId || !decoded.username) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // 사용자 정보를 req 객체에 추가
    req.user = {
      id: decoded.userId,
      username: decoded.username,
    };

    console.log("Authenticated user from token:", req.user);

    // Spring 서버로 토큰 검증 요청
    const response = await axios.get(
      "http://backend-core:8080/api/auth/validate",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      }
    );
    console.log("Spring validate response:", response.data);

    if (response.status === 200) {
      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    console.error("Auth error:", err.message);
    if (err.code === "ECONNREFUSED") {
      return res.status(503).json({
        message: "Authentication service is unavailable",
        detail: "Cannot connect to the authentication server",
      });
    }
    return res
      .status(401)
      .json({ message: "Unauthorized", detail: err.message });
  }
}

module.exports = authenticate;
