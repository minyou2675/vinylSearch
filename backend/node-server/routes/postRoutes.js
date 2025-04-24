const express = require("express");
const router = express.Router();
const { Post } = require("../models/post");

//Get 전체 게시글 조회
router.get("/", async (req, res) => {
  // 쿼리 파라미터로부터 페이지, 카테고리, 검색어 가져오기
  const page = parseInt(req.query.page) || 0;
  const size = parseInt(req.query.size) || 10;
  const category = req.query.category;
  const keyword = req.query.keyword || "";
  const offset = page * size;

  console.log("Query parameters:", { page, size, category, keyword, offset });

  try {
    // 기본 where 조건
    const where = {};

    // 카테고리 필터링
    if (category) {
      where.category = category;
    }

    // 키워드 검색
    if (keyword) {
      where.$or = [
        { title: { $like: `%${keyword}%` } },
        { content: { $like: `%${keyword}%` } },
      ];
    }

    console.log("Where clause:", JSON.stringify(where, null, 2));

    // 게시글 조회
    const { count, rows } = await Post.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: size,
      offset: offset,
      raw: true, // 순수 객체로 반환
    });

    console.log("Query result:", { count, rows: rows.length });

    // 응답 데이터 포맷팅
    const formattedRows = rows.map((row) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      username: row.username,
      views: row.views || 0,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));

    res.json({
      content: formattedRows,
      totalElements: count,
      totalPages: Math.ceil(count / size),
      page: page,
      size: size,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      message: "게시글 조회 실패",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

//Get 특정 게시글 조회
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "게시글 조회 실패" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "게시글 조회 실패", error: error.message });
  }
});

//Post 게시글 작성
router.post("/write", async (req, res) => {
  console.log("Write post request body:", req.body);
  console.log("Request headers:", req.headers);

  const { title, content, category } = req.body;

  // 필수 필드 검증
  if (!title || !content || !category) {
    return res.status(400).json({
      message: "필수 필드가 누락되었습니다.",
      required: ["title", "content", "category"],
    });
  }

  try {
    // 헤더에서 사용자 정보 읽기
    const userId = req.headers["x-user-id"];
    const username = req.headers["x-user-name"];

    if (!userId || !username) {
      return res
        .status(401)
        .json({ message: "사용자 정보가 유효하지 않습니다." });
    }

    const post = await Post.create({
      title,
      content,
      category,
      userId: parseInt(userId),
      username: username,
      views: 0,
    });

    console.log("Created post:", post);

    res.status(201).json({
      message: "게시글이 성공적으로 작성되었습니다.",
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        category: post.category,
        username: post.username,
        views: post.views,
        createdAt: post.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    console.error("Error stack:", error.stack);

    res.status(500).json({
      message: "게시글 작성 실패",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

//Put 게시글 수정
router.put("/write/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "게시글 수정 실패" });
    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
    res.send("수정 완료");
  } catch (error) {
    res.status(500).json({ message: "게시글 수정 실패", error: error.message });
  }
});

//Delete 게시글 삭제
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "게시글 삭제 실패" });
    await post.destroy();
    res.json({ message: "게시글 삭제 완료" });
  } catch (error) {
    res.status(500).json({ message: "게시글 삭제 실패", error: error.message });
  }
});

module.exports = router;
