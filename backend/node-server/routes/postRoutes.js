const express = require('express');
const router = express.Router();
const {Post} = require('../models/post');

//Get 전체 게시글 조회
router.get("/", async (req, res) => {
    // 쿼리 파라미터로부터 페이지, 사이즈 가져오기 (기본값: page=1, size=10)
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const offset = (page - 1) * size;
  
    const { count, rows } = await Post.findAndCountAll({
      order: [["id", "DESC"]],
      limit: size,
      offset: offset,
    });
  
    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      pageSize: size,
      data: rows,
    });
  });
//Get 특정 게시글 조회
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findByPk(id);
        if(!post) return res.status(404).json({message: '게시글 조회 실패'});
        res.json(post);
    } catch (error) {
        res.status(500).json({message: '게시글 조회 실패', error: error.message});
    }
});

//Post 게시글 작성
router.post('/', async (req, res) => {
    const {title, content, userId} = req.body;
    try{
        const post = await Post.create({title, content, userId});
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({message: '게시글 작성 실패', error: error.message});
    }
});

//Put 게시글 수정
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    try{
        const post = await Post.findByPk(id);
        if(!post) return res.status(404).json({message: '게시글 수정 실패'});
        post.title = title;
        post.content = content;
        await post.save();
        res.json(post);
        res.send("수정 완료")
    } catch (error) {
        res.status(500).json({message: '게시글 수정 실패', error: error.message});
    }
});

//Delete 게시글 삭제
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findByPk(id);
        if(!post) return res.status(404).json({message: '게시글 삭제 실패'});
        await post.destroy();
        res.json({message: '게시글 삭제 완료'});
    } catch (error) {
        res.status(500).json({message: '게시글 삭제 실패', error: error.message});
    }
});

module.exports = router;


