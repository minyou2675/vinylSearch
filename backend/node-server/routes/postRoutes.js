const express = require('express');
const router = express.Router();
const {Post} = require('../models/post');

//Get 전체 게시글 조회
router.get("/", async (req, res) => {
    // 쿼리 파라미터로부터 페이지, 카테고리, 검색어 가져오기
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const category = req.query.category;
    const keyword = req.query.keyword || '';
    const offset = page * size;

    try {
        const where = {
            category: category
        };
        
        if (keyword) {
            where[Op.or] = [
                { title: { [Op.like]: `%${keyword}%` } },
                { content: { [Op.like]: `%${keyword}%` } }
            ];
        }

        const { count, rows } = await Post.findAndCountAll({
            where,
            order: [["createdAt", "DESC"]],
            limit: size,
            offset: offset
        });

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: '게시글 조회 실패', error: error.message });
    }
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
router.post('/write', async (req, res) => {
    const {title, content} = req.body;
    const user = req.user; // spring에서 받아온 사용자 정보
    try{
        const post = await Post.create({title, 
            content, 
            userId: user.id,
        username: user.username});
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({message: '게시글 작성 실패', error: error.message});
    }
});

//Put 게시글 수정
router.put('/write/:id', async (req, res) => {
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
router.delete('/delete/:id', async (req, res) => {
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


