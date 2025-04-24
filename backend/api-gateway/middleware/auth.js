const axios = require("axios");

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Spring 서버로 토큰 검증 요청
    const response = await axios.get(
      "http://localhost:8080/api/auth/validate",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      const user = response.data;
      // 사용자 정보를 req 객체에 직접 추가
      req.user = {
        id: user.id,
        username: user.username,
      };
      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    console.error("Auth error:", err);
    return res
      .status(401)
      .json({ message: "Unauthorized", detail: err.message });
  }
}

module.exports = authenticate;
