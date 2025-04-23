const express = require('express');
const router = express.Router();

//Get api
router.get('/', (req, res) => {
    res.json({message: "게시글 목록 나올 예정"});
});

module.exports = router;


