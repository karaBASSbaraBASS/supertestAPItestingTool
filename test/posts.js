import request from '../config/common';
import { expect } from 'chai';
import 'dotenv/config';
import {createRandomUser} from '../helpers/user-helper';
import faker from 'faker';

describe('Posts', () => {
    let createdPostId, createdUserId;
    const TOKEN = process.env.TOKEN;
    let postData = {
        "user_id": 4,
        "title": faker.lorem.sentence(),
        "body": faker.lorem.paragraph()
    }

    before( async ()=>{
        createdUserId = await createRandomUser();
        postData.user_id = createdUserId;
    });

    describe('POST', () => {
        it.only('/posts - POST - post can be created', async () => {
            const postReq = await request
                .post('posts/')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(postData);
                
            expect(postReq.body.code).to.be.eq(201);    
            expect(postReq.body.data).to.deep.include(postData);
            createdPostId = postReq.body.data.id
        });
    });
    describe('GET', () => {
        it.only('/posts/id - GET - created post can be reached', async () => {
            const postReq = await request
                .get(`posts/${createdPostId}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(postData);
            
            expect(postReq.body.code).to.be.eq(200);    
            expect(postReq.body.data).to.deep.include(postData);
        });
    });
    describe('DELETE', () => {
        it.only('/posts/id - DELETE - post can be deleted', async () => {
            const postReq = await request
                .delete(`posts/${createdPostId}`)
                .set('Authorization', `Bearer ${TOKEN}`);

            expect(postReq.body.code).to.be.eq(204);
            expect(postReq.body.data).to.be.eq(null);
        });
    });

    describe('POST negative tests', () => {
        it('/posts - POST - post data validation error', async () => {
            const postReq = await request
                .post('posts/')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(faker.lorem.sentence());
            expect(postReq.body.code).to.be.eq(422); 
        });
        it('/posts - POST - unautentificated user cant make post', async () => {
            const postReq = await request
                .post('posts/')
                .send(postData);
            expect(postReq.body.code).to.be.eq(401); 
            expect(postReq.body.data.message).to.be.eq("Authentication failed");
        });
    });
});