const request = require('supertest');
const express = require('express');
const {Post} = require("../models/post");
const postRouter = require("../routes/postRoutes");

//mock 처리
jest.mock("../models/post");

const app = express();
app.use(express.json());
app.use("/posts", postRouter);

describe('POST /posts', () => {

    it('should create a new post', async () => {
        const dummyPost = {
            id: 1,
            title: 'Mock 테스트 제목',
            content: 'Mock 테스트 내용',
            userId: 1,
        };

        Post.create.mockResolvedValue(dummyPost);

        const response = await request(app)
        .post('/posts')
        .send(dummyPost)
        
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(dummyPost.title);
        expect(response.body.content).toBe(dummyPost.content);
        expect(Post.create).toHaveBeenCalledWith({
            title: dummyPost.title,
            content: dummyPost.content,
            userId: dummyPost.userId,
        });
    });
        
})


