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
    // 1. JWT 디코드 (서명 검증은 하지 않음)
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.userId || !decoded.username) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // 2. 사용자 정보 설정
    req.headers["x-user-id"] = decoded.userId;
    req.headers["x-user-name"] = decoded.username;

    console.log("✅ Token Decoded:", req.user);

    // 3. Spring 서버에 토큰 유효성 검사 요청
    const response = await axios.get(
      "http://lpsearch-core-api:8080/api/auth/validate",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000, // Increase timeout to 10 seconds
      }
    );

    if (response.status === 200) {
      console.log("✅ Spring 인증 통과:", response.data);
      next();
    } else {
      console.warn("⚠️ Spring 인증 실패:", response.status);
      return res.status(401).json({ message: "Token validation failed" });
    }
  } catch (err) {
    console.error("❌ 인증 중 오류:", err.message);
    return res
      .status(401)
      .json({ message: "Unauthorized", detail: err.message });
  }
}

module.exports = authenticate;
